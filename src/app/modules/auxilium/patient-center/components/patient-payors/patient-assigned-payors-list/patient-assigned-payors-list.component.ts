import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { PatientPayors } from 'app/shared/interfaces/auxilium/patient-center/patient-payors.interface';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { Subject } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PatientCenterPayorsActions } from '../../../actions/patient-center-payors.action';
import { PatientCenterPayorsSelectors } from '../../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-patient-assigned-payors-list',
    templateUrl: './patient-assigned-payors-list.component.html',
    styleUrls: ['./patient-assigned-payors-list.component.scss'],
    providers: [CurrencyPipe, PhoneNumberPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class PatientAssignedPayorsListComponent {
    isAction = false;
    data$ = this.store.select(PatientCenterPayorsSelectors.selectPayors);
    loading$ = this.store.select(PatientCenterPayorsSelectors.selectLoading);

    visibleColumns: string[] = ['payorId', 'rank', 'billTo', 'name', 'policy'];

    paginationOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    rowData = [];
    selectdPayorId: number;

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
        gridOptions: {
            rowSelection: 'single',
            // Add this function to apply CSS class
            getRowClass: params => {
                if (params.data && params.data.id === this.selectdPayorId) {
                    return 'selected-payor-row';
                }
                return '';
            },
        },
    };

    columnDefs: ColDef[] = [
        {
            headerName: 'Id',
            minWidth: 60,
            field: 'id',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            floatingFilter: false,
        },
        {
            headerName: 'Payor Id',
            minWidth: 85,
            field: 'payorId',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            floatingFilter: false,
        },
        { headerName: 'Rank', minWidth: 70, field: 'rank', sortIndex: 2, hide: false, floatingFilter: false },
        {
            headerName: 'Payor',
            minWidth: 130,
            field: 'billTo',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
            floatingFilter: false,
        },
        {
            headerName: 'Name',
            minWidth: 325,
            field: 'name',
            filter: 'agTextColumnFilter',
            sortIndex: 4,
            hide: false,
            floatingFilter: false,
        },
        {
            headerName: 'Policy',
            minWidth: 150,
            field: 'policy',
            filter: 'agTextColumnFilter',
            sortIndex: 5,
            hide: false,
            floatingFilter: false,
        },
        {
            headerName: 'Deductible',
            minWidth: 150,
            field: 'deductibleAmount',
            valueFormatter: (params: any) => this.currancy.transform(params.data.deductibleAmount, 'USD', 'symbol'),
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
            floatingFilter: false,
        },
        {
            headerName: 'Copay',
            minWidth: 150,
            field: 'copayAmount',
            valueFormatter: (params: any) => this.currancy.transform(params.data.copayAmount, 'USD', 'symbol'),
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
            floatingFilter: false,
        },
        {
            headerName: 'Phone',
            minWidth: 150,
            field: 'phone',
            valueFormatter: (params: any) => this.phonenumber.transform(params.data.phone),
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
            floatingFilter: false,
        },
        {
            headerName: 'Address',
            minWidth: 175,
            field: 'address',
            filter: 'agTextColumnFilter',
            sortIndex: 9,
            hide: false,
            floatingFilter: false,
        },
        {
            headerName: 'City',
            minWidth: 125,
            field: 'city',
            filter: 'agTextColumnFilter',
            sortIndex: 10,
            hide: false,
            floatingFilter: false,
        },
        {
            headerName: 'State',
            minWidth: 75,
            field: 'state',
            filter: 'agTextColumnFilter',
            sortIndex: 11,
            hide: false,
            floatingFilter: false,
        },
        {
            headerName: 'Actions',
            minWidth: 150,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Edit Payor',
                        action: this.navigatePayorDetails.bind(this),
                        icon: 'mat_outline:edit_note',
                        color: 'text-green-500',
                    },
                    {
                        name: 'Remove Payor',
                        action: this.delete.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            sortIndex: 1,
            hide: false,
            floatingFilter: false,
        },
    ];

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private _fuseConfirmationService: FuseConfirmationService,
        private router: Router,
        private store: Store,
        private actions$: Actions,
        private _matDialog: MatDialog,
        private _matDialogRef: MatDialogRef<any>,
        private currancy: CurrencyPipe,
        private phonenumber: PhoneNumberPipe,
        private searchService: AuxSearchService
    ) {
        if (this.router.url.split('/')[2] === 'work-order-center') {
            let id = data.dynamicComponentData;
            if (typeof id === 'object' && id.patientId) {
                id = id.patientId;
            }
            this.store.dispatch(PatientCenterPayorsActions.LoadPatientPayors({ id: id }));
        } else {
            let id = Number(this.router.url.split('/')[3]);
            this.store.dispatch(PatientCenterPayorsActions.LoadPatientPayors({ id: id }));
        }
        this.selectdPayorId = this.data?.dynamicComponentData?.selectedPayorId;
    }
    ngOnInit(): void {
        this.data$.pipe(untilDestroyed(this)).subscribe(payor => {
            this.rowData = payor;
            // payor.find(item => {
            //     if (item.id === this.selectdPayorId) {
            //     }
            // });
        });

        this.actions$.pipe(ofType(PatientCenterPayorsActions.Refresh), untilDestroyed(this)).subscribe(value => {
            this.refresh.next(value);
        });
    }

    ngAfterViewInit(): void {}

    delete(delData) {
        this.deletePayors(delData.data);
    }

    /**
     * Delete the Payors
     */
    deletePayors(dto: PatientPayors): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Remove Payor',
            message: 'Are you sure you want to Remove this Payor? This action cannot be undone!',
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
                    this.store.dispatch(PatientCenterPayorsActions.DeletePatientPayor({ dto }));
                }
            });
    }

    navigatePayorDetails(phyData) {
        this.router.navigateByUrl(`/centers/payor-center/${phyData.data.payorId}/demographics`);
    }

    selectRow(row: any) {
        this._matDialogRef.close(row);
        this.clearFilter();
    }

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }

    selectionChange(params) {
        this.selectRow(params.api.getSelectedRows()[0]);
    }
}
