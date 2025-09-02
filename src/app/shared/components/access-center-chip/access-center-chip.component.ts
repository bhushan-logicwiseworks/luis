import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'ac-access-center-chip',
    templateUrl: './access-center-chip.component.html',
    styleUrls: ['./access-center-chip.component.scss'],
    imports: [NgClass],
})
export class AccessCenterChipComponent implements OnInit {
    @Input() label: string;

    constructor() {}

    ngOnInit(): void {}

    getColor(label: string) {
        switch (label?.toUpperCase()) {
            // BY APPLICATION
            case 'ADMIN':
                return ['bg-red-100', 'text-red-500'];
            case 'MEDA':
                return ['bg-teal-100', 'text-teal-500'];
            case 'PATIENTAPP':
                return ['bg-primary-light', 'text-primary'];
            case 'REFERRALSOURCEPORTAL':
                return ['bg-indigo-100', 'text-indigo-500'];
            case 'SALESREPAPP':
                return ['bg-pink-100', 'text-pink-500'];
            case 'ABBOTT':
                return ['bg-blue-100', 'text-blue-500'];
            case 'DEXCOM':
                return ['bg-blue-100', 'text-blue-500'];

            // BY CENTER
            case 'ANALYTICSCENTER':
                return ['bg-orange-100', 'text-orange-500'];
            case 'COMMCENTER':
                return ['bg-green-100', 'text-green-500'];
            case 'ONBOARDINGCENTER':
                return ['bg-gray-100', 'text-gray-500'];
            case 'JOBCENTER':
                return ['bg-yellow-100', 'text-green-500'];
            case 'PATIENTCENTER':
                return ['bg-red-100', 'text-red-500'];
            case 'REORDERCENTER':
                return ['bg-teal-100', 'text-teal-500'];
            case 'VAULTCENTER':
                return ['bg-blue-100', 'text-blue-500'];
        }
    }
}
