import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
import { AuxLineChartComponent } from '../../component/aux-line-chart/aux-line-chart.component';

@UntilDestroy()
@Component({
    selector: 'app-global',
    templateUrl: './global.component.html',
    styleUrls: ['./global.component.scss'],
    imports: [
        NgClass,
        AuxReorderValueComponent,
        AuxLineChartComponent,
    ],
})
export class GlobalComponent {
    private tooltipColor: string = 'light';
    @Input() className: string;
    @Input() rowClassName: string;

    // COUNTER 3-1
    totActivePatientsCount: any;
    activePatientsByManufacturer = [
        { label: 'Abbott', source: 'ABBOTT', color: 'bg-orange-600', total: 0, percent: 0 },
        { label: 'Dexcom', source: 'DEXCOM', color: 'bg-purple-600', total: 0, percent: 0 },
    ];

    // COUNTER 3-2
    totActiveCMNExpir_14day_Count: any;

    // COUNTER 3-3
    totPendingCGM_Ref_Count: any;
    patientsByInsurance1 = [
        { label: 'Medicare', source: 'MEDICARE', color: 'bg-orange-600', total: 0, percent: 0 },
        { label: 'Other', source: 'OTHER', color: 'bg-purple-600', total: 0, percent: 0 },
    ];

    // COUNTER 3-4
    tot_Avg_Days_From_Ref_To_Active_Count: any;
    patientsByInsurance2 = [
        { label: 'Medicare', source: 'MEDICARE', color: 'bg-orange-600', total: 0, percent: 0 },
        { label: 'Other', source: 'OTHER', color: 'bg-purple-600', total: 0, percent: 0 },
    ];

    // COUNTER 3-5
    tot_CGM_Ref_Turned_Active_Patients_Count: any;

    // COUNTER 3-6
    patientsUsingReorderPortalOptions: ApexOptions = {
        ...gaugeChartOptions,
        chart: {
            ...gaugeChartOptions.chart,
            height: 150,
        },
    };
    patientsUsingReorderPortalPercent: number;
    patientsUsingReorderPortalCount: any;

    // COUNTER 3-7
    totalAccounts: any;
    activeAccount = [
        { label: 'Active', source: 'ACTIVEACCOUNTS', color: 'bg-orange-600', total: 0, percent: 0 },
        { label: 'RSP Portal', source: 'RSPACCOUNTS', color: 'bg-purple-600', total: 0, percent: 0 },
    ];

    // COUNTER 3-8
    totalRetentionRate;

    // COUNTER 3-9 AVERAGE PATIENT LONGEVITY
    newCGMPatientLongevityThisMonthChartOptions: ApexOptions = {
        ...generateChartOptions,
    };

    newCGMPatientLongevityThisMonthCount: number;
    newCGMPatientLongevityThisMonth: ApexAxisChartSeries = [
        {
            name: 'Average CGM Patient Service Longevity',
            data: [],
        },
    ];

    // COUNTER 3-9 ACTIVE PATIENT LONGEVITY
    activePatientLongevityThisMonthChartOptions: ApexOptions = {
        ...generateChartOptions,
    };

    activePatientLongevityThisMonthCount: number;
    activePatientLongevityThisMonth: ApexAxisChartSeries = [
        {
            name: 'CURRENT ACTIVE PATIENT LONGEVITY',
            data: [0, 0],
        },
    ];

    //********************************************************************************************************************
    // STORE OPERATIONS
    //********************************************************************************************************************

    // COUNTER 3-1
    getCGMTotalActivePatientsThisYear$ = this.store.select(DashboardSelectors.selectCgmTotalActiveCgmPatientsThisYear);

    // COUNTER 3-2
    getActiveCMNExpiration14Days$ = this.store.select(DashboardSelectors.selectActivecmnExpiration14Days);

    // COUNTER 3-3
    getTotalPendingCGMReferrals$ = this.store.select(DashboardSelectors.selectTotalPendingCgmReferrals);

    // COUNTER 3-4
    getAverageDaysFromReferralEntryToActiveStatus$ = this.store.select(
        DashboardSelectors.selectAverageDaysFromReferralEntryToActiveStatus
    );

    // COUNTER 3-5
    getPercentCGMReferralsTurnedIntoActivePatients$ = this.store.select(
        DashboardSelectors.selectPercentCgmReferralSturnedinToActivePatients
    );

    // COUNTER 3-6
    getPatientsUsingReorderPortal$ = this.store.select(DashboardSelectors.selectPatientsUsingAnswersReorderPortal);

    // COUNTER 3-7
    getRSPTotals$ = this.store.select(DashboardSelectors.selectTotalRspAccounts);

    // COUNTER 3-8
    getRetentionRate$ = this.store.select(DashboardSelectors.selectRetentionRate);

    // COUNTER 3-9
    getCgmPatientLongevityThisMonth$ = this.store.select(DashboardSelectors.selectCgmPatientLongevityThisMonth);

    // COUNTER 3-10
    getActivePatientLongevityThisMonth$ = this.store.select(DashboardSelectors.selectActivePatientLongevityThisMonth);

    /**
     * Constructor
     */
    constructor(
        private store: Store,
        private _fuseConfigService: FuseConfigService,
        public cdr: ChangeDetectorRef
    ) {
        this._fuseConfigService.config$.pipe(untilDestroyed(this)).subscribe((config: AppConfig) => {
            if (config.scheme === 'dark') {
                this.tooltipColor = config.scheme;
            }
        });
    }

    ngOnInit() {
        this.getCGMTotalActivePatientsThisYear();
        this.totActiveCMNExpire();
        this.getTotalPendingCGMReferrals();
        this.getAverageDaysFromReferralEntryToActiveStatus();
        this.getPercentCGMReferralsTurnedIntoActivePatients();
        this.getPatientsUsingReorderPortal();
        this.getRSPTotals();
        this.getRetentionRate();
        this.getCgmPatientLongevityThisMonth();
        this.updateGaugeOptions();
    }

    // COUNTER 3-1
    getCGMTotalActivePatientsThisYear() {
        this.getCGMTotalActivePatientsThisYear$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadCgmTotalActiveCgmPatientsThisYear());
            }
            data.map(element => {
                if (element.source == 'ABBOTT') {
                    const getFindIndex = this.activePatientsByManufacturer.findIndex(
                        item => item.source === element.source
                    );
                    this.activePatientsByManufacturer[getFindIndex].total = element.total?.toFixed(0);
                    this.activePatientsByManufacturer[getFindIndex].percent = element.percent?.toFixed(0);
                }
                if (element.source == 'DEXCOM') {
                    const getFindIndex = this.activePatientsByManufacturer.findIndex(
                        item => item.source === element.source
                    );
                    this.activePatientsByManufacturer[getFindIndex].total = element.total?.toFixed(0);
                    this.activePatientsByManufacturer[getFindIndex].percent = element.percent?.toFixed(0);
                    this.totActivePatientsCount = element.all?.toFixed(0);
                }
            });
        });
    }

    // COUNTER 3-2
    totActiveCMNExpire() {
        this.getActiveCMNExpiration14Days$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadActivecmnExpiration14Days());
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
            this.totActiveCMNExpir_14day_Count = res.count?.toFixed(0);
        });
    }

    // COUNTER 3-3
    getTotalPendingCGMReferrals() {
        this.getTotalPendingCGMReferrals$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadTotalPendingCgmReferrals());
            }
            data.map(element => {
                if (element.source == 'MEDICARE') {
                    const getFindIndex = this.patientsByInsurance1.findIndex(item => item.source === element.source);
                    this.patientsByInsurance1[getFindIndex].total = element.total?.toFixed(0);
                    this.patientsByInsurance1[getFindIndex].percent = element.percent?.toFixed(0);
                }
                if (element.source == 'OTHER') {
                    const getFindIndex = this.patientsByInsurance1.findIndex(item => item.source === element.source);
                    this.patientsByInsurance1[getFindIndex].total = element.total?.toFixed(0);
                    this.patientsByInsurance1[getFindIndex].percent = element.percent?.toFixed(0);
                    this.totPendingCGM_Ref_Count = element.all?.toFixed(0);
                }
            });
        });
    }

    // COUNTER 3-4
    getAverageDaysFromReferralEntryToActiveStatus() {
        /* this.getAverageDaysFromReferralEntryToActiveStatus$.pipe(
            untilDestroyed(this)
        ).subscribe(data => {
            const res = data.reduce((p, n) => ({
                count: n.count,
                percent: n.percent
            }), {
                x: [],
                y: []
            });
            this.tot_Avg_Days_From_Ref_To_Active_Count = res.count?.toFixed(0);
        }) */
        this.getAverageDaysFromReferralEntryToActiveStatus$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadAverageDaysFromReferralEntryToActiveStatus());
            }
            data.map(element => {
                if (element.source == 'MEDICARE') {
                    const getFindIndex = this.patientsByInsurance2.findIndex(item => item.source === element.source);
                    this.patientsByInsurance2[getFindIndex].total = element.total?.toFixed(0);
                    this.patientsByInsurance2[getFindIndex].percent = element.percent?.toFixed(0);
                }
                if (element.source == 'OTHER') {
                    const getFindIndex = this.patientsByInsurance2.findIndex(item => item.source === element.source);
                    this.patientsByInsurance2[getFindIndex].total = element.total?.toFixed(0);
                    this.patientsByInsurance2[getFindIndex].percent = element.percent?.toFixed(0);
                    this.tot_Avg_Days_From_Ref_To_Active_Count = element.all?.toFixed(0);
                }
            });
        });
    }

    // COUNTER 3-5
    getPercentCGMReferralsTurnedIntoActivePatients() {
        this.getPercentCGMReferralsTurnedIntoActivePatients$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadPercentCgmReferralSturnedinToActivePatients());
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
            this.tot_CGM_Ref_Turned_Active_Patients_Count = res.count?.toFixed(0);
        });
    }

    // COUNTER 3-6
    getPatientsUsingReorderPortal() {
        this.getPatientsUsingReorderPortal$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadPatientsUsingAnswersReorderPortal());
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
            this.patientsUsingReorderPortalCount = res.count?.toFixed(0);
            this.patientsUsingReorderPortalPercent = res.percent;
        });
    }

    // COUNTER 3-7
    getRSPTotals() {
        this.getRSPTotals$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadTotalRspAccounts());
            }
            data.map(element => {
                if (element.source == 'TOTALACCOUNTS') {
                    this.totalAccounts = element.total?.toFixed(0);
                }
                if (element.source == 'ACTIVEACCOUNTS') {
                    const getFindIndex = this.activeAccount.findIndex(item => item.source === element.source);
                    this.activeAccount[getFindIndex].total = element.total?.toFixed(0);
                    this.activeAccount[getFindIndex].percent = element.percent?.toFixed(0);
                }
                if (element.source == 'RSPACCOUNTS') {
                    const getFindIndex = this.activeAccount.findIndex(item => item.source === element.source);
                    this.activeAccount[getFindIndex].total = element.total?.toFixed(0);
                    this.activeAccount[getFindIndex].percent = element.percent?.toFixed(0);
                }
            });
        });
    }

    // COUNTER 3-8
    getRetentionRate() {
        this.getRetentionRate$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadRetentionRate());
            }
            data.map(element => {
                this.totalRetentionRate = element.percent;
            });
        });
    }

    // COUNTER 3-9
    getCgmPatientLongevityThisMonth() {
        this.getCgmPatientLongevityThisMonth$.pipe(untilDestroyed(this)).subscribe(
            data => {
                if (!data?.length) {
                    this.store.dispatch(DashboardDeatilsActions.LoadCgmAverageServiceLongevity());
                }
                // console.log('getCgmPatientLongevityThisMonth data:', data);
                if (data && data.length > 0) {
                    const categories = data.map(item => item.source);
                    const plotly = data.reduce(
                        (p, n) => ({
                            x: [...p.x, n.source],
                            y: [...p.y, n.percent],
                            res: categories,
                        }),
                        {
                            x: [],
                            y: [],
                            res: null,
                        }
                    );
                    if (plotly.res?.length) {
                        //this.newCGMPatientLongevityThisMonthCount = plotly.y[plotly.y?.length - 1];
                        this.newCGMPatientLongevityThisMonth = [
                            {
                                ...this.newCGMPatientLongevityThisMonth[0],
                                data: plotly.y,
                            },
                        ];
                        this.newCGMPatientLongevityThisMonthChartOptions = generateChartOptions(
                            plotly,
                            this.tooltipColor
                        );
                        this.activePatientLongevityThisMonthChartOptions = {
                            ...generateChartOptions(plotly, this.tooltipColor),
                            chart: {
                                type: 'line',
                                toolbar: {
                                    show: false,
                                },
                            },
                            stroke: {
                                curve: 'smooth',
                            },
                            dataLabels: {
                                enabled: false,
                            },
                            colors: ['#FFFFFF'],
                        };
                    }
                }
            },
            error => {
                console.error('Error in getCgmPatientLongevityThisMonth:', error);
            }
        );

        this.getActivePatientLongevityThisMonth$.pipe(untilDestroyed(this)).subscribe(
            res => {
                if (!res?.length) {
                    this.store.dispatch(DashboardDeatilsActions.LoadActivePatientLongevityThisMonth());
                }
                //console.log('getActivePatientLongevityThisMonth data:', res);
                if (res && res.length > 0) {
                    const categories = res.map(item => item.source);
                    const plotly = res.reduce(
                        (p, n) => ({
                            x: [...p.x, n.source],
                            y: [...p.y, n.total],
                            res: categories,
                        }),
                        {
                            x: [],
                            y: [],
                            res: null,
                        }
                    );
                    //console.log('plotly:', plotly);
                    if (plotly.res?.length) {
                        //this.activePatientLongevityThisMonthCount = plotly.y[plotly.y?.length - 1];
                        this.activePatientLongevityThisMonth = [
                            {
                                ...this.activePatientLongevityThisMonth[0],
                                data: plotly.y,
                            },
                        ];
                        this.activePatientLongevityThisMonthChartOptions = {
                            ...generateChartOptions(plotly, this.tooltipColor),
                            chart: {
                                type: 'line',
                                toolbar: {
                                    show: false,
                                },
                            },
                            stroke: {
                                curve: 'smooth',
                            },
                            dataLabels: {
                                enabled: false,
                            },
                        };
                    }
                }
            },
            error => {
                console.error('Error in getActivePatientLongevityThisMonth:', error);
            }
        );
    }

    updateGaugeOptions(): void {
        this.patientsUsingReorderPortalOptions = {
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
                            color: this.tooltipColor == 'dark' ? '#FFFFFF' : '#000000',
                        },
                    },
                },
            },
        };
    }
}
