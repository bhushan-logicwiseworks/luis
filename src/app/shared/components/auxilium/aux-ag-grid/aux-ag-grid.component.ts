import { AsyncPipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { FuseConfigService } from '@fuse/services/config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AgGridAngular } from 'ag-grid-angular';
import {
    ColDef,
    Column,
    ColumnVisibleEvent,
    FilterChangedEvent,
    GridApi,
    GridOptions,
    GridReadyEvent,
    RowNode,
    RowSelectionOptions,
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import { LicenseManager } from 'ag-grid-enterprise';
import { AppConfig } from 'app/core/config/app.config';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import {
    DefaulPageOptions,
    DefaultColumnDefinition,
    DefaultGridOptions,
    dateFilterValueGetter,
} from 'app/shared/constants/aux-ag-grid.constants';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';
import { LoadingOverlayComponent } from '../../loading-overlay/loading-overlay.component';
import { AuxPaginationComponent } from '../aux-pagination/aux-pagination.component';
LicenseManager.setLicenseKey(environment.AG_Grid_API_KEY);
interface AgGridOptions {
    gridOptions: GridOptions;
    defaultColDef: ColDef;
}

@UntilDestroy()
@Component({
    selector: 'aux-ag-grid',
    templateUrl: './aux-ag-grid.component.html',
    styleUrls: ['./aux-ag-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AgGridAngular,
        NgClass,
        MatMenu,
        MatCheckbox,
        MatIconButton,
        MatMenuTrigger,
        MatIcon,
        AuxPaginationComponent,
        MatPaginator,
        LoadingOverlayComponent,
        AsyncPipe,
    ],
})
export class AuxAgGridComponent implements OnInit, OnChanges, OnDestroy {
    @Input() gridOptions: AgGridOptions;
    @Input() rowData = [];
    @Input() columnDefs: ColDef[] = [];
    @Input() visibleColumns: string[] = [];
    @Input() loading: boolean = false;
    @Input() paginatorOption: { pageSize: number; pageSizeOptions: number[] };
    @Input() isCsvExport: boolean = false;
    @Input() agGridHeight: string = 'calc(100vh - 320px)';
    @Output() rowSelectionChange = new EventEmitter<any>();
    @Input() component: string = '';
    @Input() selectAllManually: boolean = false;
    @Output() cellClicked = new EventEmitter<any>();
    @Output() RowDragEndEvent = new EventEmitter<any>();
    @Output() RowDragMoveEvent = new EventEmitter<any>();

    pageLength$ = new BehaviorSubject<number>(-1);
    currentPage$ = new BehaviorSubject<number>(0);
    icons = '<mat-icon svgIcon="mat_outline:edit"></mat-icon>';
    isDark: boolean = false;

    defaultGridOptions: GridOptions = {
        ...DefaultGridOptions,
        onRowDragEnd: this.handleRowDragEnd.bind(this),
        onRowDragMove: this.handleRowDragMoveEvent.bind(this),
        onFirstDataRendered: this.restoreFilterState.bind(this),
        onRowDataUpdated: this.restoreFilterState.bind(this),
        onFilterChanged: this.saveFilterState.bind(this),
        defaultColDef: {
            ...DefaultColumnDefinition,
        },
    };

    modifiedColumnDefs: ColDef[] = [];

    defaultPageOptions = {
        ...DefaulPageOptions,
    };

    public gridApi!: GridApi<any>;
    public gridColumnApi!: Column;

    constructor(
        private searchService: AuxSearchService,
        private _fuseConfigService: FuseConfigService,
        private cd: ChangeDetectorRef
    ) {
        _fuseConfigService.config$.pipe(untilDestroyed(this)).subscribe((config: AppConfig) => {
            if (config.scheme === 'dark') {
                this.isDark = true;
            } else {
                this.isDark = false;
            }
        });
    }

    ngOnInit(): void {
        if (this.gridOptions) {
            this.updateGridOptions(this.gridOptions);
        }

        if (this.searchService.getPaginationState(this.component + 'p') == null) {
            if (this.paginatorOption) {
                this.updateGridPageOptions();
            }
        } else {
            const paginationState = this.searchService.getPaginationState(this.component + 'p');
            this.defaultPageOptions.pageSize = paginationState[this.component].pagination;
        }
        if (this.searchService.getPaginationState(this.component + 'pagination') != null) {
            const paginationState = this.searchService.getPaginationState(this.component + 'pagination');
            const pageIndex = paginationState.pageIndex;
            this.currentPage$.next(pageIndex);
        }
        this.searchService.search$.pipe(untilDestroyed(this)).subscribe(value => {
            this.onFilterChange(value);
        });
        this.searchService.resetFilter$.pipe(untilDestroyed(this)).subscribe(value => {
            if (value.resetGrid) {
                this.resetFilters();
            }
        });
    }

    handleRowDragMoveEvent(e) {
        this.RowDragMoveEvent.emit(e);
    }
    handleRowDragEnd(e) {
        const tempData = e?.nodes.map((node: RowNode) => node.data);
        if (tempData[0].rank === 9) {
            return;
        }
        const dragSelectedData = e?.node?.data;
        const dragUpdateDataRowNode = e?.overNode?.data;
        if (dragSelectedData.rank === 8) {
            if (dragUpdateDataRowNode.rank === 9) {
                return;
            }
        }
        if (dragSelectedData.rank !== undefined && dragUpdateDataRowNode.rank !== undefined) {
            // Swap the "rank" data
            const tempRank = dragSelectedData.rank;
            dragSelectedData.rank = dragUpdateDataRowNode.rank;
            dragUpdateDataRowNode.rank = tempRank;
            this.rowData.findIndex(record => record.rank === dragSelectedData.rank);
            this.rowData.findIndex(record => record.rank === dragUpdateDataRowNode.rank);
            this.rowData.sort((a, b) => a.rank - b.rank);
            // this.gridApi.setRowData(this.rowData);
            this.gridApi.setGridOption('rowData', this.rowData);
        }
        this.RowDragEndEvent.emit(e);
    }

    resetFilters() {
        if (this.gridApi) {
            this.resetCurrentPage();
            const { resetGrid, removeFromStorage = true } = this.searchService.resetFilter.getValue();
            // reset grid conditionally
            if (resetGrid) {
                this.gridApi.setFilterModel(null);
            }
            // reset filter from storage conditionally
            if (removeFromStorage) {
                this.searchService.saveFilterState({}, this.component);
                this.savePaginationState(20);
            }
            this.searchService.resetFilter.next({ resetGrid: false });
        }
    }

    saveFilterState(event: FilterChangedEvent) {
        if (this.component !== '' && event.afterDataChange === false) {
            const filterState = this.gridApi.getFilterModel();
            this.searchService.saveFilterState(filterState, this.component);
        }
    }

    savePaginationState(pagination: number) {
        const filterState: { [key: string]: any } = {};
        if (this.component !== '') {
            this.defaultPageOptions.pageSize = pagination;
            // this.gridApi.paginationSetPageSize(this.defaultPageOptions.pageSize);
            this.gridApi.setGridOption('paginationPageSize', this.defaultPageOptions.pageSize);
            filterState[this.component] = { pagination: pagination };
            this.searchService.savePaginationState(filterState, this.component + 'p');
        }
    }

    restoreFilterState() {
        if (this.component !== '' && this.gridApi) {
            const filterState = this.searchService.getFilterState(this.component);
            this.gridApi.setFilterModel(filterState);
            this.gridApi.onFilterChanged();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['visibleColumns']?.currentValue && changes['visibleColumns']?.previousValue) {
            this.visibleColumns = changes['visibleColumns']?.currentValue;
            this.setColumnVisibility();
        }
        if (changes['selectAllManually']?.currentValue) {
            this.gridApi.selectAllFiltered();
        }
        if (changes['rowData']?.currentValue?.length) {
            this.pageLength$.next(changes['rowData']?.currentValue.length);
            this.setColumnVisibility();
        }

        if (changes['component']) {
            this.searchService.currentComponentFilterKey$.next(this.component);
        }

        if (changes['columnDefs']?.currentValue?.length) {
            this.modifiedColumnDefs = this.columnDefs.map((columnDef, index) => {
                if (columnDef?.filter === 'agDateColumnFilter') {
                    columnDef.filterParams = {
                        inRangeInclusive: true,
                    };
                    columnDef.filterValueGetter = dateFilterValueGetter;
                }
                columnDef.colId = columnDef.field || index.toString();
                return columnDef;
            });
        }
    }

    changeFilter(event) {
        this.pageLength$.next(event.api.getDisplayedRowCount());
        if (event.api.getDisplayedRowCount() === 0) {
            this.gridApi.showNoRowsOverlay();
        } else {
            this.gridApi.hideOverlay();
        }
        if (this.currentPage$.value > 0) {
            this.gridApi.paginationGoToPage(this.currentPage$.value);
        }
    }

    onGridReady(params: GridReadyEvent<any>) {
        this.gridApi = params.api;
        this.gridColumnApi = params.api as unknown as Column;
        // this.gridApi.paginationSetPageSize(this.defaultPageOptions.pageSize)
        this.gridApi.setGridOption('paginationPageSize', this.defaultPageOptions.pageSize);

        if (this.searchService.resetFilter.getValue().resetGrid) {
            this.resetFilters();
        }

        const filterState = this.searchService.getFilterState('inventoryItemsList');
        if (filterState) {
            this.gridApi.setFilterModel(filterState);
            this.gridApi.onFilterChanged();
        }

        this.setColumnVisibility();
    }

    onCellClicked(params) {
        if (params?.data) {
            this.cellClicked.emit(params);
        }
    }

    onSelectionChanged(params) {
        this.rowSelectionChange.emit(params);
    }

    onColumnVisibleChange($event: ColumnVisibleEvent) {
        const { columns, visible } = $event;
        columns.forEach(result => {
            const colIndex = this.modifiedColumnDefs.findIndex(colObj => colObj.field === result.getColDef().field);
            if (colIndex > -1 && visible !== undefined) {
                this.modifiedColumnDefs[colIndex] = {
                    ...this.modifiedColumnDefs[colIndex],
                    hide: !visible,
                };
            }
        });
    }

    onClickRow(event) {
        this.defaultGridOptions = {
            ...this.defaultGridOptions,
            rowClassRules: {
                ...this.defaultGridOptions.rowClassRules,
                selectedRow: params => {
                    return true;
                },
            },
        };
    }

    /**
     *
     * @param options ag-grid options to
     * override along with
     * default column definition
     *
     * @todo Allow array values to be modified along with
     * keeping default value
     */
    updateGridOptions(options: AgGridOptions) {
        const { gridOptions = {}, defaultColDef = {} } = options;
        const updatedGridOptions = {};

        Object.keys(this.defaultGridOptions).forEach(gridOptionName => {
            if (
                typeof this.defaultGridOptions[gridOptionName] === 'object' &&
                gridOptionName !== 'defaultColDef' &&
                !Array.isArray(this.defaultGridOptions[gridOptionName])
            ) {
                updatedGridOptions[gridOptionName] = {
                    ...this.defaultGridOptions[gridOptionName],
                    ...gridOptions[gridOptionName],
                };
            } else {
                updatedGridOptions[gridOptionName] = gridOptions[gridOptionName]
                    ? gridOptions[gridOptionName]
                    : this.defaultGridOptions[gridOptionName];
            }
        });

        Object.keys(this.defaultGridOptions.defaultColDef).forEach(defaultColDefFieldName => {
            const defaultColDefFieldValue = this.defaultGridOptions.defaultColDef[defaultColDefFieldName];
            if (typeof defaultColDefFieldValue === 'object' && !Array.isArray(defaultColDefFieldValue)) {
                updatedGridOptions['defaultColDef'][defaultColDefFieldName] = {
                    ...this.defaultGridOptions.defaultColDef[defaultColDefFieldName],
                    ...defaultColDef[defaultColDefFieldName],
                };
            } else {
                updatedGridOptions['defaultColDef'][defaultColDefFieldName] = defaultColDef[defaultColDefFieldName]
                    ? defaultColDef[defaultColDefFieldName]
                    : updatedGridOptions['defaultColDef'][defaultColDefFieldName];
            }
        });
        this.defaultGridOptions = {
            ...updatedGridOptions,
        };
    }

    updateGridPageOptions() {
        this.defaultPageOptions = {
            ...this.paginatorOption,
        };
    }

    setColumnVisibility() {
        this.modifiedColumnDefs = this.columnDefs.map(result => {
            const isVisible = this.visibleColumns.includes(result.field);
            return {
                ...result,
                hide: !isVisible,
            };
        });
        const hasCheckedField = this.visibleColumns.includes('checkedField');
        if (this.gridApi) {
            const rowSelectionState = this.gridApi.getGridOption('rowSelection') as RowSelectionOptions;
            if (rowSelectionState) {
                this.gridApi.setGridOption('rowSelection', {
                    ...rowSelectionState,
                    checkboxes: hasCheckedField,
                    headerCheckbox: hasCheckedField,
                } as any);
            }

            const columnState = this.gridApi.getColumnState();
            const checkboxStateIndex = columnState.findIndex(state => state.colId === 'ag-Grid-SelectionColumn');
            if (checkboxStateIndex !== -1) {
                columnState[checkboxStateIndex].hide = !hasCheckedField;
                this.gridApi.applyColumnState({ state: columnState });
            }
        }
    }

    toggleAgColumn(column: string, colIndex: number, event: MouseEvent) {
        event.stopPropagation();
        if (column === 'checkedField') {
            const columnState = this.gridApi.getColumnState();
            const stateIndex = columnState.findIndex(state => state.colId === 'ag-Grid-SelectionColumn');
            if (stateIndex === -1) {
                const hasCheckedField = this.visibleColumns.includes('checkedField');
                const rowSelectionState = this.gridApi.getGridOption('rowSelection') as RowSelectionOptions;
                if (rowSelectionState) {
                    this.gridApi.setGridOption('rowSelection', {
                        ...rowSelectionState,
                        checkboxes: !hasCheckedField,
                        headerCheckbox: !hasCheckedField,
                    } as any);
                }
                return;
            }

            const isHidden = !columnState[stateIndex].hide;
            columnState[stateIndex].hide = isHidden;
            this.gridApi.applyColumnState({ state: columnState });
        } else {
            const targetColIndex = this.modifiedColumnDefs.findIndex(col => col.field === column);
            if (targetColIndex === -1) {
                return;
            }

            const isHidden = !this.modifiedColumnDefs[targetColIndex].hide;
            this.modifiedColumnDefs[targetColIndex] = {
                ...this.modifiedColumnDefs[targetColIndex],
                hide: isHidden,
            };

            const columnState = this.gridApi.getColumnState();
            const stateIndex = columnState.findIndex(state => state.colId === column);
            if (stateIndex === -1) {
                return;
            }

            columnState[stateIndex].hide = isHidden;
            this.gridApi.applyColumnState({ state: columnState });

            if (isHidden) {
                this.visibleColumns = this.visibleColumns.filter(col => col !== column);
            } else if (!this.visibleColumns.includes(column)) {
                this.visibleColumns.push(column);
            }
        }
    }

    isColumnVisible(column: string): boolean {
        if (column === 'checkedField') {
            if (this.gridApi) {
                const columnState = this.gridApi.getColumnState();
                const checkboxState = columnState.find(state => state.colId === 'ag-Grid-SelectionColumn');
                if (checkboxState) {
                    return !checkboxState.hide;
                }
                const rowSelection = this.gridApi.getGridOption('rowSelection') as RowSelectionOptions;
                if (rowSelection?.checkboxes && typeof rowSelection.checkboxes === 'boolean') {
                    return rowSelection.checkboxes;
                }
                return this.visibleColumns.includes('checkedField');
            }
            return this.visibleColumns.includes('checkedField');
        }
        const colDef = this.modifiedColumnDefs.find(col => col.field === column);
        return colDef ? !colDef.hide : this.visibleColumns.includes(column);
    }

    changePage(event) {
        // this.gridApi.paginationSetPageSize(event);
        this.gridApi.setGridOption('paginationPageSize', event);
        this.savePaginationState(event);
        this.defaultPageOptions['pageSize'] = event;
        this.resetCurrentPage();
        this.cd.detectChanges();
    }

    resetCurrentPage() {
        this.currentPage$.next(0);
    }

    onFilterChange(value?: string) {
        if (!this.rowData || !this.rowData.length) {
            return;
        }

        if (this.gridApi) {
            value = value?.trim();
            value = value?.toLowerCase();
            this.gridApi.setGridOption('quickFilterText', value === null ? '' : value);
            // this.gridApi.setGridOption('quickFilterText', value ?? '');
            this.cd.detectChanges();
            this.cd.markForCheck();
        }
    }

    navigationPage(event) {
        this.searchService.savePaginationState(event, this.component + 'pagination');
        this.currentPage$.next(event.pageIndex);
        if (event.pageIndex > event.previousPageIndex) {
            this.gridApi.paginationGoToNextPage();
        }
        if (event.pageIndex < event.previousPageIndex) {
            this.gridApi.paginationGoToPreviousPage();
        }
    }

    exportCsv() {
        this.gridApi.exportDataAsCsv();
    }

    ngOnDestroy(): void {
        this.searchService.resetFilter.next({ resetGrid: false });
    }
}
