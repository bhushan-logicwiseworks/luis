import { Component, Input } from '@angular/core';
import { ApexOptions } from 'app/shared/components/chart/chart.component';
import { NgClass } from '@angular/common';
import { ChartComponent } from '../../../../../../shared/components/chart/chart.component';

@Component({
    selector: 'aux-reorder-value',
    templateUrl: './aux-reorder-value.component.html',
    styleUrls: ['./aux-reorder-value.component.scss'],
    imports: [NgClass, ChartComponent],
})
export class AuxReorderValueComponent {
    @Input() value: string;
    @Input() label: string;
    @Input() gaugeSeries: ApexNonAxisChartSeries = [];
    @Input() gaugeOptions: ApexOptions;
    @Input() kpiLabel: Array<{ label: string; color: string }> = [];
    @Input() color: string = 'text-black';
    @Input() percentage: boolean;
    @Input() customClass: string = 'text-xs';
}
