import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AppConfig } from 'app/core/config/app.config';
import { ApexOptions } from 'app/shared/components/chart/chart.component';
import { lineChartOptions } from 'app/shared/constants/aux-line-chart-options.constant';
import { DateTime } from 'luxon';
import { DashboardDeatilsActions } from '../../actions/project-details.action';
import { DashboardSelectors } from '../../reducers';
import { NgClass } from '@angular/common';
import { AuxReorderValueComponent } from '../../component/aux-reorder-value/aux-reorder-value.component';
import { AuxLineChartComponent } from '../../component/aux-line-chart/aux-line-chart.component';

@UntilDestroy()
@Component({
    selector: 'app-daily',
    templateUrl: './daily.component.html',
    styleUrls: ['./daily.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        NgClass,
        AuxReorderValueComponent,
        AuxLineChartComponent,
    ],
})
export class DailyComponent implements OnInit {
    @Input() className: string;
    @Input() rowClassName: string;
    tooltipColor: string;
    // COUNTER 1-1
    totalOrdersMain: any;
    reorderAbbott = [
        { label: 'Abbott', source: 'ABBOTT', color: 'bg-orange-600', total: 0, percent: 0 },
        { label: 'Dexcom', source: 'DEXCOM', color: 'bg-purple-600', total: 0, percent: 0 },
    ];

    // COUNTER 1-2
    totalOrdersMain2: any;
    referralAbbot = [
        { label: 'Abbott', source: 'ABBOTT', color: 'bg-orange-600', total: 0, percent: 0 },
        { label: 'Dexcom', source: 'DEXCOM', color: 'bg-purple-600', total: 0, percent: 0 },
    ];

    // COUNTER 1-3
    tot_Ref_MenuVisits: any;

    // COUNTER 1-4
    newCGMPatientsShippedTodayChartOptions: ApexOptions = {
        ...lineChartOptions,
        colors: ['#ed8936'],
    };
    newCGMPatientsShippedTodayCount: number;
    newCGMPatientsShippedToday: ApexAxisChartSeries = [
        {
            name: 'New CGM Patients Shipped',
            data: [],
        },
    ];

    // COUNTER 1-5
    pendingCGMReferralsreconciledChartOptions: ApexOptions = {
        ...lineChartOptions,
        colors: ['#48bb78'],
    };
    pendingCGMReferralsreconciled: ApexAxisChartSeries = [
        {
            name: 'Pending CGM Referrals Reconciled',
            data: [],
        },
    ];
    pendingCGMReferralsreconciledCount: number;

    // COUNTER 1-6
    docmanagementChartOptions: ApexOptions = {
        ...lineChartOptions,
    };
    docmanagementToday: ApexAxisChartSeries = [
        {
            name: 'Doc Management Today',
            data: [],
        },
    ];
    docmanagementCount: string;

    //********************************************************************************************************************
    // STORE OPERATIONS
    //********************************************************************************************************************

    // COUNTER 1-1
    getReordersConfirmedTodayByManufacturer$ = this.store.select(
        DashboardSelectors.selectReordersConfirmedTodayByManufacturer
    );

    // COUNTER 1-2
    getReferarlsEnteredTodayByManufacturer$ = this.store.select(
        DashboardSelectors.selectReferarlsEnteredTodayByManufacturer
    );

    // COUNTER 1-3
    getDailyMenuVisits$ = this.store.select(DashboardSelectors.selectLoadDailyMenuVisits);

    // COUNTER 1-4
    getNewCGMReferralsShippedToday$ = this.store.select(DashboardSelectors.selectLoadNewCgmReferralsShippedToday);

    // COUNTER 1-5
    getPendingCGMPatientReferralsReconciled$ = this.store.select(
        DashboardSelectors.selectLoadPendingCgmReferralsReconciled
    );

    // COUNTER 1-6
    getDocManagementData$ = this.store.select(DashboardSelectors.selectDocManagementKpi);

    /**
     * Constructor
     */
    constructor(
        private store: Store,
        private cdr: ChangeDetectorRef,
        private _fuseConfigService: FuseConfigService
    ) {
        this._fuseConfigService.config$.pipe(untilDestroyed(this)).subscribe((config: AppConfig) => {
            if (config.scheme === 'dark') {
                this.tooltipColor = config.scheme;
            }
        });
    }

    ngOnInit() {
        this.getCounters();
        this.getReordersConfirmedTodayByManufacturer();
        this.getCGMReferralsEnteredTodayByManufacturer();
        this.getRSPUniqueMenuVisits();
        this.getDocManagementKpi();
    }

    // COUNTER 1-1
    getReordersConfirmedTodayByManufacturer() {
        this.getReordersConfirmedTodayByManufacturer$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadReordersConfirmedTodayByManufacturer());
            }
            data.map(element => {
                //console.log('element', element);
                if (element.source == 'ABBOTT') {
                    const getFindIndex = this.reorderAbbott.findIndex(item => item.source === element.source);
                    this.reorderAbbott[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderAbbott[getFindIndex].percent = element.percent?.toFixed(0);
                }
                if (element.source == 'DEXCOM') {
                    const getFindIndex = this.reorderAbbott.findIndex(item => item.source === element.source);
                    this.reorderAbbott[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderAbbott[getFindIndex].percent = element.percent?.toFixed(0);
                    this.totalOrdersMain = element.all?.toFixed(0);
                }
            });
        });
    }

    // COUNTER 1-2
    getCGMReferralsEnteredTodayByManufacturer() {
        this.getReferarlsEnteredTodayByManufacturer$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadReferarlsEnteredTodayByManufacturer());
            }
            data.map(element => {
                //console.log('element', element);
                if (element.source == 'ABBOTT') {
                    const getFindIndex = this.referralAbbot.findIndex(item => item.source === element.source);
                    this.referralAbbot[getFindIndex].total = element.total?.toFixed(0);
                    this.referralAbbot[getFindIndex].percent = element.percent?.toFixed(0);
                }
                if (element.source == 'DEXCOM') {
                    const getFindIndex = this.referralAbbot.findIndex(item => item.source === element.source);
                    this.referralAbbot[getFindIndex].total = element.total?.toFixed(0);
                    this.referralAbbot[getFindIndex].percent = element.percent?.toFixed(0);
                    this.totalOrdersMain2 = element.all?.toFixed(0);
                }
            });
        });
    }

    // COUNTER 1-3
    getRSPUniqueMenuVisits() {
        this.getDailyMenuVisits$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadDailyMenuVisits());
            }
            const res = data.reduce(
                (p, n) => ({
                    count: n.count,
                    percent: n.percent,
                }),
                {
                    x: [],
                    y: [],
                }
            );
            this.tot_Ref_MenuVisits = res.count?.toFixed(0);
        });
    }

    // COUNTER 1-4 & COUNTER 1-5
    getCounters() {
        // COUNTER 1-4
        this.getNewCGMReferralsShippedToday$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadNewCgmReferralsShippedToday());
            }
            const plotly = data.reduce(
                (p, n) => ({
                    x: [...p.x, n.day],
                    y: [...p.y, n.wklyCount],
                    res: n.wklyCount,
                }),
                {
                    x: [],
                    y: [],
                }
            );
            if (plotly.res?.length) {
                this.newCGMPatientsShippedTodayCount = plotly.res[plotly.res?.length - 1];
                this.newCGMPatientsShippedToday = [
                    {
                        ...this.newCGMPatientsShippedToday[0],
                        data: plotly.res,
                    },
                ];

                this.newCGMPatientsShippedTodayChartOptions = {
                    ...this.newCGMPatientsShippedTodayChartOptions,
                    labels: plotly.res.map(
                        (value, index, array) => DateTime.local().minus({ days: array.length - 1 - index }).weekdayShort
                    ),
                    chart: {
                        ...this.newCGMPatientsShippedTodayChartOptions.chart,
                        height: 200,
                    },
                    tooltip: {
                        theme: this.tooltipColor == 'dark' ? 'dark' : 'light',
                    },
                };
            }
        });
        // COUNTER 1-5
        this.getPendingCGMPatientReferralsReconciled$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadPendingCgmReferralsReconciled());
            }
            const plotly = data.reduce(
                (p, n) => ({
                    x: [...p.x, n.day],
                    y: [...p.y, n.wklyCount],
                    res: n.wklyCount,
                }),
                {
                    x: [],
                    y: [],
                }
            );
            if (plotly.res?.length) {
                this.pendingCGMReferralsreconciledCount = plotly.res[plotly.res?.length - 1];
                this.pendingCGMReferralsreconciled = [
                    {
                        ...this.pendingCGMReferralsreconciled[0],
                        data: plotly.res,
                    },
                ];
                this.pendingCGMReferralsreconciledChartOptions = {
                    ...this.pendingCGMReferralsreconciledChartOptions,
                    labels: plotly.res.map(
                        (value, index, array) => DateTime.local().minus({ days: array.length - 1 - index }).weekdayShort
                    ),
                    chart: {
                        ...this.pendingCGMReferralsreconciledChartOptions.chart,
                        height: 200,
                    },
                    tooltip: {
                        theme: this.tooltipColor == 'dark' ? 'dark' : 'light',
                    },
                };
            }
        });
    }

    // COUNTER 1-6
    getDocManagementKpi() {
        this.getDocManagementData$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadDocManagementKpi());
            }

            // console.log('data', data);

            const plotly = data.reduce(
                (p, n) => ({
                    x: [...p.x, n.day],
                    y: [...p.y, n.wklyCount],
                    res: n.wklyCount,
                }),
                {
                    x: [],
                    y: [],
                }
            );

            // console.log('plotly', plotly);

            if (plotly.res?.length) {
                this.docmanagementCount = data[0]?.pct + '%';
                this.docmanagementToday = [
                    {
                        ...this.docmanagementToday[0],
                        data: plotly.res,
                    },
                ];
                this.docmanagementChartOptions = {
                    ...this.docmanagementChartOptions,
                    labels: plotly.res.map(
                        (value, index, array) => DateTime.local().minus({ days: array.length - 1 - index }).weekdayShort
                    ),
                    chart: {
                        ...this.docmanagementChartOptions.chart,
                        height: 200,
                    },
                    tooltip: {
                        theme: this.tooltipColor == 'dark' ? 'dark' : 'light',
                    },
                };
                // this.cdr.reattach()
            }
        });
    }
}
