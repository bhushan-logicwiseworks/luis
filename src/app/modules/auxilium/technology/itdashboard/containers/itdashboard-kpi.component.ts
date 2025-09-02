import { Component, OnInit } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config';
import icAssessment from '@iconify/icons-ic/twotone-assessment';
import icBarChar from '@iconify/icons-ic/twotone-bar-chart';
import icCalendarToday from '@iconify/icons-ic/twotone-calendar-today';
import icGroup from '@iconify/icons-ic/twotone-group';
import icPageview from '@iconify/icons-ic/twotone-pageview';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppConfig } from 'app/core/config/app.config';
import { DashboardApiService } from 'app/core/services/dashboard-api.service';
import { TechDashboardApiService } from 'app/core/services/dashboard-tech-api.service';
import { ApexOptions } from 'app/shared/components/chart/chart.component';
import { gaugeChartOptions } from '../services/gauge-chart-options';
import { lineChartOptions } from '../services/line-chart-options';
import { LineChartTechComponent } from '../components/line-chart-tech/line-chart-tech.component';
import { QuickValueTechComponent } from '../components/quick-value-tech/quick-value-tech.component';
@UntilDestroy()
@Component({
    selector: 'app-itdashboard-kpi',
    templateUrl: './itdashboard-kpi.component.html',
    styleUrls: ['./itdashboard-kpi.component.scss'],
    imports: [LineChartTechComponent, QuickValueTechComponent],
})
export class ItdashboardKpiComponent implements OnInit {
    icPageview = icPageview;
    icGroup = icGroup;
    icAssessment = icAssessment;
    icBarChar = icBarChar;
    icCalendarToday = icCalendarToday;
    theme: string = 'light';

    // COLUMN 1 : COUNTER 1 - THREATS BY MONTH FOR LAST 6 MONTHS
    // ---------------------------------------------------------
    currentMonthThreatCount: number;
    threatsByMonth: ApexAxisChartSeries = [
        {
            name: 'Threats by month',
            data: [],
        },
    ];
    threatsByMonthChartOptions: ApexOptions = {
        ...lineChartOptions,
        colors: ['#f56565'],
    };

    // COLUMN 2 : COUNTER 1 - THREAT PERCENTAGE AGAINST TOTAL TRANSACTIONS
    // -------------------------------------------------------------------
    totalThreatPercentage: number;
    totalThreatCount: any;
    threatGaugeOptions: ApexOptions = {
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

    // COLUMN 3 : COUNTER 1 - MONTH WITH HIGHEST THREAT
    // ------------------------------------------------
    highestThreatCount: any;
    monthdata: any;

    constructor(
        private dashboardApiService: DashboardApiService,
        private techdashboardApiService: TechDashboardApiService,
        private _fuseConfigService: FuseConfigService
    ) {
        this._fuseConfigService.config$.pipe(untilDestroyed(this)).subscribe((config: AppConfig) => {
            if (config.scheme === 'dark') {
                this.theme = 'dark';
            }
        });
    }

    ngOnInit(): void {
        this.getThreatsByMonth();
        this.getThreatPercentage();
        this.getMonthWithHighestThreat();
        this.updateGaugeOptions();
    }

    getThreatsByMonth() {
        this.techdashboardApiService
            .getThreatsByMonth()
            .toPromise()
            .then(data => {
                //console.log(data);
                const plotly = data.reduce(
                    (p, n) => ({
                        x: [...p.x, n.monthName],
                        y: [...p.y, n.monthCount],
                        res: n.monthCount,
                    }),
                    {
                        x: [],
                        y: [],
                    }
                );

                this.currentMonthThreatCount = plotly.res;

                //console.log(plotly);
                this.threatsByMonth = [
                    {
                        ...this.threatsByMonth[0],
                        data: plotly.y,
                    },
                ];
                //console.log(this.threatsByMonth);
                this.threatsByMonthChartOptions = {
                    ...this.threatsByMonthChartOptions,
                    labels: plotly.x,
                    chart: {
                        ...this.threatsByMonthChartOptions.chart,
                        height: 200,
                    },
                    tooltip: {
                        theme: this.theme === 'dark' ? 'dark' : 'light',
                    },
                };
            });
    }

    getThreatPercentage() {
        this.techdashboardApiService
            .getThreatPercentage()
            .toPromise()
            .then(data => {
                //console.log(data);
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
                this.totalThreatCount = res.count;
                this.totalThreatPercentage = res.percent;
            });
    }

    getMonthWithHighestThreat() {
        this.techdashboardApiService
            .getMonthWithHighestThreat()
            .toPromise()
            .then(data => {
                const res = data.reduce(
                    (p, n) => ({
                        count: n.monthCount,
                        month: n.monthName,
                        year: n.year,
                    }),
                    {
                        x: [],
                        y: [],
                    }
                );
                this.highestThreatCount = res.count?.toFixed(0);
                this.monthdata = res.month + ' ' + res.year;
            });
    }

    updateGaugeOptions(): void {
        this.threatGaugeOptions = {
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
                            color: this.theme == 'dark' ? '#FFFFFF' : '#000000',
                        },
                    },
                },
            },
        };
    }
}
