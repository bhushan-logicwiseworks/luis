import { SelectionModel } from '@angular/cdk/collections';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import Swal from 'sweetalert2';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { BillCenterTableActions } from '../../../actions/bill-center-table.action';
import { BillCenterTableSelectors } from '../../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-work-orders-all',
    templateUrl: './work-orders-all.component.html',
    styleUrl: './work-orders-all.component.scss',
    imports: [FuseHorizontalNavigationComponent, AuxAgGridComponent, AsyncPipe],
    providers: [DateTimeFormatPipe, DateFormatPipe],
})
export class WorkOrdersAllComponent implements OnInit {
    data$ = this.store.select(BillCenterTableSelectors.selectWorkOrdersAll);
    loading$ = this.store.select(BillCenterTableSelectors.selectLoading);
    rowData = [];

    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
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
    selectAll: boolean = false;

    toolbarData: FuseNavigationItem[] = [
        {
            title: 'Convert to Charge',
            type: 'basic',
            icon: 'mat_outline:published_with_changes',
            function: item => {
                this.postCharges();
            },
        },
    ];

    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 80, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Pat Id',
            minWidth: 90,
            field: 'patientid',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'INV#',
            sort: 'desc',
            minWidth: 105,
            field: 'invoiceno',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'SVC Date',
            minWidth: 100,
            field: 'svcdate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.svcdate),
            filterParams: filterParams,
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Item Code',
            minWidth: 130,
            field: 'itemcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        { headerName: 'T', minWidth: 45, field: 'billtype', filter: 'agMultiColumnFilter', sortIndex: 5, hide: false },
        { headerName: 'C', minWidth: 45, field: 'confirm', filter: 'agMultiColumnFilter', sortIndex: 6, hide: false },
        {
            headerName: 'Qty',
            minWidth: 60,
            field: 'quantity',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Ship Status',
            minWidth: 100,
            field: 'shipstatus',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
        {
            headerName: 'Shipped On',
            minWidth: 100,
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
            minWidth: 100,
            field: 'lastdatebilled',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.lastdatebilled),
            filterParams: filterParams,
            sortIndex: 11,
            hide: false,
        },
        {
            headerName: 'CMN Expire',
            minWidth: 100,
            field: 'cmnexpire',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.cmnexpire),
            filterParams: filterParams,
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'Notes Expire Date',
            minWidth: 100,
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
            minWidth: 150,
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
        'billtype',
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

    selection = new SelectionModel<any>(true, []);

    constructor(
        private store: Store,
        private dateFormatePipe: DateFormatPipe,
        private dateTime: DateTimeFormatPipe,
        private actions$: Actions,
        private route: ActivatedRoute,
        private auxSearchService: AuxSearchService,
        private _fuseConfirmationService: FuseConfirmationService
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(BillCenterTableActions.LoadWorkOrdersAll());
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(salesRep => {
            this.rowData = salesRep;
        });
    }

    onChangeSelection($event) {
        this.selectAll = false;
        this.selection.setSelection(...$event.api.getSelectedRows());
        const getPostIndex = this.toolbarData.findIndex(res => res.title === 'Convert to Charge');
        if (getPostIndex === -1 && this.selection.selected.length) {
            this.toolbarData = [
                ...this.toolbarData,
                {
                    title: 'Convert to Charge',
                    type: 'basic',
                    icon: 'mat_outline:edit_note',
                    function: item => {
                        this.postCharges();
                    },
                },
            ];
        }
    }

    postCharges() {
        if (this.selection.isEmpty()) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please select at least one record',
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            // Open the confirmation dialog
            const confirmation = this._fuseConfirmationService.open({
                title: 'Convert to Charge',
                message: 'Are you sure you want to convert to Charge?',
                actions: {
                    confirm: {
                        label: 'YES',
                    },
                    cancel: {
                        label: 'NO',
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
                        const selectedRow = this.selection.selected.map(res => res.id);
                        const patientData = {
                            numbers: selectedRow,
                        };
                        this.store.dispatch(
                            BillCenterTableActions.PostConfirmedWorkOrder({ patientData: patientData })
                        );
                        this.selection.clear();
                    }
                });
        }
    }

    ngOnDestroy() {
        this.auxSearchService.resetFilter.next({ resetGrid: true });
    }
}
