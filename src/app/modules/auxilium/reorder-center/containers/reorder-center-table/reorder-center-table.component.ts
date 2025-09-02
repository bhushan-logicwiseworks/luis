import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { AuxAgFullNameComponent } from 'app/shared/components/auxilium/aux-ag-full-name/aux-ag-full-name.component';
import { AuxAgIconsComponent } from 'app/shared/components/auxilium/aux-ag-icons/aux-ag-icons.component';
import { SourceChipComponent } from 'app/shared/components/auxilium/aux-source-chip/aux-source-chip.component';
import { ButtonWithIconsComponents } from 'app/shared/components/button-with-icons/button-with-icons.component';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { combineLatest, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { ReorderCenterTableActions } from '../../actions/reorder-center-table.actions';
import { ReorderCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'ac-reorder-center-table',
    templateUrl: './reorder-center-table.component.html',
    styleUrls: ['./reorder-center-table.component.scss'],
    providers: [DateFormatPipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AuxAgGridComponent, AsyncPipe],
})
export class ReorderCenterTableComponent implements OnInit, OnDestroy {
    columnDefs: ColDef[] = [
        {
            headerName: 'Patient ID',
            field: 'patientId',
            filter: 'agMultiColumnFilter',
            width: 100,
            cellRenderer: ButtonWithIconsComponents,
            cellRendererParams: { field: 'patientId' },
            onCellClicked: params => this.handleRedirect('patientid', { data: { patientid: params.data.patientId } }),
        },
        {
            headerName: 'Type',
            field: 'type',
            cellRenderer: SourceChipComponent,
            filter: 'agMultiColumnFilter',
            width: 100,
            filterParams: {
                filters: [
                    {
                        filter: 'agTextColumnFilter',
                    },
                    {
                        filter: 'agSetColumnFilter',
                        filterParams: {
                            cellRenderer: SourceChipComponent,
                        },
                    },
                ],
            },
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'Lang',
            field: 'language',
            cellRenderer: AuxAgIconsComponent,
            filter: 'agMultiColumnFilter',
            width: 70,
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'Source',
            field: 'upn',
            cellRenderer: SourceChipComponent,
            filter: 'agMultiColumnFilter',
            width: 100,
            filterParams: {
                filters: [
                    {
                        filter: 'agTextColumnFilter',
                    },
                    {
                        filter: 'agSetColumnFilter',
                        filterParams: {
                            cellRenderer: SourceChipComponent,
                        },
                    },
                ],
            },
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'Patient Name',
            field: 'fullName',
            filter: 'agMultiColumnFilter',
            cellRenderer: AuxAgFullNameComponent,
            width: 175,
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'Insurance',
            field: 'insurance',
            filter: 'agMultiColumnFilter',
            cellRenderer: params => {
                return `<div class="rounded px-2 font-medium text-xs flex-none bg-cyan-100 text-cyan-600 truncate leading-27">${params.data.insurance} </div>`;
            },
            width: 145,
            cellStyle: {
                display: 'flex',
                'line-height': '27px',
            },
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'Next DOS',
            field: 'lastDateBilled',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.lastDateBilled),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            width: 100,
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'CMN Expire',
            field: 'cmnExpire',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.cmnExpire),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            width: 100,
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'Auth Date',
            field: 'authDate',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.authDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            width: 100,
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'Exp Notes',
            field: 'notesExpireDate',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.notesExpireDate),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            width: 100,
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'State',
            field: 'state',
            filter: 'agMultiColumnFilter',
            width: 75,
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'Physician',
            field: 'physician',
            filter: 'agMultiColumnFilter',
            width: 200,
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'Category',
            field: 'patientCategory',
            filter: 'agMultiColumnFilter',
            width: 115,
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'Visited',
            field: 'discharge',
            valueFormatter: params => this.dateFormatePipe.transform(params.data.discharge),
            filter: 'agDateColumnFilter',
            filterParams: filterParams,
            width: 100,
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'SalesRep',
            field: 'salesRep',
            filter: 'agMultiColumnFilter',
            width: 175,
            onCellClicked: params => this.rowSelection(params),
        },
        {
            headerName: 'Referal Method',
            field: 'referralMethod',
            filter: 'agMultiColumnFilter',
            width: 175,
            onCellClicked: params => this.rowSelection(params),
        },
    ];

    rowData = [];

    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(ReorderCenterTableSelectors.selectReorders))
    );

    loading$ = this.store.select(ReorderCenterTableSelectors.selectLoading);

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private dateFormatePipe: DateFormatPipe,
        private searchService: AuxSearchService,
        private auxUtilService: AuxUtilService
    ) {}

    defaultVisibleColumn = [
        'language',
        'upn',
        'patientId',
        'fullName',
        'insurance',
        'lastDateBilled',
        'cmnExpire',
        'authDate',
        'notesExpireDate',
        'state',
        'patientCategory',
        'discharge',
        'actions',
    ];
    visibleColumns = [];
    ngOnInit() {
        combineLatest([this.route.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                switch (filterSlug) {
                    case 'current':
                        this.visibleColumns = this.defaultVisibleColumn;
                        this.store.dispatch(ReorderCenterTableActions.LoadReorder({ filter: 'getcurrent' }));
                        break;

                    case 'pastdue':
                        this.visibleColumns = this.defaultVisibleColumn;
                        this.store.dispatch(ReorderCenterTableActions.LoadReorder({ filter: 'getpastdue' }));
                        break;

                    case 'expired':
                        this.visibleColumns = this.defaultVisibleColumn;
                        this.store.dispatch(ReorderCenterTableActions.LoadReorder({ filter: 'getexpired' }));
                        break;

                    case 'expirednotes':
                        this.visibleColumns = [
                            'language',
                            'upn',
                            'patientId',
                            'fullName',
                            'insurance',
                            'lastDateBilled',
                            'cmnExpire',
                            'authDate',
                            'notesExpireDate',
                            'state',
                            'physician',
                            'patientCategory',
                            'discharge',
                            'actions',
                        ];
                        this.store.dispatch(ReorderCenterTableActions.LoadReorder({ filter: 'getexpirednotes' }));
                        break;

                    case 'expiredpa':
                        this.visibleColumns = [
                            'language',
                            'upn',
                            'patientId',
                            'fullName',
                            'insurance',
                            'lastDateBilled',
                            'cmnExpire',
                            'authDate',
                            'notesExpireDate',
                            'state',
                            'physician',
                            'patientCategory',
                            'discharge',
                            'actions',
                        ];
                        this.store.dispatch(ReorderCenterTableActions.LoadReorder({ filter: 'getexpiredpa' }));
                        break;

                    case 'expiredswo':
                        this.visibleColumns = [
                            'language',
                            'upn',
                            'patientId',
                            'fullName',
                            'insurance',
                            'lastDateBilled',
                            'cmnExpire',
                            'authDate',
                            'notesExpireDate',
                            'state',
                            'physician',
                            'patientCategory',
                            'discharge',
                            'actions',
                        ];
                        this.store.dispatch(ReorderCenterTableActions.LoadReorder({ filter: 'getexpiredswo' }));
                        break;

                    case 'expiredpumps':
                        this.visibleColumns = this.defaultVisibleColumn;
                        this.store.dispatch(ReorderCenterTableActions.LoadReorder({ filter: 'getexpiredpumps' }));
                        break;
                }
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(reorderlist => {
            this.rowData = reorderlist;
        });
    }

    ngOnDestroy() {
        this.store.dispatch(ReorderCenterTableActions.resetState());
    }

    startWizard(row) {
        this.router.navigateByUrl(`/centers/reorder-center/reorder/${row.patientId}`);
    }

    getIcon(language: string) {
        if (language == 'ENGLISH') {
            return 'US';
        } else if (language == 'SPANISH') {
            return 'ES';
        } else {
            return '';
        }
    }

    task(task) {}

    rowSelection(event) {
        this.startWizard(event.api.getSelectedRows()[0]);
    }

    handleRedirect(field: string, params) {
        this.auxUtilService.redirectToNewTab(field, params);
    }
}
