import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    NgZone,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import ApexCharts from 'apexcharts';
import { asapScheduler } from 'rxjs';

export interface ApexOptions {
    annotations?: ApexAnnotations;
    chart?: ApexChart;
    colors?: any[];
    dataLabels?: ApexDataLabels;
    fill?: ApexFill;
    grid?: ApexGrid;
    labels?: string[] | number[];
    legend?: ApexLegend;
    markers?: ApexMarkers;
    noData?: ApexNoData;
    plotOptions?: ApexPlotOptions;
    responsive?: ApexResponsive[];
    series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
    states?: ApexStates;
    stroke?: ApexStroke;
    subtitle?: ApexTitleSubtitle;
    theme?: ApexTheme;
    title?: ApexTitleSubtitle;
    tooltip?: ApexTooltip;
    xaxis?: ApexXAxis;
    yaxis?: ApexYAxis | ApexYAxis[];
}

@Component({
    selector: 'aux-chart',
    template: ` <div #chart></div> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent {
    @Input() options: ApexOptions;
    @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    @Input() autoUpdateSeries = true;
    public chart: ApexCharts;
    @ViewChild('chart', { static: true }) private chartElement: ElementRef;

    constructor(
        private cd: ChangeDetectorRef,
        private ngZone: NgZone
    ) {}

    ngOnInit() {
        asapScheduler.schedule(() => {
            this._createElement();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        asapScheduler.schedule(() => {
            this._createElement();
        });
    }

    private _createElement() {
        if (this.series) {
            this.options.series = this.series;
        }

        if (this.chart) {
            this.chart.destroy();
        }

        this.ngZone.runOutsideAngular(() => {
            if (this.options?.chart) {
                this.chart = new ApexCharts(this.chartElement.nativeElement, this.options);

                this.render().catch(error => console.log(error));
            }
        });
    }

    public render(): Promise<void> {
        return this.chart?.render();
    }
}
