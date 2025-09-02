import { AsyncPipe } from '@angular/common';
import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { Subject } from 'rxjs';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { DropdownDisplay } from '../../../../../../shared/interfaces/auxilium/patient-center/patient-status.interface';
import { PatientArHistoryActions } from '../../../actions/patient-ar-history.action';
import { PatientArHistorySelectors } from '../../../reducers';

@Component({
    selector: 'app-amtadjusted-code-list',
    templateUrl: './amtadjusted-code-list.component.html',
    styleUrls: ['./AmtAdjusted-Code-list.component.scss'],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class AmtAdjustedCodeListComponent {
    selectedItem!: DropdownDisplay;
    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 90, field: 'id', filter: 'agMultiColumnFilter', sortIndex: 1, hide: false },
        {
            headerName: 'Code',
            minWidth: 150,
            field: 'code',
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
    ];
    visibleColumns = ['id', 'code', 'description'];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    loading$ = this.store.select(PatientArHistorySelectors.selectLoading);
    rowData$ = this.store.select(PatientArHistorySelectors.selectAmtAdjustedCode);

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    amtadjustedCode: string = '';

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private store: Store,
        private _matDialog: MatDialogRef<AmtAdjustedCodeListComponent>,
        private searchService: AuxSearchService
    ) {
        if (this.data) {
            this.amtadjustedCode = this.data.dynamicComponentData
                ? this.data.dynamicComponentData?.amtadjustedCode || ''
                : '';
            if (this.amtadjustedCode) {
                const filterState = {
                    amtadjustedCode: {
                        filterType: 'multi',
                        filterModels: [
                            {
                                filterType: 'text',
                                type: 'contains',
                                filter: this.data.dynamicComponentData.amtadjustedCode,
                            },
                        ],
                    },
                };
                this.searchService.saveFilterState(filterState, 'amtadjustedCodeList');
            } else {
                this.searchService.saveFilterState({}, 'amtadjustedCodeList');
            }
        }
    }

    ngOnInit(): void {
        this.store.dispatch(PatientArHistoryActions.AmtAdjustedCodeDropdown());
    }

    selectRowSubmit() {
        this._matDialog.close(this.selectedItem);
        this.selectedItem = null;
    }

    selectionChange(params) {
        this.selectedItem = params.api.getSelectedRows()[0];
    }
}
