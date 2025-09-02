import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { LoadingOverlayComponent } from '../../../../../../shared/components/loading-overlay/loading-overlay.component';
import { filterParams } from '../../../../../../shared/constants/aux-ag-grid.constants';
import { DateTimeFormatPipe } from '../../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PatientPaymentAdjustmentsActions } from '../../../actions/patient-payments-adjustments.action';
import { PatientPaymentAdjustmentsSelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';

@UntilDestroy()
@Component({
    selector: 'ac-patient-payments-adjustments-table',
    templateUrl: './patient-payments-adjustments-table.component.html',
    styleUrls: ['./patient-payments-adjustments-table.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FuseHorizontalNavigationComponent, LoadingOverlayComponent, AuxAgGridComponent, AsyncPipe],
})
export class PatientPaymentsAdjustmentsTableComponent implements OnInit {
    title: string;
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    paymentAdjustmentsData$ = this.store.select(PatientPaymentAdjustmentsSelectors.selectPaymentAdjustments);
    loading$ = this.store.select(PatientPaymentAdjustmentsSelectors.selectLoading);
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
            minWidth: 60,
            field: 'id',
            filter: 'agMultiColumnFilter',
            sortIndex: 0,
            hide: true,
            floatingFilter: false,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'SVCDATE',
            minWidth: 125,
            sort: 'desc',
            field: 'svcDate',
            filter: 'agDateColumnFilter',
            sortIndex: 1,
            hide: false,
            filterParams: filterParams,
            valueFormatter: params => this.dateFormat.transform(params.data.svcDate),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'ITEM ID',
            minWidth: 115,
            field: 'itemId',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'ITEM CODE',
            minWidth: 115,
            field: 'itemCode',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'DESCRIPTION',
            minWidth: 200,
            field: 'description',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'PROCEDURE',
            minWidth: 115,
            field: 'procedure',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'HCPCS CODE',
            minWidth: 115,
            field: 'hcpcsCode',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'T',
            minWidth: 50,
            field: 'tranType',
            sortIndex: 6,
            hide: false,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'B',
            minWidth: 50,
            field: 'billType',
            sortIndex: 7,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'TRAN AMOUNT',
            minWidth: 120,
            field: 'tranAmount',
            sortIndex: 8,
            valueFormatter: params => this.currency.transform(params.data.tranAmount, 'USD', 'symbol'),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'AMOUNT PAID',
            minWidth: 120,
            field: 'amountPaid',
            sortIndex: 9,
            valueFormatter: params => this.currency.transform(params.data.amountPaid, 'USD', 'symbol'),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'ADJ 1',
            minWidth: 100,
            field: 'amountAdjusted1',
            sortIndex: 10,
            valueFormatter: params => this.currency.transform(params.data.amountAdjusted1, 'USD', 'symbol'),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'ADJ 2',
            minWidth: 100,
            field: 'amountAdjusted2',
            sortIndex: 11,
            valueFormatter: params => this.currency.transform(params.data.amountAdjusted2, 'USD', 'symbol'),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'ADJ 3',
            minWidth: 100,
            field: 'amountAdjusted3',
            sortIndex: 12,
            valueFormatter: params => this.currency.transform(params.data.amountAdjusted3, 'USD', 'symbol'),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'ADJ 4',
            minWidth: 100,
            field: 'amountAdjusted4',
            sortIndex: 13,
            valueFormatter: params => this.currency.transform(params.data.amountAdjusted4, 'USD', 'symbol'),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'ADJ 5',
            minWidth: 100,
            field: 'amountAdjusted5',
            sortIndex: 14,
            valueFormatter: params => this.currency.transform(params.data.amountAdjusted5, 'USD', 'symbol'),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'ADJ 6',
            minWidth: 100,
            field: 'amountAdjusted6',
            sortIndex: 15,
            valueFormatter: params => this.currency.transform(params.data.amountAdjusted6, 'USD', 'symbol'),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'BALANCE',
            minWidth: 100,
            field: 'balance',
            filter: 'agMultiColumnFilter',
            sortIndex: 16,
            valueFormatter: params => this.currency.transform(params.data.balance, 'USD', 'symbol'),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'SUBMITTED',
            minWidth: 120,
            field: 'submitted',
            sortIndex: 17,
            valueFormatter: params => this.currency.transform(params.data.submitted, 'USD', 'symbol'),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'CHECK DATE',
            minWidth: 125,
            field: 'checkDate',
            filter: 'agDateColumnFilter',
            sortIndex: 18,
            filterParams: filterParams,
            valueFormatter: params => this.dateFormat.transform(params.data.checkDate),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'POST DATE',
            minWidth: 125,
            field: 'postDate',
            filter: 'agDateColumnFilter',
            sortIndex: 19,
            filterParams: filterParams,
            valueFormatter: params => this.dateFormat.transform(params.data.postDate),
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'CHECK NO',
            minWidth: 150,
            field: 'checkNo',
            sortIndex: 20,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'INVOICE NO',
            minWidth: 150,
            field: 'invoiceNo',
            filter: 'agMultiColumnFilter',
            sortIndex: 21,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'BILL TO',
            minWidth: 100,
            field: 'billTo',
            filter: 'agMultiColumnFilter',
            sortIndex: 22,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'ACCESSION NO',
            minWidth: 150,
            field: 'accessionNo',
            sortIndex: 23,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'POS',
            minWidth: 100,
            field: 'pos',
            sortIndex: 24,
            onCellClicked: params => this.openPaymentDetails(params),
        },
        {
            headerName: 'CONFIRM ID',
            minWidth: 150,
            field: 'confirmId',
            sortIndex: 25,
            onCellClicked: params => this.openPaymentDetails(params),
        },
    ];

    visibleColumns = [
        'svcDate',
        'itemId',
        'itemCode',
        'description',
        'procedure',
        'tranType',
        'billType',
        'billTo',
        'balance',
        'checkDate',
        'invoiceNo',
    ];
    rowData;
    patientId;
    toolbarData: FuseNavigationItem[];

    constructor(
        private store: Store,
        private actions$: Actions,
        private currency: CurrencyPipe,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dateTime: DateTimeFormatPipe,
        private dialog: MatDialog,
        private dateFormat: DateFormatPipe,
        private cdr: ChangeDetectorRef,
        private titleService: TitleService
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
                this.store.dispatch(
                    PatientPaymentAdjustmentsActions.LoadPaymentAdjustments({ patientId: this.patientId })
                );
            });

        this.paymentAdjustmentsData$.pipe(untilDestroyed(this)).subscribe(access => {
            //console.log(access);
            this.rowData = access;
        });
    }

    openPaymentDetails(params) {
        const editIndex = this.toolbarData.findIndex(item => item.title === 'Edit');
        const payAdjustIndex = this.toolbarData.findIndex(item => item.title === 'Pay/Adjust');
        const subsequentPaymentsIndex = this.toolbarData.findIndex(item => item.title === 'Subsequent Payments');
        let updatedToolbar = [...this.toolbarData];

        if (editIndex === -1) {
            updatedToolbar = [
                ...updatedToolbar,
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

        if (payAdjustIndex === -1) {
            updatedToolbar = [
                ...updatedToolbar,
                {
                    title: 'Pay/Adjust',
                    type: 'basic',
                    icon: 'mat_outline:edit',
                    function: () => {
                        this.redirectToPayAdjust(params);
                    },
                },
            ];
        }

        if (subsequentPaymentsIndex === -1) {
            updatedToolbar = [
                ...updatedToolbar,
                {
                    title: 'Subsequent Payments',
                    type: 'basic',
                    icon: 'mat_outline:payments',
                    function: () => {
                        this.redirectToSubsequentPayments(params);
                    },
                },
            ];
        }

        this.toolbarData = updatedToolbar;
        this.cdr.detectChanges();
    }

    updateToolBarData(isOptionAvailable) {
        this.toolbarData = [
            ...this.toolbarData.slice(0, isOptionAvailable),
            ...this.toolbarData.slice(isOptionAvailable + 1),
        ];
    }

    redirectToEdit(params) {
        this.router.navigate([`/centers/patient-center/${this.patientId}/payments-adjustments/add`, params.data.id]);
    }

    redirectToPayAdjust(params) {
        this.router.navigate([`/centers/patient-center/${this.patientId}/pay-adjust/add`, params.data.id]);
    }

    redirectToSubsequentPayments(params) {
        this.router.navigate([`/centers/patient-center/${this.patientId}/subsequent-payments/add`, params.data.id]);
    }
}
