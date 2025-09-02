import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { Report } from 'app/shared/interfaces/auxilium/report-center/report.interface';
import { ReportEntity } from 'app/shared/interfaces/auxilium/report-center/reportentity.entity';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxUtilService } from '../../../../../shared/aux-service/aux-utils.service';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { ButtonWithIconsComponents } from '../../../../../shared/components/button-with-icons/button-with-icons.component';
import { ReportCenterTableActions } from '../../actions/reporting-center-table.actions';
import { ReportCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-reporting-center-table',
    templateUrl: './reporting-center-table.component.html',
    styleUrls: ['./reporting-center-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DateTimeFormatPipe, DateFormatPipe, PhoneNumberPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class ReportingCenterTableComponent implements OnInit, AfterViewInit, OnDestroy {
    columnDefs: ColDef[] = [
        {
            headerName: 'PID',
            minWidth: 80,
            field: 'id',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'PatientWithId', patientIdField: 'id' },
            onCellClicked: params => this.handleRedirect('id', { data: { id: params.data.id } }),
        },
        {
            headerName: 'PatAlpha',
            minWidth: 115,
            field: 'patAlpha',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Sales ID',
            minWidth: 100,
            field: 'salesId',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Last Name',
            minWidth: 140,
            field: 'lastName',
            cellStyle: { 'font-weight': 700 },
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'First Name',
            minWidth: 140,
            field: 'firstName',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        { headerName: 'State', minWidth: 75, field: 'state', filter: 'agMultiColumnFilter', sortIndex: 5, hide: false },
        { headerName: 'Zip', minWidth: 75, field: 'zip', filter: 'agMultiColumnFilter', sortIndex: 6, hide: false },
        {
            headerName: 'Cell Phone',
            minWidth: 150,
            field: 'cell',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'cell' },
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.cell),
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Phone',
            minWidth: 150,
            field: 'phone',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.phone),
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'Email',
            minWidth: 250,
            field: 'email',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'DOB',
            minWidth: 125,
            field: 'dob',
            valueFormatter: (params: any) => this.dateFormatPipe.transform(params.data.dob),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'County',
            minWidth: 150,
            field: 'county',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
        },
        { headerName: 'City', minWidth: 150, field: 'city', filter: 'agMultiColumnFilter', sortIndex: 12, hide: false },
        {
            headerName: 'Ref ID',
            minWidth: 200,
            field: 'referId',
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
        },
        {
            headerName: 'Ref Code',
            minWidth: 100,
            field: 'referCode',
            filter: 'agMultiColumnFilter',
            sortIndex: 14,
            hide: false,
        },
        {
            headerName: 'Referral Source',
            minWidth: 300,
            field: 'referName',
            filter: 'agMultiColumnFilter',
            sortIndex: 15,
            hide: false,
        },
        {
            headerName: 'Physician',
            minWidth: 200,
            field: 'doctorName',
            filter: 'agMultiColumnFilter',
            sortIndex: 16,
            hide: false,
        },
        {
            headerName: 'Branch ID',
            minWidth: 100,
            field: 'branchId',
            filter: 'agMultiColumnFilter',
            sortIndex: 17,
            hide: false,
        },
        {
            headerName: 'Branch Name',
            minWidth: 300,
            field: 'branchName',
            filter: 'agMultiColumnFilter',
            sortIndex: 18,
            hide: false,
        },
        {
            headerName: 'Payor Name',
            minWidth: 300,
            field: 'payorName',
            filter: 'agMultiColumnFilter',
            sortIndex: 19,
            hide: false,
        },
        {
            headerName: 'Status',
            minWidth: 170,
            field: 'patientStatus',
            cellRenderer: PatientStatusComponent,
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 15,
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
            cellRendererParams: params => {
                return {
                    category: params.data.patientCategory,
                };
            },
            sortIndex: 16,
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
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 17,
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
            sortIndex: 18,
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

    visibleColumns = ['id', 'lastName', 'firstName', 'state', 'zip', 'email', 'patientStatus', 'patientCategory'];

    loading$ = this.store.select(ReportCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(ReportCenterTableSelectors.selectReports))
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
        private _fuseConfirmationService: FuseConfirmationService,
        private auxUtilService: AuxUtilService
    ) {
        switch (this.route.routeConfig.path) {
            case 'all':
                this.visibleColumns = [
                    'id',
                    'lastName',
                    'firstName',
                    'state',
                    'zip',
                    'email',
                    'referName',
                    'doctorName',
                    'payorName',
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
                    'zip',
                    'email',
                    'patientStatus',
                    'patientCategory',
                ];
                break;
        }
    }
    selection = new SelectionModel<Report>(true, []);

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                const filterSlug = this.route.snapshot.routeConfig.path;
                this.store.dispatch(ReportCenterTableActions.LoadReports({ filter: filterSlug }));
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            this.rowData = data;
        });

        this.actions$
            .pipe(ofType(ReportCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    onRowChange(params) {
        // this.openItem(params.api.getSelectedRows()[0])
    }

    deleteRow(params: any) {
        this.deletePatient(params.data);
    }

    ngOnDestroy(): void {
        // Dispatch the resetState action when the component is destroyed
        this.store.dispatch(ReportCenterTableActions.ResetState());
    }

    ngAfterViewInit() {}

    /**
     * Delete the Report
     */
    deletePatient(dto: ReportEntity): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete Report',
            message: 'Are you sure you want to delete this Report? This action cannot be undone!',
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
                    this.store.dispatch(ReportCenterTableActions.DeleteReport({ dto }));
                }
            });
    }

    handleRedirect(field: string, params) {
        this.auxUtilService.redirectToNewTab(field, params);
    }
}
