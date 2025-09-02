import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { filter } from 'rxjs/operators';
import * as fromAnalyticsActions from '../../actions/analytics-data.actions';
import { AnalyticsSelectors } from '../../reducers';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'ac-analytics-table',
    templateUrl: './analytics-table.component.html',
    styleUrls: ['./analytics-table.component.scss'],
    providers: [DateTimeFormatPipe],
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class AnalyticsTableComponent implements OnInit, AfterViewInit {
    analytics$ = this.store.select(AnalyticsSelectors.selectAll);
    loaded$ = this.store.select(AnalyticsSelectors.selectLoaded);
    displayedColumns: string[];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
    visibleColumns = ['name', 'CGM', 'ENTERAL', 'INCONTINENCE', 'OSTOMY', 'UROLOGY', 'TOTALS'];
    rowData = [];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };

    columnDefs = [
        {
            headerName: 'GROUP',
            field: 'name',
            hide: false,
            minWidth: 350,
            sort: 'asc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
        },
        { headerName: 'CGM', field: 'CGM', hide: false, minWidth: 150, filter: 'agMultiColumnFilter', sortIndex: 2 },
        {
            headerName: 'ENTERAL',
            field: 'ENTERAL',
            hide: false,
            minWidth: 150,
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
        },
        {
            headerName: 'INCONTINENCE',
            field: 'INCONTINENCE',
            hide: false,
            minWidth: 175,
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
        },
        {
            headerName: 'OSTOMY',
            field: 'OSTOMY',
            hide: false,
            minWidth: 125,
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
        },
        {
            headerName: 'UROLOGY',
            field: 'UROLOGY',
            hide: false,
            minWidth: 125,
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
        },
        {
            headerName: 'TOTALS',
            field: 'TOTALS',
            hide: false,
            minWidth: 125,
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
        },
    ];

    constructor(
        private store: Store,
        private dateTimeFormatPipe: DateTimeFormatPipe
    ) {}

    ngOnInit(): void {
        this.store.dispatch(fromAnalyticsActions.loadAnalyticsDatas());
        this.analytics$.pipe(filter(e => !!e && e?.length > 0)).subscribe(e => {
            this.displayedColumns = Object.keys(e[0])
                .filter(x => !['id'].includes(x))
                .concat('TOTALS');
            this.dataSource.data = e.map(row => ({
                ...row,
                TOTALS: Object.entries(row)
                    .filter(([k, v]) => !isNaN(v))
                    .reduce((a, [k, v]) => {
                        a += v;
                        return a;
                    }, 0),
            }));
            //   this.loaded$ = this.store.select(AnalyticsSelectors.selectLoaded);
            this.loaded$.subscribe(response => {
                // console.log(response, "response");
                // console.log(this.dataSource.data, "this.dataSource.data")
            });
        });
    }

    ngAfterViewInit(): void {}
}
