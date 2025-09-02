import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AppConfig } from 'app/core/config/app.config';
import { ApexOptions } from 'app/shared/components/chart/chart.component';
import { generateChartOptions } from 'app/shared/constants/aux-bar-chart-options.constant';
import { gaugeChartOptions } from 'app/shared/constants/aux-gauge-chart-options.constant';
import { DashboardDeatilsActions } from '../../actions/project-details.action';
import { DashboardSelectors } from '../../reducers';
import { NgClass } from '@angular/common';
import { AuxReorderValueComponent } from '../../component/aux-reorder-value/aux-reorder-value.component';
import { AuxBreakdownComponent } from '../../component/aux-breakdown/aux-breakdown.component';

@UntilDestroy()
@Component({
    selector: 'app-monthly',
    templateUrl: './monthly.component.html',
    styleUrls: ['./monthly.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        NgClass,
        AuxReorderValueComponent,
        AuxBreakdownComponent,
    ],
})
export class MonthlyComponent implements OnInit {
    PercentageColor = '#000000';
    @Input() className: string;
    @Input() rowClassName: string;

    // SHARED
    totalReordersGaugeOptions: ApexOptions = {
        ...gaugeChartOptions,
        chart: {
            ...gaugeChartOptions.chart,
            height: 150,
        },
    };

    orderMonthlyChartOptions: ApexOptions = {
        ...gaugeChartOptions,
        chart: {
            ...gaugeChartOptions.chart,
            height: 150,
        },
    };

    // COUNTER 2-1
    total_Reorders_This_Month: any;

    // COUNTER 2-2a NEW
    reorderMonthlyBreakdown = [
        {
            label: 'Email',
            source: 'EMAIL',
            color: 'bg-yellow-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'Text',
            source: 'TEXT',
            color: 'bg-blue-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'Fast',
            source: 'FAST',
            color: 'bg-green-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'Other',
            source: 'OTHER',
            color: 'bg-gray-600',
            total: 0,
            percent: 0,
        },
    ];

    // COUNTER 2-2b NEW
    reorderMonthlyCategory = [
        {
            label: 'CGM',
            source: 'CGM',
            color: 'bg-yellow-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'ENTERAL',
            source: 'ENTERAL',
            color: 'bg-blue-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'INCONTINENCE',
            source: 'INCONTINENCE',
            color: 'bg-green-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'OTHER',
            source: 'OTHER',
            color: 'bg-gray-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'UROLOGY',
            source: 'UROLOGY',
            color: 'bg-red-600',
            total: 0,
            percent: 0,
        },
    ];

    // COUNTER 2-1 *** THIS IS GOING AWAY
    reorderMonthly = [
        {
            label: 'Email',
            source: 'EMAIL',
            color: 'bg-yellow-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'Text',
            source: 'TEXT',
            color: 'bg-blue-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'Fast',
            source: 'FAST',
            color: 'bg-green-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'Other',
            source: 'OTHER',
            color: 'bg-gray-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'Touchless',
            source: 'TOUCHLESS',
            color: 'bg-orange-600',
            total: 0,
            percent: 0,
        },
    ];

    // COUNTER 2-2 new
    orderMonthly = [
        {
            label: '90-day Abbott',
            source: '90DAYABBOTT',
            color: 'bg-yellow-600',
            total: 0,
            percent: 0,
        },
        {
            label: '90-day Dexcom',
            source: '90DAYDEXCOM',
            color: 'bg-blue-600',
            total: 0,
            percent: 0,
        },
        {
            label: '30-day Abbott',
            source: '30DAYABBOTT',
            color: 'bg-green-600',
            total: 0,
            percent: 0,
        },
        {
            label: '30-day Dexcom',
            source: '30DAYDEXCOM',
            color: 'bg-gray-600',
            total: 0,
            percent: 0,
        },
    ];

    globalPercent: number;
    globalTotal: any;
    grandPercent: number;
    grandTotal: number;
    grandTotalAll: number;

    // COUNTER 2-2
    invitatonMonthly = [
        {
            label: 'Completions',
            source: 'COMPLETIONS',
            color: 'bg-orange-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'Attempts',
            source: 'ATTEMPTS',
            color: 'bg-purple-600',
            total: 0,
            percent: 0,
        },
    ];
    invitationsTotal: number;

    // COUNTER 2-3
    billingPerformanceGaugeOptions: ApexOptions = {
        ...gaugeChartOptions,
        chart: {
            ...gaugeChartOptions.chart,
            height: 150,
            offsetY: -8,
        },
        fill: {
            colors: ['#38b2ac'],
        },
    };
    billingPerformancePercent: number;
    billingPerformanceCount: any;

    // COUNTER 2-4
    totalOrdersMain3: any;
    abbotDataManuff = [
        {
            label: 'Abbott',
            source: 'ABBOTT',
            color: 'bg-orange-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'Dexcom',
            source: 'DEXCOM',
            color: 'bg-purple-600',
            total: 0,
            percent: 0,
        },
    ];

    // COUNTER 2-5
    totalOrdersMain4: any;
    abbotDataShipped = [
        {
            label: 'Abbott',
            source: 'ABBOTT',
            color: 'bg-orange-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'Dexcom',
            source: 'DEXCOM',
            color: 'bg-purple-600',
            total: 0,
            percent: 0,
        },
    ];

    // COUNTER 2-6
    tot_Ref_MenuVisitsPerMonth: any;

    // COUNTER 2-7
    hollysmokesPercentMain: any;
    trainedData = [
        {
            label: 'Invitations',
            source: 'INVITATIONS',
            color: 'bg-orange-600',
            total: 0,
            percent: 0,
        },
        {
            label: 'Completions',
            source: 'COMPLETIONS',
            color: 'bg-purple-600',
            total: 0,
            percent: 0,
        },
    ];

    newCGMPatientLongevityThisMonthChartOptions: ApexOptions = {
        ...generateChartOptions,
    };

    activePatientLongevityThisMonthChartOptions: ApexOptions = {
        ...generateChartOptions,
    };

    newCGMPatientLongevityThisMonthCount: number;
    newCGMPatientLongevityThisMonth: ApexAxisChartSeries = [
        {
            name: 'Average CGM Patient Service Longevity',
            data: [],
        },
    ];

    activePatientLongevityThisMonthCount: number;
    activePatientLongevityThisMonth: ApexAxisChartSeries = [
        {
            name: 'CURRENT ACTIVE PATIENT LONGEVITY',
            data: [],
        },
    ];

    //********************************************************************************************************************
    // STORE OPERATIONS
    //********************************************************************************************************************

    // COUNTER 2-1
    getTotalOrdersProcessedThisMonth$ = this.store.select(DashboardSelectors.selectTotalOrdersProcessedThisMonth);

    // COUNTER 2-1 *** THIS IS GOING AWAY
    getReordersThisMonth$ = this.store.select(DashboardSelectors.selectReordersThisMonth);

    // COUNTER 2-2
    getReorderInvitationsThisMonth$ = this.store.select(DashboardSelectors.selectInvitationsThisMonth);

    // COUNTER 2-2 new
    getOrderThisMonth$ = this.store.select(DashboardSelectors.selectCgmOrdersProcessedThisMonth);

    // COUNTER 2-2a NEW
    getReordersThisMonthBreakdown$ = this.store.select(DashboardSelectors.selectReordersThisMonthBreakdown);

    // COUNTER 2-2a NEW
    getReordersThisMonthCategory$ = this.store.select(DashboardSelectors.selectReordersThisMonthCategory);

    // COUNTER 2-3
    getBillingPerformance$ = this.store.select(DashboardSelectors.selectBillingPerformance);

    // COUNTER 2-4
    getReferarlsEnteredThisMondyByManufacturer$ = this.store.select(
        DashboardSelectors.selectReferarlsEnteredThisMondyByManufacturer
    );

    // COUNTER 2-5
    getReferarlsShippedThisMondyByManufacturer$ = this.store.select(
        DashboardSelectors.selectReferarlsShippedThisMondyByManufacturer
    );

    // COUNTER 2-6
    getRSPMonthlyMenuVisits$ = this.store.select(DashboardSelectors.selectMonthlyMenuVisits);

    // COUNTER 2-7
    getHollySmokesThisMonth$ = this.store.select(DashboardSelectors.selectHollySmokesThisMonth);

    getCgmPatientLongevityThisMonth$ = this.store.select(DashboardSelectors.selectCgmPatientLongevityThisMonth);

    getActivePatientLongevityThisMonth$ = this.store.select(DashboardSelectors.selectActivePatientLongevityThisMonth);

    /**
     * Constructor
     */
    constructor(
        private store: Store,
        private cdr: ChangeDetectorRef,
        private _fuseConfigService: FuseConfigService
    ) {}

    ngOnInit() {
        this.getTotalOrdersProcessedThisMonth();
        this.getReordersThisMonthBreakdown();
        this.getReordersThisMonthCategory();
        this.getReordersThisMonth();
        this.getReorderInvitationsThisMonth();
        this.getBillingPerformance();
        this.getCGMReferralsEnteredThisMonthByManufacturer();
        this.getNewCGMReferralsShippedThisMonthByManufacturer();
        this.getRSPMonthlyMenuVisits();
        this.getHollySmokesThisMonth();
        this.getCgmOrdersProcessedThisMonth();
        this.updateGaugeOptions();
    }

    // COUNTER 2-1
    getTotalOrdersProcessedThisMonth() {
        this.getTotalOrdersProcessedThisMonth$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadTotalOrdersProcessedThisMonth());
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
            this.total_Reorders_This_Month = res.count?.toFixed(0);
        });
    }

    // COUNTER 2-2a NEW
    getReordersThisMonthBreakdown() {
        this.getReordersThisMonthBreakdown$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadReordersThisMonthBreakdown());
            }
            data.map(element => {
                if (element.source == 'EMAIL') {
                    const getFindIndex = this.reorderMonthlyBreakdown.findIndex(item => item.source === element.source);
                    this.reorderMonthlyBreakdown[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthlyBreakdown[getFindIndex].percent = element.percent;
                }
                if (element.source == 'TEXT') {
                    const getFindIndex = this.reorderMonthlyBreakdown.findIndex(item => item.source === element.source);
                    this.reorderMonthlyBreakdown[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthlyBreakdown[getFindIndex].percent = element.percent;
                }
                if (element.source == 'FAST') {
                    const getFindIndex = this.reorderMonthlyBreakdown.findIndex(item => item.source === element.source);
                    this.reorderMonthlyBreakdown[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthlyBreakdown[getFindIndex].percent = element.percent;
                }
                if (element.source == 'OTHER') {
                    const getFindIndex = this.reorderMonthlyBreakdown.findIndex(item => item.source === element.source);
                    this.reorderMonthlyBreakdown[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthlyBreakdown[getFindIndex].percent = element.percent;
                }
            });
        });
    }

    // COUNTER 2-2b NEW
    getReordersThisMonthCategory() {
        this.getReordersThisMonthCategory$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadReordersThisMonthCategory());
            }
            data.map(element => {
                if (element.source == 'CGM') {
                    const getFindIndex = this.reorderMonthlyCategory.findIndex(item => item.source === element.source);
                    this.reorderMonthlyCategory[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthlyCategory[getFindIndex].percent = element.percent;
                }
                if (element.source == 'ENTERAL') {
                    const getFindIndex = this.reorderMonthlyCategory.findIndex(item => item.source === element.source);
                    this.reorderMonthlyCategory[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthlyCategory[getFindIndex].percent = element.percent;
                }
                if (element.source == 'INCONTINENCE') {
                    const getFindIndex = this.reorderMonthlyCategory.findIndex(item => item.source === element.source);
                    this.reorderMonthlyCategory[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthlyCategory[getFindIndex].percent = element.percent;
                }
                if (element.source == 'OTHER') {
                    const getFindIndex = this.reorderMonthlyCategory.findIndex(item => item.source === element.source);
                    this.reorderMonthlyCategory[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthlyCategory[getFindIndex].percent = element.percent;
                }
                if (element.source == 'UROLOGY') {
                    const getFindIndex = this.reorderMonthlyCategory.findIndex(item => item.source === element.source);
                    this.reorderMonthlyCategory[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthlyCategory[getFindIndex].percent = element.percent;
                }
            });
        });
    }

    // COUNTER 2-1 *** THIS IS GOING AWAY
    getReordersThisMonth() {
        this.getReordersThisMonth$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadReordersThisMonth());
            }
            data.map(element => {
                if (element.source == 'EMAIL') {
                    const getFindIndex = this.reorderMonthly.findIndex(item => item.source === element.source);
                    this.reorderMonthly[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthly[getFindIndex].percent = element.percent;
                }
                if (element.source == 'TEXT') {
                    const getFindIndex = this.reorderMonthly.findIndex(item => item.source === element.source);
                    this.reorderMonthly[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthly[getFindIndex].percent = element.percent;
                }
                if (element.source == 'FAST') {
                    const getFindIndex = this.reorderMonthly.findIndex(item => item.source === element.source);
                    this.reorderMonthly[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthly[getFindIndex].percent = element.percent;
                }
                if (element.source == 'OTHER') {
                    const getFindIndex = this.reorderMonthly.findIndex(item => item.source === element.source);
                    this.reorderMonthly[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthly[getFindIndex].percent = element.percent;
                }
                if (element.source == 'TOUCHLESS') {
                    const getFindIndex = this.reorderMonthly.findIndex(item => item.source === element.source);
                    this.reorderMonthly[getFindIndex].total = element.total?.toFixed(0);
                    this.reorderMonthly[getFindIndex].percent = element.percent;
                }
                if (element.source == 'GLOBAL') {
                    this.globalTotal = element.total?.toFixed(0);
                    this.globalPercent = element.percent?.toFixed(0);
                }
            });
        });
    }

    // COUNTER 2-2 NEW
    getCgmOrdersProcessedThisMonth() {
        this.getOrderThisMonth$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadCgmOrdersProcessedThisMonth());
            }
            data.forEach(element => {
                const source = element.source;
                const getFindIndex = this.orderMonthly.findIndex(item => item.source === source);
                if (getFindIndex !== -1) {
                    this.orderMonthly[getFindIndex].total = element.total.toFixed(0);
                    this.orderMonthly[getFindIndex].percent = element.percent.toFixed(2);
                } else if (source === 'GRANDTOTAL') {
                    this.grandTotal = element.total?.toFixed(0);
                    this.grandPercent = element.percent?.toFixed(2);
                    this.grandTotalAll = element.all.toFixed(0);
                } else {
                    // console.error(
                    //     `No matching item found in orderMonthly for source: ${source}`
                    // );
                }
            });
        });
    }

    // COUNTER 2-2
    getReorderInvitationsThisMonth() {
        this.getReorderInvitationsThisMonth$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadInvitationsThisMonth());
            }
            data.map(element => {
                if (element.source == 'INVITATIONS') {
                    this.invitationsTotal = element.total?.toFixed(0);
                }
                if (element.source == 'COMPLETIONS') {
                    const getFindIndex = this.invitatonMonthly.findIndex(item => item.source === element.source);
                    this.invitatonMonthly[getFindIndex].total = element.total?.toFixed(0);
                    this.invitatonMonthly[getFindIndex].percent = element.percent?.toFixed(0);
                }
                if (element.source == 'ATTEMPTS') {
                    const getFindIndex = this.invitatonMonthly.findIndex(item => item.source === element.source);
                    this.invitatonMonthly[getFindIndex].total = element.total?.toFixed(0);
                    this.invitatonMonthly[getFindIndex].percent = element.percent?.toFixed(0);
                }
            });
        });
    }

    // COUNTER 2-3
    getBillingPerformance() {
        this.getBillingPerformance$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadBillingPerformance());
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
            this.billingPerformanceCount = res.count?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            });
            this.billingPerformancePercent = res.percent;
        });
    }

    // COUNTER 2-4
    getCGMReferralsEnteredThisMonthByManufacturer() {
        this.getReferarlsEnteredThisMondyByManufacturer$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadReferarlsEnteredThisMondyByManufacturer());
            }
            data.map(element => {
                if (element.source == 'ABBOTT') {
                    const getFindIndex = this.abbotDataManuff.findIndex(item => item.source === element.source);
                    this.abbotDataManuff[getFindIndex].total = element.total?.toFixed(0);
                    this.abbotDataManuff[getFindIndex].percent = element.percent?.toFixed(0);
                }
                if (element.source == 'DEXCOM') {
                    const getFindIndex = this.abbotDataManuff.findIndex(item => item.source === element.source);
                    this.abbotDataManuff[getFindIndex].total = element.total?.toFixed(0);
                    this.abbotDataManuff[getFindIndex].percent = element.percent?.toFixed(0);
                    this.totalOrdersMain3 = element.all?.toFixed(0);
                }
            });
        });
    }

    // COUNTER 2-5
    getNewCGMReferralsShippedThisMonthByManufacturer() {
        this.getReferarlsShippedThisMondyByManufacturer$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadReferarlsShippedThisMondyByManufacturer());
            }
            data.map(element => {
                if (element.source == 'ABBOTT') {
                    const getFindIndex = this.abbotDataShipped.findIndex(item => item.source === element.source);
                    this.abbotDataShipped[getFindIndex].total = element.total?.toFixed(0);
                    this.abbotDataShipped[getFindIndex].percent = element.percent?.toFixed(0);
                }
                if (element.source == 'DEXCOM') {
                    const getFindIndex = this.abbotDataShipped.findIndex(item => item.source === element.source);
                    this.abbotDataShipped[getFindIndex].total = element.total?.toFixed(0);
                    this.abbotDataShipped[getFindIndex].percent = element.percent?.toFixed(0);
                    this.totalOrdersMain4 = element.all?.toFixed(0);
                }
            });
        });
    }

    // COUNTER 2-6
    getRSPMonthlyMenuVisits() {
        this.getRSPMonthlyMenuVisits$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadMonthlyMenuVisits());
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
            this.tot_Ref_MenuVisitsPerMonth = res.count?.toFixed(0);
        });
    }

    // COUNTER 2-7
    getHollySmokesThisMonth() {
        this.getHollySmokesThisMonth$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadHollySmokesThisMonth());
            }
            data.map(element => {
                if (element.source == 'INVITATIONS') {
                    const getFindIndex = this.trainedData.findIndex(item => item.source === element.source);
                    this.trainedData[getFindIndex].total = element.total?.toFixed(0);
                    this.trainedData[getFindIndex].percent = element.percent?.toFixed(0);
                }
                if (element.source == 'COMPLETIONS') {
                    const getFindIndex = this.trainedData.findIndex(item => item.source === element.source);
                    this.trainedData[getFindIndex].total = element.total?.toFixed(0);
                    this.trainedData[getFindIndex].percent = element.percent?.toFixed(0);
                    this.hollysmokesPercentMain = element.percent?.toFixed(0) + '%';
                }
            });
        });
    }

    updateGaugeOptions(): void {
        let PercentageColor = '#000000';
        this._fuseConfigService.config$.pipe(untilDestroyed(this)).subscribe((config: AppConfig) => {
            if (config.scheme === 'dark') {
                PercentageColor = '#FFFFFF';
            }
        });
        this.orderMonthlyChartOptions = {
            ...gaugeChartOptions,
            chart: {
                ...gaugeChartOptions.chart,
                height: 150,
                offsetY: -8,
            },
            plotOptions: {
                ...gaugeChartOptions.plotOptions,
                radialBar: {
                    ...gaugeChartOptions.plotOptions.radialBar,
                    dataLabels: {
                        ...gaugeChartOptions.plotOptions.radialBar.dataLabels,
                        value: {
                            ...gaugeChartOptions.plotOptions.radialBar.dataLabels.value,
                            fontSize: '1.2rem',
                            color: PercentageColor,
                        },
                    },
                },
            },
        };

        this.billingPerformanceGaugeOptions = {
            ...gaugeChartOptions,
            chart: {
                ...gaugeChartOptions.chart,
                height: 150,
                offsetY: -8,
            },
            plotOptions: {
                ...gaugeChartOptions.plotOptions,
                radialBar: {
                    ...gaugeChartOptions.plotOptions.radialBar,
                    dataLabels: {
                        ...gaugeChartOptions.plotOptions.radialBar.dataLabels,
                        value: {
                            ...gaugeChartOptions.plotOptions.radialBar.dataLabels.value,
                            fontSize: '1.2rem',
                            color: PercentageColor,
                        },
                    },
                },
            },
        };
    }
}
