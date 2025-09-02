import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { fuseAnimations } from '@fuse/animations';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { constVariables } from 'app/common/constants/constVariables';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { states } from 'app/shared/components/auxilium/states';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { HeldItemsReportDisplay } from 'app/shared/interfaces/auxilium/billType-center/held-items-report.interface';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { BillCenterTableActions } from '../../actions/bill-center-table.action';
import { BillCenterTableSelectors } from '../../reducers';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-held-item-details',
    templateUrl: './held-item-details.component.html',
    styleUrls: ['./held-item-details.component.scss'],
    animations: fuseAnimations,
    providers: [
        DateTimeFormatPipe,
        DateFormatPipe,
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
    ],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class HeldItemDetailsComponent {
    loading$ = this.store.select(BillCenterTableSelectors.selectLoading);
    data$ = this.store.select(BillCenterTableSelectors.selectHeldItemsDetails);
    rowData: HeldItemsReportDisplay[] = [];
    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    selectAll: boolean = false;

    columnDefs: ColDef[] = [
        {
            headerName: 'ID',
            minWidth: 80,
            field: 'patientid',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'CLAIMID',
            minWidth: 80,
            field: 'claimid',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Held Reason',
            minWidth: 150,
            field: 'heldreason',
            filter: 'agMultiColumnFilter',
            hide: false,
            sortIndex: 3,
        },
        {
            headerName: 'Description',
            minWidth: 300,
            field: 'description',
            filter: 'agMultiColumnFilter',
            hide: false,
            sortIndex: 4,
        },
        {
            headerName: 'Bad Data',
            minWidth: 400,
            field: 'baddata',
            filter: 'agMultiColumnFilter',
            hide: false,
            sortIndex: 5,
        },
        {
            headerName: 'ADDUSERID',
            minWidth: 115,
            field: 'adduserid',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'ADDDATE',
            minWidth: 115,
            field: 'adddate',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Bill Form Name',
            minWidth: 100,
            field: 'billformname',
            filter: 'agMultiColumnFilter',
            hide: false,
            sortIndex: 8,
        },
        {
            headerName: 'Bill Form',
            minWidth: 95,
            field: 'billform',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'Accession No',
            sort: 'desc',
            minWidth: 125,
            field: 'accessionno',
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'Patient Alpha',
            minWidth: 75,
            field: 'patalpha',
            filter: 'agMultiColumnFilter',
            hide: false,
            sortIndex: 11,
        },
        {
            headerName: 'SVC Date',
            minWidth: 120,
            field: 'svcdate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.svcdate),
            filterParams: filterParams,
            sortIndex: 12,
            hide: false,
        },
        {
            headerName: 'HCPCS Code',
            minWidth: 100,
            field: 'hcpcscode',
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
            hide: false,
        },
        {
            headerName: 'Item Code',
            minWidth: 130,
            field: 'itemcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 14,
            hide: false,
        },
        {
            headerName: 'Bill No',
            minWidth: 100,
            field: 'billto',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 15,
            hide: false,
        },
        {
            headerName: 'Secondary Bill To',
            minWidth: 100,
            field: 'secondarybillto',
            filter: 'agMultiColumnFilter',
            hide: false,
            sortIndex: 16,
        },
        {
            headerName: 'Print Status',
            minWidth: 75,
            field: 'printstatus',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        { headerName: 'Held', minWidth: 250, field: 'held', filter: 'agMultiColumnFilter', sortIndex: 18, hide: false },
        {
            headerName: 'Branch Code',
            minWidth: 75,
            field: 'branchcode',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 19,
            hide: false,
        },
        {
            headerName: 'Diagnosis',
            minWidth: 100,
            field: 'diagnosis',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 20,
            hide: false,
        },
        {
            headerName: 'Company Name',
            minWidth: 100,
            field: 'companyname',
            filter: 'agMultiColumnFilter',
            hide: false,
            sortIndex: 21,
        },
        {
            headerName: 'Report Filter',
            minWidth: 150,
            field: 'reportfilter',
            filter: 'agMultiColumnFilter',
            hide: false,
            sortIndex: 22,
        },
        {
            headerName: 'Report User',
            minWidth: 150,
            field: 'reportuser',
            filter: 'agMultiColumnFilter',
            hide: false,
            sortIndex: 23,
        },
    ];

    visibleColumns = ['patientid', 'claimid', , 'heldreason', 'description', 'baddata'];

    usstates = states;
    dateFormat: string = constVariables.DATE_FORMAT;

    pecosOptions = [
        {
            option: '',
            value: '',
        },
        {
            option: 'Yes',
            value: 'Y',
        },
        {
            option: 'No',
            value: 'N',
        },
    ];

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
        private store: Store,
        private dateFormatePipe: DateFormatPipe,
        private auxSearchService: AuxSearchService
    ) {
        this.store.dispatch(BillCenterTableActions.LoadHeldItemDetails({ claimId: this.data.dynamicComponentData }));
    }

    ngOnInit(): void {
        this.data$.pipe(untilDestroyed(this)).subscribe(salesRep => {
            this.rowData = salesRep;
        });
    }

    onChangeSelection($event) {}

    trackByFn(item: any) {
        return item.abbreviation;
    }

    ngOnDestroy() {
        //this.auxSearchService.resetFilter.next({ resetGrid: true });
    }
}
