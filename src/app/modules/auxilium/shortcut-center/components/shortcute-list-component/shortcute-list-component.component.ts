import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { ShortcutsTableSelectors } from 'app/modules/auxilium/shortcut-center/reducer';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { ShortcutCenterTableActions } from '../../action/shortcut-center-table.action';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-shortcute-list-component',
    templateUrl: './shortcute-list-component.component.html',
    styleUrls: ['./shortcute-list-component.component.scss'],
    providers: [DateFormatPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class ShortcuteListComponentComponent {
    loading$ = this.store.select(ShortcutsTableSelectors.selectLoading);
    data$ = this.store.select(ShortcutsTableSelectors.selectShortcuts);
    selectedRow;

    columnDefs: ColDef[] = [
        { headerName: 'ID', minWidth: 100, field: 'id', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'title', minWidth: 150, field: 'title', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'description', minWidth: 260, field: 'description', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'category', minWidth: 223, field: 'category', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'itemId1', minWidth: 203, field: 'itemId1', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'billType1', minWidth: 223, field: 'billType1', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'quantity1', minWidth: 123, field: 'quantity1', filter: 'agMultiColumnFilter', hide: false },
        { headerName: 'addedBy', minWidth: 223, field: 'addedBy', filter: 'agMultiColumnFilter', hide: false },
        {
            headerName: 'addedDate',
            minWidth: 160,
            field: 'addedDate',
            filter: 'agDateColumnFilter',
            valueFormatter: (params: any) => this.dateFormatePipe.transform(params.data.addedDate),
            hide: false,
            filterParams: filterParams,
        },
    ];

    shortcutListData = [];

    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    visibleColumns = ['id', 'title', 'description', 'category', 'addedBy', 'addedDate'];

    constructor(
        private store: Store,
        private dateFormatePipe: DateFormatPipe,
        private _matDialog: MatDialogRef<ShortcuteListComponentComponent>,
        private searchService: AuxSearchService
    ) {}

    ngOnInit(): void {
        this.store.dispatch(ShortcutCenterTableActions.LoadShortcut());
        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            this.shortcutListData = data;
        });
    }

    saveSelectedShortcut() {
        this._matDialog.close(this.selectedRow);
        this.clearFilter();
        this.selectedRow = null;
    }

    selectionChange(params) {
        this.selectedRow = params.api.getSelectedRows()[0];
    }

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }
}
