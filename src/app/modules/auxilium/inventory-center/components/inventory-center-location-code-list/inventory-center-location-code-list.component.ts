import { AsyncPipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { Subject } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { LocationCodeDisplay } from '../../../../../shared/interfaces/auxilium/inventory-center/location-code-list.interface';
import { InventoryCenterLocationListActions } from '../../actions/inventory-center-location-list.actions';
import { InventoryCenterLocationSelectors } from '../../reducers';

@Component({
    selector: 'app-inventory-center-location-code-list',
    templateUrl: './inventory-center-location-code-list.component.html',
    styleUrls: ['./inventory-center-location-code-list.component.scss'],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class InventoryCenterLocationCodeListComponent {
    selectedItem!: LocationCodeDisplay;
    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', minWidth: 90, filter: 'agMultiColumnFilter', sortIndex: 1 },
        {
            headerName: 'Location Code',
            field: 'locationcode',
            minWidth: 150,
            filter: 'agMultiColumnFilter',
            sortIndex: 2,
        },
        { headerName: 'Item ID', field: 'itemid', minWidth: 120, filter: 'agMultiColumnFilter', sortIndex: 3 },
        { headerName: 'Location ID', field: 'locationid', minWidth: 130, filter: 'agMultiColumnFilter', sortIndex: 4 },
        { headerName: 'On Hand', field: 'onhand', minWidth: 120, filter: 'agMultiColumnFilter', sortIndex: 5 },
        { headerName: 'Allocated', field: 'allocated', minWidth: 120, filter: 'agMultiColumnFilter', sortIndex: 6 },
        { headerName: 'On Order', field: 'onorder', minWidth: 120, filter: 'agMultiColumnFilter', sortIndex: 7 },
        { headerName: 'Notes', field: 'notes', minWidth: 200, filter: 'agMultiColumnFilter', sortIndex: 8 },
        { headerName: 'Last Cost', field: 'lastcost', minWidth: 120, filter: 'agMultiColumnFilter', sortIndex: 9 },
        {
            headerName: 'Average Cost',
            field: 'averagecost',
            minWidth: 130,
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
        },
        {
            headerName: 'Minimum Order',
            field: 'minimumorder',
            minWidth: 140,
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
        },
        { headerName: 'Activation', field: 'activation', minWidth: 120, filter: 'agMultiColumnFilter', sortIndex: 12 },
        {
            headerName: 'Location Type',
            field: 'locationtype',
            minWidth: 140,
            filter: 'agMultiColumnFilter',
            sortIndex: 13,
        },
    ];

    visibleColumns = [
        'id',
        'locationcode',
        'itemid',
        'locationid',
        'onhand',
        'allocated',
        'onorder',
        'notes',
        'lastcost',
        'locationtype',
    ];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    loading$ = this.store.select(InventoryCenterLocationSelectors.selectLoading);
    rowData$ = this.store.select(InventoryCenterLocationSelectors.selectLocationCodeList);

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    locationBin: string = '';

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private store: Store,
        private _matDialog: MatDialogRef<InventoryCenterLocationCodeListComponent>,
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
        this.store.dispatch(InventoryCenterLocationListActions.LocationCodeDropdown());
    }

    selectRowSubmit() {
        this._matDialog.close(this.selectedItem);
        this.selectedItem = null;
    }

    selectionChange(params) {
        this.selectedItem = params.api.getSelectedRows()[0];
    }
}
