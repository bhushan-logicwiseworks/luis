import { Icon, IconModule } from '@abhinavakhil/iconify-angular';
import { Component, Input, OnInit } from '@angular/core';
import { ApexOptions } from 'app/shared/components/chart/chart.component';
import { NgClass } from '@angular/common';
import { ChartComponent } from '../../../../../../shared/components/chart/chart.component';

@Component({
    selector: 'ac-quick-value-tech',
    templateUrl: './quick-value-tech.component.html',
    styleUrls: ['./quick-value-tech.component.scss'],
    imports: [
        IconModule,
        NgClass,
        ChartComponent,
    ],
})
export class QuickValueTechComponent implements OnInit {
    @Input() value: string;
    @Input() label: string;
    @Input() icon: Icon;
    @Input() iconClasses: string[];
    @Input() gaugeSeries: ApexNonAxisChartSeries;
    @Input() gaugeOptions: ApexOptions;
    @Input() chartPosition: 'side' | 'below' | 'none' = 'side';

    constructor() {}

    ngOnInit(): void {}
}
