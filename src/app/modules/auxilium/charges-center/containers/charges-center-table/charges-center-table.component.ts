import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { ChargesCenterTableActions } from '../../actions/charges-center-table.action';
import { ChargesCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-charges-center-table',
    templateUrl: './charges-center-table.component.html',
    styleUrls: ['./charges-center-table.component.scss'],
    providers: [DateTimeFormatPipe, DateFormatPipe],
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
})
export class ChargesCenterTableComponent {
    data$ = this.store.select(ChargesCenterTableSelectors.selectChargesReps);
    loading$ = this.store.select(ChargesCenterTableSelectors.selectLoading);

    rowData = [];
    options = {
        gridOptions: {
            rowSelection: {
                mode: 'multiRow',
                checkboxes: true,
                headerCheckbox: true,
                selectAll: 'filtered',
                checkboxColumn: {
                    width: 100,
                    pinned: 'left',
                    resizable: true,
                    suppressMovable: true,
                    sortable: true,
                    filter: false,
                    lockPosition: true,
                    headerName: '',
                    suppressHeaderMenuButton: false,
                    headerTooltip: 'Checkboxes indicate selection',
                },
            },
            headerHeight: 36,
            rowHeight: 40,
        },
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    toolbarData: FuseNavigationItem[];

    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 107, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Pat Id',
            minWidth: 95,
            field: 'patientid',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Invoice #',
            minWidth: 107,
            field: 'invoiceno',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'SVC Date',
            minWidth: 125,
            field: 'svcdate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.svcdate),
            filterParams: filterParams,
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Item Code',
            minWidth: 115,
            field: 'itemcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        { headerName: 'T', minWidth: 75, field: 'billType', filter: 'agMultiColumnFilter', sortIndex: 5, hide: false },
        { headerName: 'C', minWidth: 75, field: 'confirm', filter: 'agMultiColumnFilter', sortIndex: 6, hide: false },
        {
            headerName: 'Qty',
            minWidth: 80,
            field: 'quantity',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Ship Status',
            minWidth: 115,
            field: 'shipstatus',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
        {
            headerName: 'Shipped On',
            minWidth: 160,
            field: 'shipdate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.shipdate),
            filterParams: filterParams,
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'Description',
            minWidth: 286,
            field: 'description',
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'Next Bill',
            minWidth: 115,
            field: 'lastdatebilled',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.lastdatebilled),
            filterParams: filterParams,
            sortIndex: 11,
            hide: false,
        },
        {
            headerName: 'CMN Expire',
            minWidth: 115,
            field: 'cmnexpire',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.cmnexpire),
            filterParams: filterParams,
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Notes Expire Date',
            minWidth: 115,
            field: 'notesexpiredate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.notesexpiredate),
            filterParams: filterParams,
            sortIndex: 13,
            hide: false,
        },
        {
            headerName: 'Auth Date',
            minWidth: 115,
            field: 'authdate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateTime.transform(params.data.authdate),
            filterParams: filterParams,
            sortIndex: 14,
            hide: false,
        },
        {
            headerName: 'Payer',
            minWidth: 165,
            field: 'primarypayer',
            filter: 'agMultiColumnFilter',
            hide: false,
            sortIndex: 15,
        },
    ];

    visibleColumns = [
        'checkedField',
        'patientid',
        'invoiceno',
        'svcdate',
        'billType',
        'confirm',
        'quantity',
        'itemcode',
        'shipstatus',
        'shipdate',
        'description',
        'lastdatebilled',
        'cmnexpire',
        'notesexpiredate',
        'authDate',
        'primarypayer',
    ];

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    selection = new SelectionModel<any>(true, []);

    constructor(
        private store: Store,
        private dateFormatePipe: DateFormatPipe,
        private dateTime: DateTimeFormatPipe,
        private actions$: Actions,
        private dialog: MatDialog,
        private route: ActivatedRoute
    ) {
        this.toolbarData = [];
    }

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(ChargesCenterTableActions.LoadCharges());
            });
        this.data$.pipe(untilDestroyed(this)).subscribe(salesRep => {
            this.rowData = salesRep;
        });

        this.actions$
            .pipe(ofType(ChargesCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
    }

    onChangeSelection($event) {
        this.selection.setSelection(...$event.api.getSelectedRows());
        const getPostIndex = this.toolbarData.findIndex(res => res.title === 'Post WO to Charge');
        if (getPostIndex === -1 && this.selection.selected.length) {
            this.toolbarData = [
                ...this.toolbarData,
                {
                    title: 'Post WO to Charge',
                    type: 'basic',
                    icon: 'mat_outline:edit_note',
                    function: item => {
                        this.postCharges($event);
                    },
                },
            ];
        } else {
            if (!this.selection.selected.length) {
                this.toolbarData = [];
            }
        }
    }

    postCharges(data) {
        const selectedRow = this.selection.selected.map(res => res.id);
        const patientData = {
            numbers: selectedRow,
        };
        this.store.dispatch(ChargesCenterTableActions.PostConfirmedWorkOrder({ patientData: patientData }));
        this.selection.clear();
        this.toolbarData = [];
    }
}
