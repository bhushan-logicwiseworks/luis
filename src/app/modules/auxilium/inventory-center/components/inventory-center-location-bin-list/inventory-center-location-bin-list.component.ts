import { AsyncPipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { Subject } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { LocationBinDisplay } from '../../../../../shared/interfaces/auxilium/inventory-center/location-bin-list.interface';
import { InventoryCenterLocationListActions } from '../../actions/inventory-center-location-list.actions';
import { InventoryCenterLocationSelectors } from '../../reducers';

@Component({
    selector: 'app-inventory-center-location-bin-list',
    templateUrl: './inventory-center-location-bin-list.component.html',
    styleUrls: ['./inventory-center-location-bin-list.component.scss'],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class InventoryCenterLocationBinListComponent {
    selectedItem!: LocationBinDisplay;
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
            headerName: 'Inventory Location ID',
            minWidth: 150,
            field: 'inventorylocationid',
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Bin Code',
            minWidth: 250,
            field: 'bincode',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'On Hand',
            minWidth: 150,
            field: 'onhand',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'Allocated',
            minWidth: 100,
            field: 'allocated',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'On Order',
            minWidth: 120,
            field: 'onorder',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
    ];
    visibleColumns = ['id', 'inventorylocationid', 'bincode', 'onhand', 'allocated', 'onorder'];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    loading$ = this.store.select(InventoryCenterLocationSelectors.selectLoading);
    rowData$ = this.store.select(InventoryCenterLocationSelectors.selectLocationBinList);

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    locationBin: string = '';

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private store: Store,
        private _matDialog: MatDialogRef<InventoryCenterLocationBinListComponent>,
        private searchService: AuxSearchService
    ) {
        if (this.data) {
            this.locationBin = this.data.dynamicComponentData ? this.data.dynamicComponentData?.locationBin || '' : '';
            if (this.locationBin) {
                const filterState = {
                    locationBin: {
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
                this.searchService.saveFilterState(filterState, 'locationBinList');
            } else {
                this.searchService.saveFilterState({}, 'locationBinList');
            }
        }
    }

    ngOnInit(): void {
        this.store.dispatch(InventoryCenterLocationListActions.LocationBinDropdown());
    }

    selectRowSubmit() {
        this._matDialog.close(this.selectedItem);
        this.selectedItem = null;
    }

    selectionChange(params) {
        this.selectedItem = params.api.getSelectedRows()[0];
    }
}
