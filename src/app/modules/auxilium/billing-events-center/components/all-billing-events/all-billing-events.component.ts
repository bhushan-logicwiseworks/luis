import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { Subject, startWith, switchMap } from 'rxjs';
import { AuxSearchService } from '../../../../../shared/aux-service/aux-search.service';
import { AuxUtilService } from '../../../../../shared/aux-service/aux-utils.service';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { AuxPopupComponent, PopupData } from '../../../../../shared/components/auxilium/aux-popup/aux-popup.component';
import { ButtonWithIconsComponents } from '../../../../../shared/components/button-with-icons/button-with-icons.component';
import { filterParams } from '../../../../../shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from '../../../../../shared/pipes/auxilium/aux-dateformat.pipe';
import { PatientEventsBillingActions } from '../../../patient-center/actions/patient-events-billing.action';
import { BillingEventsNotesComponent } from '../../../patient-center/components/patient-events-billing/billing-events-notes/billing-events-notes.component';
import { BillingEventsCenterTableActions } from '../../actions/billing-events-center-table.action';
import { BillingEventsCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-all-billing-events',
    templateUrl: './all-billing-events.component.html',
    styleUrls: ['./all-billing-events.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class AllBillingEventsComponent implements OnInit, OnDestroy {
    rowData = [];
    patientId: number;

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    columnDefs: ColDef[] = [
        {
            headerName: 'ID',
            field: 'id',
            filter: 'agMultiColumnFilter',
            minWidth: 60,
        },
        {
            headerName: 'Patient ID',
            field: 'patientId',
            filter: 'agMultiColumnFilter',
            minWidth: 100,
            // cellRenderer: ButtonWithIconsComponents,
            // cellRendererParams: { field: 'patientId' },
            // onCellClicked: params => this.handleRedirect('patientid', { data: { patientid: params.data.patientId } }),
        },
        {
            headerName: 'Event Type',
            field: 'eventType',
            filter: 'agMultiColumnFilter',
            minWidth: 150,
        },
        {
            headerName: "Today's Date",
            field: 'todaysDate',
            valueFormatter: params => this.dateFormatePipe.transform(params.data?.todaysDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 150,
        },
        {
            headerName: 'Claim Date of Service',
            field: 'claimDateOfService',
            valueFormatter: params => this.dateFormatePipe.transform(params.data?.claimDateOfService),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 150,
        },
        {
            headerName: 'Owner',
            field: 'owner',
            filter: 'agMultiColumnFilter',
            minWidth: 150,
        },

        {
            headerName: 'Primary Insurance ID',
            field: 'primaryInsId',
            filter: 'agMultiColumnFilter',
            minWidth: 180,
        },
        {
            headerName: 'Action',
            field: 'action',
            filter: 'agMultiColumnFilter',
            minWidth: 150,
        },
        {
            headerName: 'Refund Result',
            field: 'isRefundResult',
            filter: 'agMultiColumnFilter',
            minWidth: 160,
            filterValueGetter: params => (params.data.isRefundResult ? 'True' : 'False'),
            valueFormatter: params => (params.value ? 'YES' : 'NO'),
            cellDataType: 'text',
        },
        {
            headerName: 'Reason Code',
            field: 'reasonCode',
            filter: 'agMultiColumnFilter',
            minWidth: 160,
        },
        {
            headerName: 'Secondary/Tertiary Ins. ID',
            field: 'secondaryTertiaryInsId',
            filter: 'agMultiColumnFilter',
            minWidth: 200,
        },
        {
            headerName: 'Insurance ID',
            field: 'insuranceId',
            filter: 'agMultiColumnFilter',
            minWidth: 160,
        },
        {
            headerName: 'Primary or Secondary',
            field: 'primaryOrSecondary',
            filter: 'agMultiColumnFilter',
            minWidth: 180,
        },
        {
            headerName: 'Additional Info',
            field: 'additionalInfo',
            filter: 'agMultiColumnFilter',
            minWidth: 200,
        },
        {
            headerName: 'Amount',
            field: 'amount',
            filter: 'agMultiColumnFilter',
            minWidth: 120,
        },
        {
            headerName: 'Amount Paid to Patient',
            field: 'amountPaidToPatient',
            filter: 'agMultiColumnFilter',
            minWidth: 200,
        },
        {
            headerName: 'Follow Up Type',
            field: 'followUpType',
            filter: 'agMultiColumnFilter',
            minWidth: 180,
        },
        {
            headerName: 'Date Payment Received',
            field: 'datePaymentReceived',
            valueFormatter: params => this.dateFormatePipe.transform(params.data?.datePaymentReceived),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 200,
        },
        {
            headerName: 'Return Action',
            field: 'returnAction',
            filter: 'agMultiColumnFilter',
            minWidth: 200,
        },
        {
            headerName: 'Date Fully Resolved',
            field: 'dateFullyResolved',
            valueFormatter: params => this.dateFormatePipe.transform(params.data?.dateFullyResolved),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 200,
        },
        {
            headerName: 'Is Appeal For Refund',
            field: 'isAppealForRefund',
            filter: 'agMultiColumnFilter',
            filterValueGetter: params => (params.data.isAppealForRefund ? 'True' : 'False'),
            valueFormatter: params => (params.value ? 'YES' : 'NO'),
            cellDataType: 'text',
            minWidth: 180,
        },
        {
            headerName: 'Appeal Outcome',
            field: 'appealOutcome',
            filter: 'agMultiColumnFilter',
            minWidth: 180,
        },
        {
            headerName: 'Outcome',
            field: 'outcome',
            filter: 'agMultiColumnFilter',
            minWidth: 150,
        },
        {
            headerName: 'Program Type',
            field: 'programType',
            filter: 'agMultiColumnFilter',
            minWidth: 180,
        },
        {
            headerName: 'Re-Evaluation Date',
            field: 'reEvaluationDate',
            valueFormatter: params => this.dateFormatePipe.transform(params.data?.reEvaluationDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            minWidth: 200,
        },
        {
            headerName: '',
            field: 'comments',
            filter: 'agMultiColumnFilter',
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'contactNotes' },
            minWidth: 75,
            onCellClicked: params => this.openContactNote(params.data.id, params.data.patientId),
        },
    ];

    visibleColumns = [
        'id',
        'patientId',
        'eventType',
        'todaysDate',
        'claimDateOfService',
        'owner',
        'primaryInsId',
        'action',
        'isRefundResult',
        'reasonCode',
        'secondaryTertiaryInsId',
        'insuranceId',
        'primaryOrSecondary',
        'additionalInfo',
        'amount',
        'amountPaidToPatient',
        'followUpType',
        'datePaymentReceived',
        'returnAction',
        'dateFullyResolved',
        'isAppealForRefund',
        'appealOutcome',
        'outcome',
        'programType',
        'reEvaluationDate',
        'comments',
    ];

    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(BillingEventsCenterTableSelectors.selectBillingEvents))
    );
    loading$ = this.store.select(BillingEventsCenterTableSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private dateFormatePipe: DateFormatPipe,
        private searchService: AuxSearchService,
        private auxUtilService: AuxUtilService,
        private dialog: MatDialog
    ) {}

    ngOnInit() {
        this.refresh$.pipe(startWith(null), untilDestroyed(this)).subscribe(() => {
            this.store.dispatch(BillingEventsCenterTableActions.LoadAllBillingEvents());
        });

        this.data$.pipe(untilDestroyed(this)).subscribe(billingevent => {
            this.rowData = billingevent;
        });
    }

    onSelectionChanged(params: CellClickedEvent): void {
        // console.log('Cell clicked:', params);
        const excludedColumns = ['comments', 'patientId'];
        if (!excludedColumns.includes(params.column.getColId())) {
            // this.returnsAddEdit(params.data);
        }
    }

    ngOnDestroy() {
        this.store.dispatch(BillingEventsCenterTableActions.resetState());
    }

    getIcon(language: string) {
        if (language == 'ENGLISH') {
            return 'US';
        } else if (language == 'SPANISH') {
            return 'ES';
        } else {
            return '';
        }
    }

    handleRedirect(field: string, params) {
        this.auxUtilService.redirectToNewTab(field, params);
    }

    openContactNote(refId: number, patientId: number): void {
        // Dispatch action to load contact notes
        this.store.dispatch(PatientEventsBillingActions.LoadContactNotes({ patientId, refId }));

        const popupData: PopupData = {
            icon: 'mat_outline:chat',
            iconColor: 'primary',
            title: 'CONTACT NOTES',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: BillingEventsNotesComponent,
            dynamicComponentData: {
                patientId: patientId,
                refId: refId,
                moduleName: 'BillingEvents',
            },
            submitFunction: 'saveContactNote',
            enterKeyEnabled: true,
        };

        this.dialog
            .open(AuxPopupComponent, {
                width: '800px',
                maxWidth: '100%',
                panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
                position: {
                    top: '0px',
                    right: '0px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result?.success) {
                    this.store.dispatch(
                        PatientEventsBillingActions.LoadContactNotes({
                            patientId: this.patientId,
                            refId: refId,
                        })
                    );
                }
            });
    }
}
