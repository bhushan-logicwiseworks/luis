import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ActionButtonRendererComponent } from 'app/shared/components/action-button-renderer/action-button-renderer.component';
import { SourceChipComponent } from 'app/shared/components/auxilium/aux-source-chip/aux-source-chip.component';
import { PatientStatusComponent } from 'app/shared/components/patient-status/patient-status.component';
import { PhoneCellRendererComponent } from 'app/shared/components/phone-cell-renderer/phone-cell-renderer.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap, take } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PatientCenterTableActions } from '../../actions/patient-center-table.actions';
import { PatientDemographicsActions } from '../../actions/patient-demographics.action';
import { PatientCenterDetailsSelectors, PatientCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-patient-center-table',
    templateUrl: './patient-center-table.component.html',
    styleUrls: ['./patient-center-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateTimeFormatPipe, DateFormatPipe, PhoneNumberPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class PatientCenterTableComponent implements OnInit, AfterViewInit, OnDestroy {
    columnDefs: ColDef[] = [
        {
            headerName: 'ID',
            minWidth: 75,
            field: 'id',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Last Name',
            minWidth: 125,
            field: 'lastName',
            sort: 'desc',
            cellStyle: { 'font-weight': 700 },
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'First Name',
            minWidth: 125,
            field: 'firstName',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'State',
            minWidth: 80,
            field: 'state',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Zip',
            minWidth: 75,
            field: 'zip',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Cell Phone',
            minWidth: 125,
            field: 'cell',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'cell' },
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.cell),
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Phone',
            minWidth: 125,
            field: 'phone',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.phone),
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'Email',
            minWidth: 250,
            field: 'email',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'DOB',
            minWidth: 125,
            field: 'dob',
            valueFormatter: (params: any) => this.dateFormatPipe.transform(params.data.dob),
            sort: 'desc',
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'County',
            minWidth: 125,
            field: 'county',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
        },
        {
            headerName: 'City',
            minWidth: 150,
            field: 'city',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Status',
            minWidth: 125,
            field: 'patientStatus',
            cellRenderer: PatientStatusComponent,
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
            cellStyle: {
                display: 'flex',
                alignItems: 'center',
            },
        },
        {
            headerName: 'Category',
            minWidth: 150,
            field: 'patientCategory',
            cellRenderer: SourceChipComponent,
            sort: 'desc',
            cellRendererParams: params => {
                return {
                    category: params.data.patientCategory,
                };
            },
            sortIndex: 14,
            filter: 'agMultiColumnFilter',
            filterParams: {
                filters: [
                    {
                        filter: 'agTextColumnFilter',
                    },
                    {
                        filter: 'agSetColumnFilter',
                        filterParams: {
                            cellRenderer: SourceChipComponent,
                        },
                    },
                ],
            },
            hide: false,
        },
        {
            headerName: 'Entry Date',
            minWidth: 175,
            field: 'entryDate',
            valueFormatter: (params: any) => this.dateTimeFormatPipe.transform(params.data.entryDate),
            sort: 'desc',
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 15,
            hide: false,
        },
        {
            headerName: 'Actions',
            width: 101,
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
            sortIndex: 16,
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

    visibleColumns = [
        'id',
        'lastName',
        'firstName',
        'state',
        'cell',
        'email',
        'dob',
        'patientStatus',
        'patientCategory',
        'actions',
    ];

    loading$ = this.store.select(PatientCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(PatientCenterTableSelectors.selectPatients))
    );

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    selectedRowIndex: number = -1;

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private dateTimeFormatPipe: DateTimeFormatPipe,
        private dateFormatPipe: DateFormatPipe,
        private phoneNumberPipe: PhoneNumberPipe,
        private actions$: Actions,
        private router: Router,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        switch (this.route.routeConfig.path) {
            case 'active':
                this.visibleColumns = [
                    'id',
                    'lastName',
                    'firstName',
                    'cell',
                    'email',
                    'county',
                    'dob',
                    'patientCategory',
                ];
                break;
            case 'all':
                this.visibleColumns = [
                    'id',
                    'lastName',
                    'firstName',
                    'cell',
                    'email',
                    'dob',
                    'patientStatus',
                    'patientCategory',
                ];
                break;
            default:
                this.visibleColumns = [
                    'id',
                    'lastName',
                    'firstName',
                    'state',
                    'cell',
                    'email',
                    'dob',
                    'patientStatus',
                    'patientCategory',
                ];
                break;
        }
    }
    selection = new SelectionModel<Patient>(true, []);

    ngOnInit() {
        this.store
            .select(PatientCenterDetailsSelectors.selectPatientCenterDetailsState)
            .pipe(take(1), untilDestroyed(this))
            .subscribe(patientCenterState => {
                // if (!patientCenterState.intake.length) {
                //     this.store.dispatch(PatientCenterDeatilsActions.LoadIntakeDropDown());
                // }
                // if (!patientCenterState.salesrep.length) {
                //     this.store.dispatch(PatientCenterDeatilsActions.LoadPatientSalesRep());
                // }
            });
        combineLatest([
            this.route.paramMap,
            this.refresh$.pipe(startWith(null)),
            this.store.select(PatientCenterTableSelectors.selectPatientSearchShortcut),
        ])
            .pipe(untilDestroyed(this))
            .subscribe(([params, refresh, shortCut]) => {
                if (!shortCut) {
                    const filterSlug = this.route.snapshot.routeConfig.path;
                    this.store.dispatch(PatientCenterTableActions.LoadPatients({ filter: filterSlug }));
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            this.rowData = data;
        });

        this.actions$
            .pipe(ofType(PatientCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    onSelectionChanged(params) {
        const excludedColumns = ['actions', 'phone'];
        if (!excludedColumns.includes(params.column.colId)) {
            this.openItem(params.api.getSelectedRows()[0]);
        }
    }

    deleteRow(params: any) {
        //this.deletePatient(params.data)
    }

    ngOnDestroy(): void {
        // Dispatch the resetState action when the component is destroyed
        this.store.dispatch(PatientCenterTableActions.ResetState());
        this.store.dispatch(PatientDemographicsActions.ResetState());
    }

    ngAfterViewInit() {}

    openItem(patient: any) {
        this.router.navigateByUrl(`/centers/patient-center/${patient.id}`);
    }

    /**
     * Delete the Patient
     */
    deletePatient(dto: PatientEntity): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Patient',
            message: 'Are you sure you want to delete this Patient? This action cannot be undone!',
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
                    this.store.dispatch(PatientCenterTableActions.DeletePatient({ dto }));
                }
            });
    }
}
