import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { PhoneCellRendererComponent } from 'app/shared/components/phone-cell-renderer/phone-cell-renderer.component';
import { BranchRepDisplay } from 'app/shared/interfaces/auxilium/branch-center/branchrep.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { BranchCenterTableActions } from '../../actions/branch-center-table.actions';
import { BranchCenterIndividualFormComponent } from '../../components/branch-center-individual-form/branch-center-individual-form.component';
import { BranchCenterTableSelectors } from '../../reducers';
import { SearchService } from '../../services/search.service';

interface TableColumn {
    label: string;
    field: string;
    position: number;
}

@UntilDestroy()
@Component({
    selector: 'ac-branch-center-table',
    templateUrl: './branch-center-table.component.html',
    styleUrls: ['./branch-center-table.component.scss'],
    providers: [DateTimeFormatPipe, PhoneNumberPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class BranchCenterTableComponent implements OnInit {
    visibleColumns = ['id', 'branchcode', 'name', 'city', 'state', 'phone', 'fax', 'adduserid', 'adddate', 'actions'];
    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', filter: 'agMultiColumnFilter', minWidth: 100, hide: false },
        { headerName: 'Branch Code', field: 'branchcode', filter: 'agMultiColumnFilter', hide: false, minWidth: 150 },
        { headerName: 'Name', field: 'name', filter: 'agMultiColumnFilter', hide: false, minWidth: 326 },
        { headerName: 'City', field: 'city', filter: 'agMultiColumnFilter', hide: false, minWidth: 120 },
        { headerName: 'State', field: 'state', filter: 'agMultiColumnFilter', hide: false, minWidth: 150 },
        {
            headerName: 'Phone',
            field: 'phone',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            filter: 'agMultiColumnFilter',
            hide: false,
            minWidth: 150,
            valueFormatter: params => this.phoneNumberPipe.transform(params.data.phone),
        },
        {
            headerName: 'Fax',
            field: 'fax',
            filter: 'agMultiColumnFilter',
            hide: false,
            minWidth: 150,
            valueFormatter: params => this.phoneNumberPipe.transform(params.data.phone),
        },
        { headerName: 'Added By', field: 'adduserid', filter: 'agMultiColumnFilter', hide: false, minWidth: 110 },
        {
            headerName: 'Added Date',
            field: 'adddate',
            filter: 'agDateColumnFilter',
            hide: false,
            minWidth: 200,
            valueFormatter: params => this.dateTimeFormate.transform(params.data.adddate),
        },
        {
            headerName: 'Actions',
            minWidth: 100,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Delete Permanently',
                        action: this.deleteRow.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            filter: false,
            sortIndex: 10,
            hide: false,
            sortable: false,
        },
    ];

    rowData = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    loading$ = this.store.select(BranchCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(BranchCenterTableSelectors.selectBranches))
    );
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private searchService: SearchService,
        private cd: ChangeDetectorRef,
        private actions$: Actions,
        private dialog: MatDialog,
        private dateTimeFormate: DateTimeFormatPipe,
        private phoneNumberPipe: PhoneNumberPipe,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(BranchCenterTableActions.LoadBranches());
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(branchRep => {
            this.rowData = branchRep;
        });

        this.actions$
            .pipe(ofType(BranchCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    deleteRow(params) {
        this.deleteContact(params.data);
    }

    openItem(item) {
        // this.store.dispatch(PhysicianCenterTableActions.LoadTaxonomy());
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'SAVE BRANCH',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: BranchCenterIndividualFormComponent,
            dynamicComponentData: item.api.getSelectedRows()[0] || null,
            submitFunction: 'saveContact',
            enterKeyEnabled: true,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '800px',
                maxWidth: '100%',
                panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
                position: {
                    top: 0 + 'px',
                    right: 0 + 'px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                item.api.clearFocusedCell();
            });
    }

    /**
     * Delete the contact
     */
    deleteContact(dto: BranchRepDisplay): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Branch Rep',
            message: 'Are you sure you want to delete this branch rep? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                // If the confirm button pressed...
                if (result === 'confirmed') {
                    // Delete the contact
                    this.store.dispatch(BranchCenterTableActions.DeleteBranch({ dto }));
                }
            });
    }

    selectionChange(params) {
        const excludedColumns = ['actions', 'phone'];
        if (!excludedColumns.includes(params.column.colId)) {
            this.openItem(params);
        }
    }
}
