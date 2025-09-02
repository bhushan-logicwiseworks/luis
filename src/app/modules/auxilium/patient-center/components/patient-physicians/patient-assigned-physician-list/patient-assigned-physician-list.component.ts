import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { PatientPhysicianAdd } from 'app/shared/interfaces/auxilium/patient-center/patient-physicians-add.interface';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { Subject } from 'rxjs';
import { PatientCenterPhysiciansActions } from '../../../actions/patient-center-physicians.action';
import { PatientCenterPhysiciansSelectors } from '../../../reducers';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-patient-assigned-physician-list',
    templateUrl: './patient-assigned-physician-list.component.html',
    styleUrls: ['./patient-assigned-physician-list.component.scss'],
    providers: [DateTimeFormatPipe, PhoneNumberPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class PatientAssignedPhysicianListComponent {
    rowData = [];
    rowUpdateOrderData: PatientPhysicianAdd[];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    columnDefs: ColDef[] = [
        { headerName: 'Id', minWidth: 60, field: 'id', sortIndex: 1, hide: false },
        {
            headerName: 'Dr Id',
            cellRenderer: 'agGroupCellRenderer',
            cellClass: 'custom',
            cellRendererParams: {
                innerRenderer: function (params) {
                    return `<div class="flex items-start"><span class="mr-1"><i class="material-icons">drag_handle</i></span>${params.value}</div>`;
                },
            },
            rowDrag: true,
            minWidth: 80,
            field: 'doctorId',
            sortIndex: 1,
            hide: false,
        },
        { headerName: 'Order', minWidth: 50, field: 'order', sortIndex: 2, hide: false },
        {
            headerName: 'Phy Key',
            minWidth: 70,
            field: 'phykey',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'First Name',
            minWidth: 70,
            field: 'firstName',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Last Name',
            minWidth: 70,
            field: 'lastName',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        { headerName: 'NPI', minWidth: 150, field: 'npi', filter: 'agMultiColumnFilter', sortIndex: 6, hide: false },
        {
            headerName: 'Phone',
            minWidth: 150,
            field: 'phone',
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.phone),
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Fax',
            minWidth: 150,
            field: 'fax',
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.fax),
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
        { headerName: 'Pecos', minWidth: 70, field: 'pecos', filter: 'agMultiColumnFilter', sortIndex: 9, hide: false },
        {
            headerName: 'State',
            minWidth: 70,
            field: 'state',
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
            hide: false,
        },
        { headerName: 'Zip', minWidth: 75, field: 'zip', filter: 'agMultiColumnFilter', sortIndex: 11, hide: false },
        { headerName: 'Is Active', minWidth: 100, field: 'isActive', sortIndex: 12, hide: false },
        {
            headerName: 'Actions',
            minWidth: 150,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Edit Physician',
                        action: this.navigatePhysicianDetails.bind(this),
                        icon: 'mat_outline:edit_note',
                        color: 'text-green-500',
                    },
                    {
                        name: 'Remove Physician',
                        action: this.delete.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            sortIndex: 13,
            hide: false,
        },
    ];

    data$ = this.store.select(PatientCenterPhysiciansSelectors.selectPhysicians);
    loading$ = this.store.select(PatientCenterPhysiciansSelectors.selectLoading);
    toolbarData: FuseNavigationItem[];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    visibleColumns: string[] = ['order', 'firstName', 'lastName', 'npi'];
    paginationOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private store: Store,
        private router: Router,
        private _fuseConfirmationService: FuseConfirmationService,
        private _matDialogRef: MatDialogRef<PatientAssignedPhysicianListComponent>,
        private route: ActivatedRoute,
        private actions$: Actions,
        private phoneNumberPipe: PhoneNumberPipe,
        private searchService: AuxSearchService
    ) {
        if (this.router.url.split('/')[2] === 'work-order-center') {
            let id = data.dynamicComponentData;
            this.store.dispatch(PatientCenterPhysiciansActions.LoadPatientPhysicians({ id: id }));
        } else {
            let id = Number(this.router.url.split('/')[3]);
            this.store.dispatch(PatientCenterPhysiciansActions.LoadPatientPhysicians({ id: id }));
        }
    }
    ngOnInit(): void {
        this.data$.pipe(untilDestroyed(this)).subscribe(physician => {
            if (physician) {
                this.rowData = physician;
            }
        });

        this.actions$.pipe(ofType(PatientCenterPhysiciansActions.Refresh), untilDestroyed(this)).subscribe(value => {
            this.refresh.next(value);
        });
    }

    delete(delData) {
        this.deletePayors(delData.data);
    }

    navigatePhysicianDetails(phyData) {
        this.router.navigateByUrl(`/centers/physician-center/${phyData.data.doctorId}/demographics`);
    }

    /**
     * Delete the Payors
     */
    deletePayors(data): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Remove Physician',
            message: 'Are you sure you want to Remove this physician? This action cannot be undone!',
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
                    const dto = {
                        id: data.id,
                    };
                    this.store.dispatch(PatientCenterPhysiciansActions.DeletePatientPhysicians({ dto }));
                }
            });
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
