import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { PhoneCellRendererComponent } from 'app/shared/components/phone-cell-renderer/phone-cell-renderer.component';
import { PhoneNumberPipe } from 'app/shared/pipes/auxilium/aux-phonenumber.pipe';
import { switchMap } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { PayorCenterTableActions } from '../../actions/payor-center-table.actions';
import { PayorCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-payor-center-table',
    templateUrl: './payor-center-table.component.html',
    styleUrls: ['./payor-center-table.component.scss'],
    providers: [PhoneNumberPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class PayorCenterTableComponent {
    data$ = this.route.paramMap.pipe(switchMap(paramMap => this.store.select(PayorCenterTableSelectors.selectPayor)));

    loading$ = this.store.select(PayorCenterTableSelectors.selectLoading);

    columnDefs: ColDef[] = [
        {
            headerName: 'Payor ID',
            minWidth: 90,
            field: 'id',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Bill-To Code',
            minWidth: 110,
            field: 'billto',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        { headerName: 'Name', minWidth: 275, field: 'name', filter: 'agMultiColumnFilter', sortIndex: 2, hide: false },
        {
            headerName: 'Phone',
            minWidth: 150,
            field: 'phone',
            cellRenderer: PhoneCellRendererComponent,
            cellRendererParams: { field: 'phone' },
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
            valueFormatter: (params: any) => this.phoneNumberPipe.transform(params.data.phone),
        },
        {
            headerName: 'Account',
            minWidth: 125,
            field: 'account',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Address',
            minWidth: 200,
            field: 'address',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        { headerName: 'City', minWidth: 125, field: 'city', filter: 'agMultiColumnFilter', sortIndex: 8, hide: false },
        {
            headerName: 'Payor Category',
            minWidth: 150,
            field: 'payorcategory',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        { headerName: 'NPI', minWidth: 150, field: 'npi', filter: 'agMultiColumnFilter', sortIndex: 9, hide: false },
        { headerName: 'Pin', minWidth: 150, field: 'pin', filter: 'agMultiColumnFilter', sortIndex: 9, hide: false },
        {
            headerName: 'Testprod5010',
            minWidth: 223,
            field: 'testprod5010',
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'Testprodedi',
            minWidth: 223,
            field: 'testprodedi',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
        },
        {
            headerName: 'Added by',
            minWidth: 123,
            field: 'adduserid',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
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

    visibleColumns = ['id', 'billto', 'name', 'city', 'phone', 'address', 'npi', 'pin'];

    constructor(
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private phoneNumberPipe: PhoneNumberPipe
    ) {}

    ngOnInit(): void {
        this.store.dispatch(PayorCenterTableActions.LoadPayor());
        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            this.rowData = data;
        });
    }

    onSelectionChanged(params) {
        const excludedColumns = ['phone'];
        if (!excludedColumns.includes(params.column.colId)) {
            this.openItem(params.api.getSelectedRows()[0]);
        }
    }

    openItem(payor) {
        this.router.navigateByUrl(`/centers/payor-center/${payor.id}/demographics`);
    }
}
