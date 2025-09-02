import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-enterprise';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { combineLatest, startWith, Subject } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { BillCenterTableActions } from '../../actions/bill-center-table.action';
import { BillCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-aging-report',
    templateUrl: './aging-report.component.html',
    styleUrl: './aging-report.component.scss',
    providers: [DateTimeFormatPipe, DateFormatPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class AgingReportComponent {
    data$ = this.store.select(BillCenterTableSelectors.selectAgingReport);
    loading$ = this.store.select(BillCenterTableSelectors.selectLoading);
    rowData = [];
    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    options = {
        gridOptions: {
            headerHeight: 36,
            rowHeight: 40,
        },
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    columnDefs: ColDef[] = [
        {
            headerName: 'Claim ID',
            minWidth: 80,
            field: 'claimid',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Patient ID',
            minWidth: 80,
            field: 'patientid',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Service Date',
            minWidth: 100,
            field: 'svcdate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.svcdate),
            filterParams: filterParams,
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Create Date',
            minWidth: 100,
            field: 'createdate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.createdate),
            filterParams: filterParams,
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Print Date',
            minWidth: 100,
            field: 'printdate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.printdate),
            filterParams: filterParams,
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Tran Type',
            minWidth: 80,
            field: 'trantype',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'HCPCS Code',
            minWidth: 100,
            field: 'hcpcscode',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Physician',
            minWidth: 120,
            field: 'physician',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
        {
            headerName: 'Print Status',
            minWidth: 100,
            field: 'printstatus',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'Submitted',
            minWidth: 80,
            field: 'submitted',
            filter: 'agNumberColumnFilter',
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'Bill Type',
            minWidth: 80,
            field: 'billtype',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
        },
        {
            headerName: 'Bill Form',
            minWidth: 80,
            field: 'billform',
            filter: 'agMultiColumnFilter',
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Patient Category',
            minWidth: 120,
            field: 'patientcategory',
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
        },
        {
            headerName: 'Add User ID',
            minWidth: 100,
            field: 'adduserid',
            filter: 'agMultiColumnFilter',
            sortIndex: 14,
            hide: false,
        },
        {
            headerName: 'Last Name',
            minWidth: 100,
            field: 'lastname',
            filter: 'agMultiColumnFilter',
            sortIndex: 15,
            hide: false,
        },
        {
            headerName: 'First Name',
            minWidth: 100,
            field: 'firstname',
            filter: 'agMultiColumnFilter',
            sortIndex: 16,
            hide: false,
        },
        {
            headerName: 'DOB',
            minWidth: 100,
            field: 'dob',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.dob),
            filterParams: filterParams,
            sortIndex: 17,
            hide: false,
        },
        {
            headerName: 'Patient Phone',
            minWidth: 120,
            field: 'patphone',
            filter: 'agMultiColumnFilter',
            sortIndex: 18,
            hide: false,
        },
        {
            headerName: 'Patient Alpha',
            minWidth: 120,
            field: 'patalpha',
            filter: 'agMultiColumnFilter',
            sortIndex: 19,
            hide: false,
        },
        {
            headerName: 'Branch Code',
            minWidth: 100,
            field: 'branchcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 20,
            hide: false,
        },
        {
            headerName: 'Item Category',
            minWidth: 120,
            field: 'itemcategory',
            filter: 'agMultiColumnFilter',
            sortIndex: 21,
            hide: false,
        },
        {
            headerName: 'Item Code',
            minWidth: 100,
            field: 'itemcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 22,
            hide: false,
        },
        {
            headerName: 'Payor Name 1',
            minWidth: 120,
            field: 'patpayornamE1',
            filter: 'agMultiColumnFilter',
            sortIndex: 23,
            hide: false,
        },
        {
            headerName: 'Payor Phone 1',
            minWidth: 120,
            field: 'patpayorphonE1',
            filter: 'agMultiColumnFilter',
            sortIndex: 24,
            hide: false,
        },
        {
            headerName: 'Payor Name 2',
            minWidth: 120,
            field: 'patpayornamE2',
            filter: 'agMultiColumnFilter',
            sortIndex: 25,
            hide: false,
        },
        {
            headerName: 'Payor Phone 2',
            minWidth: 120,
            field: 'patpayorphonE2',
            filter: 'agMultiColumnFilter',
            sortIndex: 26,
            hide: false,
        },
        {
            headerName: 'Bill To',
            minWidth: 100,
            field: 'billto',
            filter: 'agMultiColumnFilter',
            sortIndex: 27,
            hide: false,
        },
        {
            headerName: 'Bill To Name',
            minWidth: 120,
            field: 'billtoname',
            filter: 'agMultiColumnFilter',
            sortIndex: 28,
            hide: false,
        },
        {
            headerName: 'Bill To Phone',
            minWidth: 120,
            field: 'billtophone',
            filter: 'agMultiColumnFilter',
            sortIndex: 29,
            hide: false,
        },
        {
            headerName: 'Payor Category',
            minWidth: 120,
            field: 'payorcategory',
            filter: 'agMultiColumnFilter',
            sortIndex: 30,
            hide: false,
        },
        {
            headerName: 'Policy 1',
            minWidth: 120,
            field: 'policY1',
            filter: 'agMultiColumnFilter',
            sortIndex: 31,
            hide: false,
        },
        {
            headerName: 'Policy 2',
            minWidth: 120,
            field: 'policY2',
            filter: 'agMultiColumnFilter',
            sortIndex: 32,
            hide: false,
        },
        { headerName: 'Rank', minWidth: 80, field: 'rank', filter: 'agNumberColumnFilter', sortIndex: 33, hide: false },
        {
            headerName: 'Physician Key',
            minWidth: 120,
            field: 'phykey',
            filter: 'agMultiColumnFilter',
            sortIndex: 34,
            hide: false,
        },
        {
            headerName: 'Refer Code',
            minWidth: 120,
            field: 'refercode',
            filter: 'agMultiColumnFilter',
            sortIndex: 35,
            hide: false,
        },
        {
            headerName: 'Refer Name',
            minWidth: 120,
            field: 'refername',
            filter: 'agMultiColumnFilter',
            sortIndex: 36,
            hide: false,
        },
        {
            headerName: 'Sales Code',
            minWidth: 100,
            field: 'salescode',
            filter: 'agMultiColumnFilter',
            sortIndex: 37,
            hide: false,
        },
        { headerName: 'Note', minWidth: 200, field: 'note', filter: 'agMultiColumnFilter', sortIndex: 38, hide: false },
        {
            headerName: 'Company Name',
            minWidth: 120,
            field: 'companyname',
            filter: 'agMultiColumnFilter',
            sortIndex: 39,
            hide: false,
        },
        {
            headerName: 'Detail 30 Balance',
            minWidth: 120,
            field: 'detaiL30BALANCE',
            filter: 'agNumberColumnFilter',
            sortIndex: 40,
            hide: false,
        },
        {
            headerName: 'Summary 30 Balance',
            minWidth: 120,
            field: 'summarY30BALANCE',
            filter: 'agNumberColumnFilter',
            sortIndex: 41,
            hide: false,
        },
        {
            headerName: 'Detail 60 Balance',
            minWidth: 120,
            field: 'detaiL60BALANCE',
            filter: 'agNumberColumnFilter',
            sortIndex: 42,
            hide: false,
        },
        {
            headerName: 'Summary 60 Balance',
            minWidth: 120,
            field: 'summarY60BALANCE',
            filter: 'agNumberColumnFilter',
            sortIndex: 43,
            hide: false,
        },
        {
            headerName: 'Detail 90 Balance',
            minWidth: 120,
            field: 'detaiL90BALANCE',
            filter: 'agNumberColumnFilter',
            sortIndex: 44,
            hide: false,
        },
        {
            headerName: 'Summary 90 Balance',
            minWidth: 120,
            field: 'summarY90BALANCE',
            filter: 'agNumberColumnFilter',
            sortIndex: 45,
            hide: false,
        },
        {
            headerName: 'Detail 120 Balance',
            minWidth: 120,
            field: 'detaiL120BALANCE',
            filter: 'agNumberColumnFilter',
            sortIndex: 46,
            hide: false,
        },
        {
            headerName: 'Summary 120 Balance',
            minWidth: 120,
            field: 'summarY120BALANCE',
            filter: 'agNumberColumnFilter',
            sortIndex: 47,
            hide: false,
        },
        {
            headerName: 'Summary 150 Balance',
            minWidth: 120,
            field: 'summarY150BALANCE',
            filter: 'agNumberColumnFilter',
            sortIndex: 48,
            hide: false,
        },
        {
            headerName: 'Details 180 Balance',
            minWidth: 120,
            field: 'detaiL180BALANCE',
            filter: 'agNumberColumnFilter',
            sortIndex: 49,
            hide: false,
        },
        {
            headerName: 'Details 210 Balance',
            minWidth: 120,
            field: 'detaiL210BALANCE',
            filter: 'agNumberColumnFilter',
            sortIndex: 50,
            hide: false,
        },
        {
            headerName: 'Details 240 Balance',
            minWidth: 120,
            field: 'detaiL240BALANCE',
            filter: 'agNumberColumnFilter',
            sortIndex: 51,
            hide: false,
        },
        {
            headerName: 'Collection Notes',
            minWidth: 120,
            field: 'collectionnotes',
            filter: 'agMultiColumnFilter',
            sortIndex: 52,
            hide: false,
        },
        {
            headerName: 'Include Collection Notes',
            minWidth: 120,
            field: 'includecollectionnotes',
            filter: 'agMultiColumnFilter',
            sortIndex: 52,
            hide: false,
            cellRenderer: null,
            valueFormatter: params => `${params.value}`,
        },
        {
            headerName: 'Payor Balance',
            minWidth: 120,
            field: 'payorbalance',
            filter: 'agMultiColumnFilter',
            sortIndex: 52,
            hide: false,
        },
        {
            headerName: 'Patient Balance',
            minWidth: 120,
            field: 'patientbalance',
            filter: 'agMultiColumnFilter',
            sortIndex: 52,
            hide: false,
        },
        {
            headerName: 'Aged By',
            minWidth: 120,
            field: 'agedby',
            filter: 'agMultiColumnFilter',
            sortIndex: 52,
            hide: false,
        },
        {
            headerName: 'Group Code',
            minWidth: 120,
            field: 'groupcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 52,
            hide: false,
        },
        {
            headerName: 'Group Caption',
            minWidth: 120,
            field: 'groupcaption',
            filter: 'agMultiColumnFilter',
            sortIndex: 52,
            hide: false,
        },
        {
            headerName: 'Report User',
            minWidth: 120,
            field: 'reportuser',
            filter: 'agMultiColumnFilter',
            sortIndex: 52,
            hide: false,
        },
    ];
    visibleColumns = [
        'claimid',
        'patientid',
        'svcdate',
        'billtype',
        'itemcode',
        'billtoname',
        'billtophone',
        'patientbalance',
        'payorbalance',
        'collectionnotes',
        'createdate',
        'printdate',
    ];

    constructor(
        private store: Store,
        private dateFormatePipe: DateFormatPipe,
        private dateTime: DateTimeFormatPipe,
        private actions$: Actions,
        private route: ActivatedRoute,
        private auxSearchService: AuxSearchService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(BillCenterTableActions.LoadAgingReport());
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(agingReport => {
            if (agingReport) {
                this.rowData = agingReport;
            }
        });

        this.actions$
            .pipe(ofType(BillCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
        this.store.dispatch(BillCenterTableActions.LoadAgingReport());
    }

    ngOnDestroy() {
        this.auxSearchService.resetFilter.next({ resetGrid: true });
    }
}
