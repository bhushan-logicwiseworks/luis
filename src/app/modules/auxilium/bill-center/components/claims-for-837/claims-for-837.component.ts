import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { Subject } from 'rxjs';
import { BillCenterTableActions } from '../../actions/bill-center-table.action';
import { BillCenterTableSelectors } from '../../reducers';
import { FuseHorizontalNavigationComponent } from '../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { AsyncPipe } from '@angular/common';
@UntilDestroy()
@Component({
    selector: 'app-claims-for-837',
    templateUrl: './claims-for-837.component.html',
    styleUrls: ['./claims-for-837.component.scss'],
    animations: fuseAnimations,
    imports: [
        FuseHorizontalNavigationComponent,
        AuxAgGridComponent,
        AsyncPipe,
    ],
})
export class ClaimsFor837Component {
    loading$ = this.store.select(BillCenterTableSelectors.selectLoading);
    data$ = this.store.select(BillCenterTableSelectors.selectClaimFor837);
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
            title: 'Generate 837 File',
            type: 'basic',
            icon: 'mat_outline:published_with_changes',
            function: item => {
                this.generate837File();
            },
        },
    ];

    columnDefs: ColDef[] = [
        {
            headerName: 'Branch Code',
            minWidth: 80,
            field: 'branchCode',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Bill To',
            minWidth: 80,
            field: 'billTo',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'TranType',
            minWidth: 95,
            field: 'tranType',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Mspcob',
            minWidth: 120,
            field: 'mspcob',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 4,
            hide: false,
            cellRenderer: null,
            valueFormatter: params => `${params.value}`,
        },
        {
            headerName: 'Payor Category',
            minWidth: 100,
            field: 'payorCategory',
            filter: 'agMultiColumnFilter',
            filterParams: filterParams,
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'PayTo',
            minWidth: 130,
            field: 'payTo',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        { headerName: 'Name', minWidth: 130, field: 'name', filter: 'agMultiColumnFilter', sortIndex: 7, hide: false },
        {
            headerName: 'Claim Count',
            minWidth: 50,
            field: 'claimCount',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
        {
            headerName: 'Charges',
            minWidth: 50,
            field: 'charges',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'ClaimFile',
            minWidth: 50,
            field: 'claimFile',
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
            hide: false,
        },
    ];

    visibleColumns = [
        'branchCode',
        'billTo',
        'tranType',
        'mspcob',
        'payorCategory',
        'payTo',
        'name',
        'claimCount',
        'charges',
    ];

    selection = new SelectionModel<any>(true, []);

    constructor(
        private store: Store,
        private actions$: Actions,
        private auxSearchService: AuxSearchService
    ) {
        this.store.dispatch(BillCenterTableActions.LoadClaimFor837());
    }

    ngOnInit() {
        this.data$.pipe(untilDestroyed(this)).subscribe(claimFor837 => {
            if (claimFor837.length) {
                this.rowData = claimFor837;
            }
        });
        this.actions$
            .pipe(ofType(BillCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));
        this.store.dispatch(BillCenterTableActions.LoadClaimFor837());
    }

    onChangeSelection(params) {}

    generate837File() {
        this.store.dispatch(BillCenterTableActions.CreateClaimsFileFor837());
    }

    ngOnDestroy() {
        this.auxSearchService.resetFilter.next({ resetGrid: true });
    }
}
