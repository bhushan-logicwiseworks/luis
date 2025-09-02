import { Component, Input } from '@angular/core';
import {
    ApexAxisChartSeries,
    ApexChart,
    ApexDataLabels,
    ApexGrid,
    ApexLegend,
    ApexMarkers,
    ApexOptions,
    ApexStroke,
    ApexTitleSubtitle,
    ApexXAxis,
    ApexYAxis,
} from 'ng-apexcharts';
import { ChartComponent } from '../../../../../../shared/components/chart/chart.component';
type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
    dataLabels: ApexDataLabels;
    markers: ApexMarkers;
    colors: string[];
    yaxis: ApexYAxis;
    grid: ApexGrid;
    legend: ApexLegend;
    title: ApexTitleSubtitle;
};
@Component({
    selector: 'aux-line-chart',
    templateUrl: './aux-line-chart.component.html',
    styleUrls: ['./aux-line-chart.component.scss'],
    imports: [ChartComponent],
})
export class AuxLineChartComponent {
    @Input() label: string;
    @Input() value: string;
    @Input() series: ApexAxisChartSeries;
    @Input() options: ApexOptions;
    @Input() iconClasses: string[];

    constructor() {}

    ngOnInit() {}
}
