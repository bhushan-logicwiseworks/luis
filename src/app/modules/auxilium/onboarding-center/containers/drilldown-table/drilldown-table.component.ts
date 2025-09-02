import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { Patient } from 'app/shared/interfaces/user/onboardingCenter.interface';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { switchMap } from 'rxjs/operators';
import { DrillDownTableActions } from '../../actions/drilldown-table.actions';
import { DrillDownTableSelectors } from '../../reducers';
import { SecondaryToolbarComponent } from '../../../../../shared/components/secondary-toolbar/secondary-toolbar.component';
import { MatIcon } from '@angular/material/icon';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { MatMenu, MatMenuContent, MatMenuItem } from '@angular/material/menu';
import { IconModule } from '@abhinavakhil/iconify-angular';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'ac-drilldown-table',
    templateUrl: './drilldown-table.component.html',
    styleUrls: ['./drilldown-table.component.scss'],
    providers: [DateTimeFormatPipe, DateFormatPipe],
    imports: [
        SecondaryToolbarComponent,
        MatIcon,
        ReactiveFormsModule,
        AuxAgGridComponent,
        LoadingOverlayComponent,
        MatMenu,
        MatMenuContent,
        MatMenuItem,
        IconModule,
        AsyncPipe,
    ],
})
export class DrillDownTableComponent implements OnInit {
    columnDefs: ColDef[] = [
        {
            headerName: 'ID',
            minWidth: 125,
            field: 'id',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 1,
            hide: false,
        },
        {
            headerName: 'Entry Date',
            minWidth: 150,
            field: 'entryDate',
            sort: 'desc',
            valueFormatter: (params: any) => this.dateFormatPipe.transform(params.data.entryDate),
            filter: 'agDateColumnFilter',
            sortIndex: 2,
            hide: false,
        },
        {
            headerName: 'Name',
            minWidth: 150,
            field: 'name',
            sort: 'desc',
            cellStyle: { 'font-weight': 700 },
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
        },
        {
            headerName: 'DOB',
            minWidth: 150,
            field: 'dob',
            valueFormatter: (params: any) => this.dateFormatPipe.transform(params.data.dob),
            sort: 'desc',
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            sortIndex: 4,
            hide: false,
        },
        {
            headerName: 'State',
            minWidth: 100,
            field: 'state',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 5,
            hide: false,
        },
        {
            headerName: 'Referral Name',
            minWidth: 100,
            field: 'referralName',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 6,
            hide: false,
        },
        {
            headerName: 'Ref State',
            minWidth: 100,
            field: 'refState',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 7,
            hide: false,
        },
        {
            headerName: 'Rep Name',
            minWidth: 100,
            field: 'repName',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
        },
        {
            headerName: 'Last Note',
            minWidth: 100,
            field: 'lastNoteDate',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
        },
        {
            headerName: 'Note Added By',
            minWidth: 100,
            field: 'noteAddedBy',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
            hide: false,
        },
        {
            headerName: 'Last Contact Note',
            minWidth: 100,
            field: 'lastContactNote',
            sort: 'desc',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
        },
    ];
    visibleColumns = [
        'id',
        'entryDate',
        'name',
        'dob',
        'state',
        'referralName',
        'refState',
        'repName',
        'lastNoteDate',
        'noteAddedBy',
        'lastContactNote',
    ];
    rowData = [];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => {
            return this.store.select(DrillDownTableSelectors.selectPatients);
        })
    );

    loading$ = this.store.select(DrillDownTableSelectors.selectLoading);
    patients: Patient[];
    pageSize = 20;
    pageSizeOptions: number[] = [5, 10, 20, 50];
    dataSource: MatTableDataSource<Patient> | null;
    searchCtrl = new UntypedFormControl();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    selectedRowIndex: number = -1;

    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private dateFormatPipe: DateFormatPipe,
        private searchService: AuxSearchService
    ) {}

    ngOnInit() {
        let id = this.route.snapshot.params.id;
        this.store.dispatch(DrillDownTableActions.LoadPatients({ filter: id }));
        this.data$.pipe(untilDestroyed(this)).subscribe(patients => {
            if (patients) {
                this.rowData = patients;
            }
        });

        this.searchCtrl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(value => this.searchService.search.next(value));
    }

    back() {
        window.history.back();
    }

    ngOnDestroy() {
        this.searchService.search.next(null);
    }
}
