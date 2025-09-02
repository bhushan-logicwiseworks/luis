import { ColDef, GridOptions, IDateFilterParams, ValueGetterFunc } from 'ag-grid-community';

export const DefaultColumnDefinition: ColDef = {
    flex: 0,
    sortable: true,
    wrapHeaderText: false,
    wrapText: false,
    resizable: true,
    enablePivot: true,
    enableValue: true,
    autoHeight: true,
    floatingFilter: true,
    filter: true,
};

export const DefaulPageOptions = {
    pageSize: 20,
    pageSizeOptions: [5, 10, 20, 50],
};

export const DefaultGridOptions: GridOptions = {
    columnMenu: 'legacy',
    suppressPaginationPanel: true,
    pagination: true,
    paginationPageSize: 20,
    defaultColDef: DefaultColumnDefinition,
    headerHeight: 36,
    rowDragManaged: false,
    rowDragEntireRow: false,
    rowDragMultiRow: false,
    rowHeight: 40,
    rowClassRules: {
        'grid-row-odd': params => params.rowIndex % 2 === 0,
        'grid-row-even': params => params.rowIndex % 2 !== 0,
    },
    rowSelection: {
        mode: 'singleRow',
        enableClickSelection: true,
        checkboxes: false,
    },
    animateRows: false,
    getRowClass: params => {
        return '';
    },
};

export const filterParams: IDateFilterParams = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
        const dateAsString = cellValue;
        if (dateAsString == null) return -1;
        const cellDate = new Date(cellValue);
        const formateDate = `${new Intl.DateTimeFormat('en', { month: '2-digit' }).format(cellDate)}-${new Intl.DateTimeFormat('en', { day: '2-digit' }).format(cellDate)}-${cellDate.getFullYear()}`;
        const filterLocalDate = new Date(filterLocalDateAtMidnight);
        const filterSelectedDate = `${new Intl.DateTimeFormat('en', { month: '2-digit' }).format(filterLocalDate)}-${new Intl.DateTimeFormat('en', { day: '2-digit' }).format(filterLocalDate)}-${filterLocalDate.getFullYear()}`;
        if (filterSelectedDate === formateDate) {
            return 0;
        } else {
            return -1;
        }
    },
};

export const dateFilterValueGetter: ValueGetterFunc = valueGetterParams => {
    const dateAtMidnight = new Date(valueGetterParams.data[valueGetterParams.colDef.field]).setHours(0, 0, 0, 0);
    return new Date(dateAtMidnight);
};
