import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'aux-breakdown',
    templateUrl: './aux-breakdown.component.html',
    styleUrls: ['./aux-breakdown.component.scss'],
    imports: [NgClass],
})
export class AuxBreakdownComponent {
    @Input() label: string;
    @Input() kpiLabel: Array<{ label: string; color: string }> = [];
    @Input() color: string = 'text-black';
    @Input() percentage: boolean;
    @Input() customClass: string = 'text-xs';
}
