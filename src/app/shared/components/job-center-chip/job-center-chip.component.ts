import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'ac-job-center-chip',
    templateUrl: './job-center-chip.component.html',
    styleUrls: ['./job-center-chip.component.scss'],
    imports: [NgClass],
})
export class JobCenterChipComponent implements OnInit {
    @Input() label: string;

    constructor() {}

    ngOnInit(): void {}

    getColor(label: string) {
        switch (label?.toUpperCase()) {
            // BY APPLICATION
            case 'FAIL':
                return ['bg-red-100', 'text-red-500'];
            case 'SUCCESS':
                return ['bg-green-100', 'text-green-500'];
        }
    }
}
