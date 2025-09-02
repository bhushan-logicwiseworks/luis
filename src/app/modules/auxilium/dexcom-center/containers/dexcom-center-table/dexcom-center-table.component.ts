import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { DexcomUserDisplay } from 'app/shared/interfaces/auxilium/dexcom-center/dexcomuser.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { DexcomCenterIndividualActions } from '../../actions/dexcom-center-individual.actions';
import { DexcomCenterTableActions } from '../../actions/dexcom-center-table.actions';
import { DexcomCenterIndividualFormComponent } from '../../components/dexcom-center-individual-form/dexcom-center-individual-form.component';
import { DexcomCenterTableSelectors } from '../../reducers';

interface TableColumn {
    label: string;
    field: string;
    position: number;
}

@UntilDestroy()
@Component({
    selector: 'ac-dexcom-center-table',
    templateUrl: './dexcom-center-table.component.html',
    styleUrls: ['./dexcom-center-table.component.scss'],
    providers: [DateTimeFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class DexcomCenterTableComponent implements OnInit {
    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', width: 150, filter: 'agMultiColumnFilter' },
        { headerName: 'Email', field: 'email', width: 280, filter: 'agMultiColumnFilter' },
        { headerName: 'Zip Codes', field: 'zipcodes', width: 280, filter: 'agMultiColumnFilter' },
        { headerName: 'Added By', field: 'addedby', width: 280, filter: 'agMultiColumnFilter' },
        {
            headerName: 'Added Date',
            field: 'addeddate',
            width: 280,
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.dateTimeFormat.transform(params.data.addeddate),
        },
        { headerName: 'Modified By', field: 'modifiedby', width: 280, filter: 'agMultiColumnFilter' },
        {
            headerName: 'Modified Date',
            field: 'modifieddate',
            width: 280,
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.dateTimeFormat.transform(params.data.modifieddate),
        },
        {
            headerName: 'Actions',
            width: 100,
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

    paginatorOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    visibleColumns = ['email', 'addedby', 'addeddate', 'modifiedby', 'modifieddate', 'actions'];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    loading$ = this.store.select(DexcomCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(switchMap(paramMap => this.store.select(DexcomCenterTableSelectors.selectUsers)));

    rowData = [];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private actions$: Actions,
        private dialog: MatDialog,
        private dateTimeFormat: DateTimeFormatPipe,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                switch (filterSlug) {
                    case 'all':
                        this.store.dispatch(DexcomCenterTableActions.LoadUsers({ filter: 'ALL' }));
                        break;

                    case 'inactive':
                        this.store.dispatch(DexcomCenterTableActions.LoadUsers({ filter: 'INACTIVE' }));
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(access => {
            this.rowData = access;
        });

        this.actions$
            .pipe(ofType(DexcomCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    deleteRow(params) {
        this.deleteContact(params.data);
    }

    openItem(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'SAVE DEXCOM REP',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: DexcomCenterIndividualFormComponent,
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
    deleteContact(dto: DexcomUserDisplay): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Dexcom Rep',
            message: 'Are you sure you want to delete this dexcom rep? This action cannot be undone!',
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
                    this.store.dispatch(DexcomCenterIndividualActions.DeleteUser({ dto }));
                }
            });
    }

    rowSelectionChange(params) {
        if (params.column.colId != 'actions') {
            this.openItem(params);
        }
    }
}
