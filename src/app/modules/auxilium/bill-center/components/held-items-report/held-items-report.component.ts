import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { BillCenterTableActions } from '../../actions/bill-center-table.action';
import { BillCenterTableSelectors } from '../../reducers';
import { HeldItemDetailsComponent } from '../held-item-details/held-item-details.component';

@UntilDestroy()
@Component({
    selector: 'app-held-items-report',
    templateUrl: './held-items-report.component.html',
    styleUrls: ['./held-items-report.component.scss'],
    providers: [DateTimeFormatPipe, DateFormatPipe],
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class HeldItemsReportComponent {
    loading$ = this.store.select(BillCenterTableSelectors.selectLoading);
    data$ = this.store.select(BillCenterTableSelectors.selectHeldItemsReportReps);
    rowData = [];
    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    toolbarData: FuseNavigationItem[] = [
        {
            title: 'Re-Validate',
            type: 'basic',
            icon: 'mat_outline:published_with_changes',
            function: item => {
                //this.selectAll = true
                this.revalidate();
            },
        },
    ];

    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 80, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Pat Id',
            minWidth: 80,
            field: 'patientid',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'INV#',
            minWidth: 95,
            field: 'invoiceno',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'SVC Date',
            minWidth: 120,
            field: 'svcdate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.svcdate),
            filterParams: filterParams,
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Created',
            minWidth: 100,
            field: 'createdate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.svcdate),
            filterParams: filterParams,
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Item Code',
            minWidth: 130,
            field: 'itemcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Procedure',
            minWidth: 130,
            field: 'hcpcscode',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        { headerName: 'T', minWidth: 50, field: 'trantype', filter: 'agMultiColumnFilter', sortIndex: 8, hide: false },
        {
            headerName: 'P',
            minWidth: 50,
            field: 'printstatus',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        { headerName: 'C', minWidth: 50, field: 'collectionstatus', sortIndex: 10, hide: false },
        {
            headerName: 'Tran Amt',
            minWidth: 100,
            field: 'tranamount',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
            valueFormatter: (params: any) => this.currency.transform(params.data.tranamount, 'USD', 'symbol'),
        },
        {
            headerName: 'Paid',
            minWidth: 100,
            field: 'amountpaid',
            filter: 'agMultiColumnFilter',
            sortIndex: 12,
            hide: false,
            valueFormatter: (params: any) => this.currency.transform(params.data.amountpaid, 'USD', 'symbol'),
        },
        {
            headerName: 'Adj',
            minWidth: 100,
            field: 'amountadjusteD1',
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
            valueFormatter: (params: any) => this.currency.transform(params.data.amountadjusteD1, 'USD', 'symbol'),
        },
        {
            headerName: 'Balance',
            minWidth: 100,
            field: 'balance',
            filter: 'agMultiColumnFilter',
            sortIndex: 14,
            hide: false,
            valueFormatter: (params: any) => this.currency.transform(params.data.balance, 'USD', 'symbol'),
        },
        {
            headerName: 'Code',
            minWidth: 75,
            field: 'adjustmentcodE1',
            filter: 'agMultiColumnFilter',
            sortIndex: 15,
            hide: false,
        },
        {
            headerName: 'Post Date',
            minWidth: 125,
            field: 'postdate',
            filter: 'agDateColumnFilter',
            sortIndex: 16,
            hide: false,
            filterParams: filterParams,
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.postdate),
        },
        {
            headerName: 'Check #',
            minWidth: 150,
            field: 'checkno',
            filter: 'agMultiColumnFilter',
            sortIndex: 17,
            hide: false,
        },
        {
            headerName: 'Bill To',
            minWidth: 100,
            field: 'billto',
            filter: 'agMultiColumnFilter',
            sortIndex: 18,
            hide: false,
        },
        { headerName: 'B', minWidth: 50, field: 'billtype', sortIndex: 19, hide: false },
        {
            headerName: 'Code2',
            minWidth: 75,
            field: 'adjustmentcodE2',
            filter: 'agMultiColumnFilter',
            sortIndex: 20,
            hide: false,
        },
        {
            headerName: 'Adj2',
            minWidth: 100,
            field: 'amountadjusteD2',
            filter: 'agMultiColumnFilter',
            sortIndex: 21,
            hide: false,
            valueFormatter: (params: any) => this.currency.transform(params.data.amountadjusteD2, 'USD', 'symbol'),
        },
        {
            headerName: 'Code3',
            minWidth: 75,
            field: 'adjustmentcodE3',
            filter: 'agMultiColumnFilter',
            sortIndex: 22,
            hide: false,
        },
        {
            headerName: 'Adj3',
            minWidth: 100,
            field: 'amountadjusteD3',
            filter: 'agMultiColumnFilter',
            sortIndex: 23,
            hide: false,
            valueFormatter: (params: any) => this.currency.transform(params.data.amountadjusteD3, 'USD', 'symbol'),
        },
    ];

    visibleColumns = [
        'patientid',
        'invoiceno',
        'svcdate',
        'createdate',
        'itemcode',
        'hcpcscode',
        'trantype',
        'printstatus',
        'collectionstatus',
        'tranamount',
        'amountpaid',
        'amountadjusteD1',
        'balance',
        'adjustmentcodE1',
        'postdate',
        'checkno',
        'billto',
        'billtype',
        'adjustmentcodE2',
        'amountadjusteD2',
        'adjustmentcodE3',
        'amountadjusteD3',
    ];

    selection = new SelectionModel<any>(true, []);

    constructor(
        private store: Store,
        private dateFormatePipe: DateFormatPipe,
        private currency: CurrencyPipe,
        private dateTime: DateTimeFormatPipe,
        private actions$: Actions,
        private router: Router,
        private route: ActivatedRoute,
        private _matDialog: MatDialog,
        private auxSearchService: AuxSearchService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(BillCenterTableActions.LoadHeldItemsReport());
            });
        this.data$.pipe(untilDestroyed(this)).subscribe(heldClaims => {
            if (heldClaims.length) {
                this.rowData = heldClaims;
            }
        });
        this.actions$
            .pipe(ofType(BillCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
        this.store.dispatch(BillCenterTableActions.LoadHeldItemsReport());
    }

    onChangeSelection(params) {
        this.openItem(params.api.getSelectedRows()[0]);
    }

    openItem(params) {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Held Item Details',
            cancelButtonText: 'Cancel',
            saveButtonText: '',
            dynamicComponent: HeldItemDetailsComponent, // Component you want to load dynamically
            dynamicComponentData: params.id,
            submitFunction: '',
            enterKeyEnabled: true,
        };
        const dialogRef = this._matDialog.open(AuxPopupComponent, {
            width: '60%',
            height: 'auto',
            data: popupData,
        });
        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                // console.log('Compose dialog was closed!');
            });
    }

    revalidate() {
        this.store.dispatch(BillCenterTableActions.PrepareClaimsForValidation());
    }

    ngOnDestroy() {
        this.auxSearchService.resetFilter.next({ resetGrid: true });
    }
}
