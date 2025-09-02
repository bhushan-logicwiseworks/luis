import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { ZipCodeDisplay } from 'app/shared/interfaces/auxilium/zipcode-center/zipcode.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { ZipCodeCenterTableActions } from '../../actions/zipcode-center-table.actions';
import { ZipCodeCenterIndividualFormComponent } from '../../components/zipcode-center-individual-form/zipcode-center-individual-form.component';
import { ZipCodeCenterTableSelectors } from '../../reducers';

interface TableColumn {
    label: string;
    field: string;
    position: number;
}

@UntilDestroy()
@Component({
    selector: 'ac-zipcode-center-table',
    templateUrl: './zipcode-center-table.component.html',
    styleUrls: ['./zipcode-center-table.component.scss'],
    providers: [DateTimeFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class ZipCodeCenterTableComponent implements OnInit, AfterViewInit {
    columnDefs: ColDef[] = [
        { headerName: 'Id', field: 'id', filter: 'agMultiColumnFilter', minWidth: 220 },
        { headerName: 'Zip Code', field: 'zipcode', filter: 'agMultiColumnFilter', minWidth: 220 },
        { headerName: 'Flag', field: 'flag', filter: 'agMultiColumnFilter' },
        { headerName: 'Branch Id', field: 'branchid', filter: 'agMultiColumnFilter' },
        { headerName: 'State', field: 'state', filter: 'agMultiColumnFilter', minWidth: 220 },
        { headerName: 'City', field: 'city', filter: 'agMultiColumnFilter', minWidth: 220 },
        { headerName: 'Primary', field: 'primary', filter: 'agMultiColumnFilter' },
        { headerName: 'Area Codes', field: 'areacodes', filter: 'agMultiColumnFilter' },
        { headerName: 'City Alias', field: 'cityalias', filter: 'agMultiColumnFilter' },
        { headerName: 'Division', field: 'division', filter: 'agMultiColumnFilter' },
        { headerName: 'Region', field: 'region', filter: 'agMultiColumnFilter' },
        {
            headerName: 'Added Date',
            field: 'adddate',
            filter: 'agDateColumnFilter',
            valueFormatter: params => this.dateTimePipe.transform(params.data.adddate),
            minWidth: 220,
        },
        { headerName: 'Added By', field: 'adduserid', filter: 'agMultiColumnFilter', minWidth: 220 },
        {
            headerName: 'Actions',
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
            width: 200,
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

    visibleColumns = ['id', 'zipcode', 'city', 'state', 'adddate', 'adduserid', 'actions'];

    loading$ = this.store.select(ZipCodeCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(ZipCodeCenterTableSelectors.selectZipCodes))
    );

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private dateTimePipe: DateTimeFormatPipe,
        @Inject(Actions) private actions$: Actions,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(ZipCodeCenterTableActions.LoadZipCodes());
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(zipcode => {
            this.rowData = zipcode;
        });

        this.actions$
            .pipe(ofType(ZipCodeCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    deleteRow(params) {
        this.deleteContact(params.data);
    }

    ngAfterViewInit(): void {}

    openItem(item) {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'SAVE ZIPCODE',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: ZipCodeCenterIndividualFormComponent,
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
                this.refresh.next(result);
                item.api.clearFocusedCell();
            });
    }

    /**
     * Delete the contact
     */
    deleteContact(dto: ZipCodeDisplay): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete ZipCode',
            message: 'Are you sure you want to delete this ZipCode? This action cannot be undone!',
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
                    this.store.dispatch(ZipCodeCenterTableActions.DeleteZipCode({ dto }));
                }
            });
    }

    onRowSelectionChange(params) {
        if (params.column.colId != 'actions') {
            this.openItem(params);
        }
    }
}
