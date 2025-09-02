import { Icon, IconModule } from '@abhinavakhil/iconify-angular';
import { Component, Input, OnInit } from '@angular/core';
import { ApexOptions } from 'app/shared/components/chart/chart.component';
import { NgClass } from '@angular/common';
import { ChartComponent } from '../../../../../../shared/components/chart/chart.component';

@Component({
    selector: 'ac-line-chart-tech',
    templateUrl: './line-chart-tech.component.html',
    styleUrls: ['./line-chart-tech.component.scss'],
    imports: [
        IconModule,
        NgClass,
        ChartComponent,
    ],
})
export class LineChartTechComponent implements OnInit {
    @Input() label: string;
    @Input() value: string;
    @Input() series: ApexAxisChartSeries;
    @Input() options: ApexOptions;
    @Input() iconClasses: string[];
    @Input() icon: Icon;

    constructor() {}

    ngOnInit(): void {}
}
