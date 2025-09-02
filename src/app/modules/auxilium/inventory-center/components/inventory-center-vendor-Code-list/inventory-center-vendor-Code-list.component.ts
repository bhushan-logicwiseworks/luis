import { AsyncPipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { Subject } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { DropdownDisplay } from '../../../../../shared/interfaces/auxilium/patient-center/patient-status.interface';
import { InventoryCenterVendorTableActions } from '../../actions/inventory-center-vendor-table.actions';
import { InventoryCenterVendorTableSelectors } from '../../reducers';

@Component({
    selector: 'app-inventory-center-vendor-code-list',
    templateUrl: './inventory-center-vendor-code-list.component.html',
    styleUrls: ['./inventory-center-vendor-code-list.component.scss'],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class InventoryCenterVendorCodeListComponent {
    selectedItem!: DropdownDisplay;
    columnDefs: ColDef[] = [
        {
            headerName: 'ID',
            minWidth: 90,
            field: 'id',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Vendor Code',
            minWidth: 150,
            field: 'vendorcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Company',
            minWidth: 250,
            field: 'company',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'City',
            minWidth: 150,
            field: 'city',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'State',
            minWidth: 100,
            field: 'state',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'ZIP',
            minWidth: 120,
            field: 'zip',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Contact',
            minWidth: 180,
            field: 'contact',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Phone',
            minWidth: 160,
            field: 'phone',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
    ];
    visibleColumns = ['id', 'vendorcode', 'company', 'city', 'state', 'zip', 'contact', 'phone'];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    loading$ = this.store.select(InventoryCenterVendorTableSelectors.selectLoading);
    rowData$ = this.store.select(InventoryCenterVendorTableSelectors.selectVendorCodes);

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    vendorCode: string = '';

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private store: Store,
        private _matDialog: MatDialogRef<InventoryCenterVendorCodeListComponent>,
        private searchService: AuxSearchService
    ) {
        if (this.data) {
            this.vendorCode = this.data.dynamicComponentData ? this.data.dynamicComponentData?.vendorCode || '' : '';
            if (this.vendorCode) {
                const filterState = {
                    vendorCode: {
                        filterType: 'multi',
                        filterModels: [
                            {
                                filterType: 'text',
                                type: 'contains',
                                filter: this.data.dynamicComponentData.vendorCode,
                            },
                        ],
                    },
                };
                this.searchService.saveFilterState(filterState, 'vendorCodeList');
            } else {
                this.searchService.saveFilterState({}, 'vendorCodeList');
            }
        }
    }

    ngOnInit(): void {
        this.store.dispatch(InventoryCenterVendorTableActions.VendorCodeDropdown());
    }

    selectRowSubmit() {
        this._matDialog.close(this.selectedItem);
        this.selectedItem = null;
    }

    selectionChange(params) {
        this.selectedItem = params.api.getSelectedRows()[0];
    }
}
