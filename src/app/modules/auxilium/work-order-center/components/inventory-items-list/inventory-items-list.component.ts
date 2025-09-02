import { AsyncPipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { InventoryCenterTableActions } from 'app/modules/auxilium/inventory-center/actions/inventory-center-table.actions';
import { InventoryCenterTableSelectors } from 'app/modules/auxilium/inventory-center/reducers';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { InventoryProductItem } from 'app/shared/interfaces/auxilium/inventory-center/product.interface';
import { Subject } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';

@Component({
    selector: 'app-inventory-items-list',
    templateUrl: './inventory-items-list.component.html',
    styleUrls: ['./inventory-items-list.component.scss'],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class InventoryItemsListComponent {
    selectedItem!: InventoryProductItem;
    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 90, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Item Code',
            minWidth: 150,
            field: 'itemcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Alternate Code',
            minWidth: 150,
            field: 'alternatecode',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Description',
            minWidth: 500,
            field: 'description',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Description2',
            minWidth: 500,
            field: 'description2',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'Added by ',
            minWidth: 200,
            field: 'adduserid',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
    ];
    visibleColumns = ['id', 'itemcode', 'alternatecode', 'description', 'description2', 'adduserid'];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    loading$ = this.store.select(InventoryCenterTableSelectors.selectLoading);
    rowData$ = this.store.select(InventoryCenterTableSelectors.selectInventory);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    itemCode: string = '';

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private store: Store,
        private _matDialog: MatDialogRef<InventoryItemsListComponent>,
        private searchService: AuxSearchService
    ) {
        // Always clear the filter state when the popup is opened
        this.searchService.saveFilterState({}, 'inventoryItemsList');

        if (this.data) {
            this.itemCode = this.data.dynamicComponentData ? this.data.dynamicComponentData?.itemCode || '' : '';
            if (this.itemCode) {
                const filterState = {
                    itemcode: {
                        filterType: 'multi',
                        filterModels: [
                            {
                                filterType: 'text',
                                type: 'contains',
                                filter: this.data.dynamicComponentData.itemCode,
                            },
                        ],
                    },
                };
                // this.searchService.saveFilterState(filterState, 'inventoryItemsList');
            }
        }
    }

    ngOnInit(): void {
        this.store.dispatch(InventoryCenterTableActions.LoadInventory({ filter: 'active' }));
    }

    selectRowSubmit() {
        this._matDialog.close(this.selectedItem);
        this.selectedItem = null;
    }

    selectionChange(params) {
        this.selectedItem = params.api.getSelectedRows()[0];
    }
}
