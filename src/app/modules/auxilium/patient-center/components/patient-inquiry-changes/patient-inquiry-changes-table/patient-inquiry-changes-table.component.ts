import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { LoadingOverlayComponent } from '../../../../../../shared/components/loading-overlay/loading-overlay.component';
import { PatientInquiryChangesActions } from '../../../actions/patient-inquiry-changes.action';
import { PatientInquiryChangesSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';
import { PatientGroupEditInquiryChangesComponent } from '../patient-group-edit-inquiry-changes/patient-group-edit-inquiry-changes.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-inquiry-changes-table',
    templateUrl: './patient-inquiry-changes-table.component.html',
    styleUrls: ['./patient-inquiry-changes-table.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, LoadingOverlayComponent, AsyncPipe],
})
export class PatientInQuiryChangesTableComponent {
    title: string;
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    arHistoryData$ = this.store.select(PatientInquiryChangesSelectors.selectInquiryChanges);
    loading$ = this.store.select(PatientInquiryChangesSelectors.selectLoading);
    // options = {
    //     defaultColDef: {
    //         flex: 1,
    //         filter: true,
    //         sortable: true,
    //     },
    // };
    options = {
        gridOptions: {
            rowSelection: {
                mode: 'multiRow',
                checkboxes: true,
                headerCheckbox: true,
                selectAll: 'filtered',
                checkboxColumn: {
                    field: 'checkedField',
                    width: 35,
                    maxWidth: 35,
                    pinned: 'left',
                    resizable: false,
                    suppressMovable: true,
                    sortable: false,
                    filter: false,
                    lockPosition: 'left',
                    headerName: '',
                },
            },
            rowMultiSelectWithClick: true,
            headerHeight: 30,
            rowHeight: 36,
        },
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    columnDefs: ColDef[] = [
        {
            headerName: 'ID',
            minWidth: 115,
            field: 'id',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
            onCellClicked: params => this.openPatientInquiryDetails(params),
        },
        {
            headerName: 'SvcDate',
            minWidth: 125,
            sort: 'desc',
            field: 'svcdate',
            filter: 'agDateColumnFilter',
            sortIndex: 1,
            hide: false,
            filterParams: filterParams,
            valueFormatter: (params: any) => this.dateFormat.transform(params.data.svcdate),
            onCellClicked: params => this.openPatientInquiryDetails(params),
        },
        {
            headerName: 'Item Code',
            minWidth: 115,
            field: 'itemcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
            onCellClicked: params => this.openPatientInquiryDetails(params),
        },
        {
            headerName: 'HCPCS',
            minWidth: 115,
            field: 'hcpcscode',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
            onCellClicked: params => this.openPatientInquiryDetails(params),
        },
        {
            headerName: 'Bill To',
            minWidth: 115,
            field: 'billto',
            filter: 'agMultiColumnFilter',
            sortIndex: 15,
            hide: false,
            onCellClicked: params => this.openPatientInquiryDetails(params),
        },
        {
            headerName: 'T',
            minWidth: 50,
            field: 'trantype',
            sortIndex: 5,
            hide: false,
            onCellClicked: params => this.openPatientInquiryDetails(params),
        },
        {
            headerName: 'P',
            minWidth: 50,
            field: 'printstatus',
            sortIndex: 6,
            hide: false,
            onCellClicked: params => this.openPatientInquiryDetails(params),
        },
        {
            headerName: 'Amount',
            minWidth: 100,
            field: 'tranamount',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
            valueFormatter: (params: any) => this.currency.transform(params.data.tranamount, 'USD', 'symbol'),
            onCellClicked: params => this.openPatientInquiryDetails(params),
        },
        {
            headerName: 'Balance',
            minWidth: 100,
            field: 'balance',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
            valueFormatter: (params: any) => this.currency.transform(params.data.balance, 'USD', 'symbol'),
            onCellClicked: params => this.openPatientInquiryDetails(params),
        },
        {
            headerName: 'Printed',
            minWidth: 125,
            field: 'printdate',
            filter: 'agDateColumnFilter',
            sortIndex: 13,
            hide: false,
            filterParams: filterParams,
            valueFormatter: (params: any) => this.dateFormat.transform(params.data.printdate),
            onCellClicked: params => this.openPatientInquiryDetails(params),
        },
        {
            headerName: 'Accession #',
            minWidth: 115,
            field: 'accessionno',
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
            filterParams: filterParams,
            onCellClicked: params => this.openPatientInquiryDetails(params),
        },
        {
            headerName: 'Held Reason',
            minWidth: 500,
            field: 'held',
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
            filterParams: filterParams,
            onCellClicked: params => this.openPatientInquiryDetails(params),
        },
    ];

    visibleColumns = [
        'checkedField',
        'svcdate',
        'itemcode',
        'hcpcscode',
        'billto',
        'trantype',
        'printstatus',
        'tranamount',
        'balance',
        'printdate',
        'accessionno',
        'held',
    ];
    rowData;
    patientId;
    toolbarData: FuseNavigationItem[];
    selection = new SelectionModel<any>(true, []);

    constructor(
        private store: Store,
        private actions$: Actions,
        private currency: CurrencyPipe,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dateTime: DateTimeFormatPipe,
        private dateFormat: DateFormatPipe,
        private cdr: ChangeDetectorRef,
        private titleService: TitleService,
        private dialog: MatDialog,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        this.toolbarData = [
            {
                title: 'Refresh',
                type: 'basic',
                icon: 'mat_outline:refresh',
                function: () => {
                    this.refresh.next(null);
                },
            },
        ];
    }

    ngOnInit() {
        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        this.patientId = Number(this.router.url.split('/')[3]);
        combineLatest([this.activatedRoute.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.store.dispatch(PatientInquiryChangesActions.LoadInquiryChanges({ patientId: this.patientId }));
            });

        // Listen for EditGroupInquiryChangesSuccess to refresh the table
        this.actions$
            .pipe(ofType(PatientInquiryChangesActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));

        this.arHistoryData$.pipe(untilDestroyed(this)).subscribe(access => {
            //console.log(access);
            this.rowData = access;
        });
    }

    openPatientInquiryDetails(params) {
        const isGroupEditOption = this.toolbarData.findIndex(item => item.title === 'Group Edit');
        const isEditOption = this.toolbarData.findIndex(item => item.title === 'Edit');

        // Clear any existing group edit options
        if (isGroupEditOption !== -1) {
            this.updateToolBarData(isGroupEditOption);
        }

        // Add or update Edit button
        if (isEditOption === -1) {
            this.toolbarData = [
                ...this.toolbarData,
                {
                    title: 'Edit',
                    type: 'basic',
                    icon: 'mat_outline:edit',
                    function: () => {
                        this.redirectToEdit(params);
                    },
                },
            ];
        }
        this.cdr.detectChanges();
    }

    updateToolBarData(isOptionAvailable) {
        this.toolbarData = [
            ...this.toolbarData.slice(0, isOptionAvailable),
            ...this.toolbarData.slice(isOptionAvailable + 1),
        ];
    }

    redirectToEdit(params) {
        this.router.navigate([`/centers/patient-center/${this.patientId}/inquiry-changes/add`, params.data.id]);
    }

    onSelectionChanged(params) {
        const isGroupEditOption = this.toolbarData.findIndex(item => item.title === 'Group Edit');
        const isEditOption = this.toolbarData.findIndex(item => item.title === 'Edit');
        this.selection.setSelection(...params.api.getSelectedRows());

        // Remove Edit button when rows are selected
        if (params.api.getSelectedRows().length > 0) {
            if (isEditOption !== -1) {
                this.updateToolBarData(isEditOption);
            }

            if (isGroupEditOption === -1) {
                this.toolbarData = [
                    ...this.toolbarData,
                    {
                        title: 'Group Edit',
                        type: 'basic',
                        icon: 'mat_outline:edit_note',
                        function: () => {
                            this.openGroupEdit(params);
                        },
                    },
                ];
            }
        } else {
            if (isGroupEditOption > -1) {
                this.updateToolBarData(isGroupEditOption);
                this.selection.clear();
            }
        }
        this.cdr.detectChanges();
    }

    openGroupEdit(params) {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Inquiry Changes Group Edit',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: PatientGroupEditInquiryChangesComponent,
            dynamicComponentData: params.api.getSelectedRows().map(res => res.id),
            submitFunction: 'submit',
            enterKeyEnabled: true,
        };

        const modalRef = this.dialog.open(AuxPopupComponent, {
            width: '1000px',
            height: 'auto',
            data: popupData,
        });

        modalRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                params.api.clearFocusedCell();
                params.api.deselectAll();
                const isEditOption = this.toolbarData.findIndex(item => item.title === 'Edit');
                if (isEditOption !== -1) {
                    this.updateToolBarData(isEditOption);
                }
            });
    }
}
