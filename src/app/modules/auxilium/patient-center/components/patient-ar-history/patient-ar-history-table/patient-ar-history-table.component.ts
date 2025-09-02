import { AsyncPipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ColDef } from 'ag-grid-community';
import { filterParams } from 'app/shared/constants/aux-ag-grid.constants';
import { DateFormatPipe } from 'app/shared/pipes/auxilium/aux-dateformat.pipe';
import { DateTimeFormatPipe } from 'app/shared/pipes/auxilium/aux-datetimeformat.pipe';
import { Subject, combineLatest, startWith } from 'rxjs';
import { fuseAnimations } from '../../../../../../../@fuse/animations';
import { FuseHorizontalNavigationComponent } from '../../../../../../../@fuse/components/navigation/horizontal/horizontal.component';
import { FuseConfirmationService } from '../../../../../../../@fuse/services/confirmation';
import { ActionButtonRendererComponent } from '../../../../../../shared/components/action-button-renderer/action-button-renderer.component';
import { AuxAgGridComponent } from '../../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { LoadingOverlayComponent } from '../../../../../../shared/components/loading-overlay/loading-overlay.component';
import { PatientArHistory } from '../../../../../../shared/interfaces/auxilium/patient-center/patient-ar-history.interface';
import { PatientArHistoryActions } from '../../../actions/patient-ar-history.action';
import { PatientArHistorySelectors } from '../../../reducers';
import { TitleService } from '../../../services/title.service';

@UntilDestroy()
@Component({
    selector: 'app-patient-ar-history-table',
    templateUrl: './patient-ar-history-table.component.html',
    styleUrls: ['./patient-ar-history-table.component.scss'],
    providers: [DateFormatPipe, DecimalPipe],
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FuseHorizontalNavigationComponent,
        AuxAgGridComponent,
        LoadingOverlayComponent,
        AsyncPipe,
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatPrefix,
    ],
})
export class PatientArHistoryTableComponent implements OnInit {
    title: string;
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    arHistoryData$ = this.store.select(PatientArHistorySelectors.selectArHistory);
    loading$ = this.store.select(PatientArHistorySelectors.selectLoading);
    toolbarData: FuseNavigationItem[];
    options = {
        defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
        },
    };
    columnDefs: ColDef[] = [
        {
            headerName: 'SvcDate',
            minWidth: 125,
            sort: 'desc',
            field: 'svcdate',
            filter: 'agDateColumnFilter',
            sortIndex: 1,
            hide: false,
            filterParams: filterParams,
            valueFormatter: (params: any) => this.datePipe.transform(params.data.svcdate),
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'Created',
            minWidth: 125,
            field: 'createdate',
            filter: 'agDateColumnFilter',
            sortIndex: 2,
            hide: false,
            filterParams: filterParams,
            valueFormatter: (params: any) => this.datePipe.transform(params.data.createdate),
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'Item Code',
            minWidth: 115,
            field: 'itemcode',
            filter: 'agMultiColumnFilter',
            sortIndex: 3,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'Procedure',
            minWidth: 115,
            field: 'hcpcscode',
            filter: 'agMultiColumnFilter',
            sortIndex: 4,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'T',
            minWidth: 50,
            field: 'trantype',
            sortIndex: 5,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'P',
            minWidth: 50,
            field: 'printstatus',
            sortIndex: 6,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'C',
            minWidth: 50,
            field: 'collectionstatus',
            sortIndex: 7,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'Submitted',
            minWidth: 100,
            field: 'submitted',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
            valueFormatter: (params: any) => this.currency.transform(params.data.submitted, 'USD', 'symbol'),
        },
        {
            headerName: 'Tran Amt',
            minWidth: 100,
            field: 'tranamount',
            filter: 'agMultiColumnFilter',
            sortIndex: 8,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
            valueFormatter: (params: any) => this.currency.transform(params.data.tranamount, 'USD', 'symbol'),
        },
        {
            headerName: 'Paid',
            minWidth: 100,
            field: 'amountpaid',
            filter: 'agMultiColumnFilter',
            sortIndex: 9,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
            valueFormatter: (params: any) => this.currency.transform(params.data.amountpaid, 'USD', 'symbol'),
        },
        {
            headerName: 'Adj',
            minWidth: 100,
            field: 'amountadjusteD1',
            filter: 'agMultiColumnFilter',
            sortIndex: 10,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
            valueFormatter: (params: any) => this.currency.transform(params.data.amountadjusteD1, 'USD', 'symbol'),
        },
        {
            headerName: 'Balance',
            minWidth: 100,
            field: 'balance',
            filter: 'agMultiColumnFilter',
            sortIndex: 11,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
            valueFormatter: (params: any) => this.currency.transform(params.data.balance, 'USD', 'symbol'),
        },
        {
            headerName: 'Code',
            minWidth: 75,
            field: 'adjustmentcodE1',
            filter: 'agMultiColumnFilter',
            sortIndex: 12,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'Post Date',
            minWidth: 125,
            field: 'postdate',
            filter: 'agDateColumnFilter',
            sortIndex: 13,
            hide: false,
            filterParams: filterParams,
            valueFormatter: (params: any) => this.datePipe.transform(params.data.postdate),
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'Check #',
            minWidth: 150,
            field: 'checkno',
            filter: 'agMultiColumnFilter',
            sortIndex: 14,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'Bill To',
            minWidth: 100,
            field: 'billto',
            filter: 'agMultiColumnFilter',
            sortIndex: 15,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'B',
            minWidth: 50,
            field: 'billtype',
            sortIndex: 16,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'Code2',
            minWidth: 75,
            field: 'adjustmentcodE2',
            filter: 'agMultiColumnFilter',
            sortIndex: 17,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'Adj2',
            minWidth: 100,
            field: 'amountadjusteD2',
            filter: 'agMultiColumnFilter',
            sortIndex: 18,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
            valueFormatter: (params: any) => this.currency.transform(params.data.amountadjusteD2, 'USD', 'symbol'),
        },
        {
            headerName: 'Code3',
            minWidth: 75,
            field: 'adjustmentcodE3',
            filter: 'agMultiColumnFilter',
            sortIndex: 19,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
        },
        {
            headerName: 'Adj3',
            minWidth: 100,
            field: 'amountadjusteD3',
            filter: 'agMultiColumnFilter',
            sortIndex: 20,
            hide: false,
            onCellClicked: params => this.openArHistoryDetails(params),
            valueFormatter: (params: any) => this.currency.transform(params.data.amountadjusteD3, 'USD', 'symbol'),
        },
        {
            headerName: 'Actions',
            minWidth: 80,
            field: 'actions',
            cellRenderer: ActionButtonRendererComponent,
            cellRendererParams: {
                menuItems: [
                    {
                        name: 'Remove Record',
                        action: this.delete.bind(this),
                        icon: 'mat_outline:delete',
                        color: 'text-red-500',
                    },
                ],
            },
            sortIndex: 21,
            hide: false,
        },
    ];

    visibleColumns = [
        'svcdate',
        'createdate',
        'itemcode',
        'hcpcscode',
        'trantype',
        'printstatus',
        'collectionstatus',
        'tranamount',
        'amountpaid',
        'amountadjusteD1',
        'balance',
        'adjustmentcodE1',
        'postdate',
        'checkno',
        'billto',
        'billtype',
        'adjustmentcodE2',
        'amountadjusteD2',
        'adjustmentcodE3',
        'amountadjusteD3',
        'actions',
    ];
    rowData;
    patientId;

    arHistoryTotalObj = {
        submitted: 0,
        tranamount: 0,
        amountpaid: 0,
        adjustments: 0,
        balance: 0,
    };

    constructor(
        private store: Store,
        private currency: CurrencyPipe,
        private actions$: Actions,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private dateTime: DateTimeFormatPipe,
        private datePipe: DateFormatPipe,
        private cdr: ChangeDetectorRef,
        private titleService: TitleService,
        private decimalPipe: DecimalPipe,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        this.toolbarData = [
            {
                title: 'Refresh',
                type: 'basic',
                icon: 'mat_outline:refresh',
                function: () => {
                    this.refresh.next(null);
                },
            },
        ];
    }

    ngOnInit() {
        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        this.patientId = Number(this.router.url.split('/')[3]);
        combineLatest([this.activatedRoute.paramMap, this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.store.dispatch(PatientArHistoryActions.LoadArHistory({ patientId: this.patientId }));
            });

        this.arHistoryData$.pipe(untilDestroyed(this)).subscribe(access => {
            //console.log(access);
            this.rowData = access;
            if (this.rowData.length) {
                this.getCalculation();
            }
        });

        this.actions$.pipe(ofType(PatientArHistoryActions.Refresh), untilDestroyed(this)).subscribe(value => {
            //console.log('ComplianceActions.refresh triggered:', value);
            this.refresh.next(value);
        });
    }

    openArHistoryDetails(params) {
        const isOptionAvailable = this.toolbarData.findIndex(item => item.title === 'Edit');
        if (isOptionAvailable === -1) {
            this.toolbarData = [
                ...this.toolbarData,
                {
                    title: 'Edit',
                    type: 'basic',
                    icon: 'mat_outline:edit',
                    function: () => {
                        this.redirectToEdit(params);
                    },
                },
            ];
            this.cdr.detectChanges();
        }
    }

    updateToolBarData(isOptionAvailable) {
        this.toolbarData = [
            ...this.toolbarData.slice(0, isOptionAvailable),
            ...this.toolbarData.slice(isOptionAvailable + 1),
        ];
        //console.log(this.toolbarData);
    }

    redirectToEdit(params) {
        this.router.navigate([`/centers/patient-center/${this.patientId}/ar-history/add`, params.data.id]);
    }

    getCalculation() {
        this.resetCount();
        if (!this.rowData?.length) return;

        // First calculate regular totals using the for loop pattern
        for (const row of this.rowData) {
            Object.keys(this.arHistoryTotalObj).map(key => {
                if (key === 'adjustments') {
                    // Sum all adjustment fields for this row
                    this.arHistoryTotalObj[key] +=
                        (Number(row.amountadjusteD1) || 0) +
                        (Number(row.amountadjusteD2) || 0) +
                        (Number(row.amountadjusteD3) || 0);
                } else if (key === 'submitted') {
                    // Only include submitted amount when trantype is '1'
                    if (row.trantype === '1') {
                        this.arHistoryTotalObj[key] += Number(row[key]) || 0;
                    }
                } else {
                    // For other fields (amountpaid, balance, tranamount) use direct mapping
                    this.arHistoryTotalObj[key] += Number(row[key]) || 0;
                }
            });
        }

        // Transform the totals to decimal format
        this.arHistoryTotalObj = this.transformObjectToDecimal(this.arHistoryTotalObj);
        this.cdr.detectChanges();
    }

    transformObjectToDecimal(obj, decimalPattern: string = '1.2-2'): any {
        const transformedObj = {};

        for (const key in obj) {
            if (typeof obj[key] === 'number') {
                transformedObj[key] = this.decimalPipe.transform(obj[key], decimalPattern);
            } else {
                transformedObj[key] = obj[key];
            }
        }

        return transformedObj;
    }

    resetCount() {
        this.arHistoryTotalObj = {
            submitted: 0,
            adjustments: 0,
            tranamount: 0,
            amountpaid: 0,
            balance: 0,
        };
    }

    delete(delData: any) {
        this.deleteRecord(delData.data);
    }

    deleteRecord(dto: PatientArHistory): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'Remove Record',
            message: 'Are you sure you want to remove this record? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        confirmation
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                if (result === 'confirmed') {
                    this.store.dispatch(PatientArHistoryActions.DeleteArHistory({ arHistory: dto }));
                }
            });
    }
}
