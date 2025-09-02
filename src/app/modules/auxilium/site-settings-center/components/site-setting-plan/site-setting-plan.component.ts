import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FuseAlertComponent } from '../../../../../../@fuse/components/alert/alert.component';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepicker } from '@angular/material/datepicker';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'app-site-setting-plan',
    templateUrl: './site-setting-plan.component.html',
    styleUrls: ['./site-setting-plan.component.scss'],
    imports: [
        ReactiveFormsModule,
        FuseAlertComponent,
        NgClass,
        MatIcon,
        MatFormField,
        MatLabel,
        MatInput,
        MatDatepickerInput,
        MatDatepicker,
        MatSelect,
        MatOption,
        MatButton,
        MatTooltip,
    ],
})
export class SiteSettingPlanComponent {
    selectedPlan = 'BASIC';
    selectedState;
    countyList = [
        {
            name: 'United States',
            value: 'US',
        },
        {
            name: 'Canada',
            value: 'CA',
        },
        {
            name: 'Mexico',
            value: 'MX',
        },
        {
            name: 'France',
            value: 'FR',
        },
        {
            name: 'Germany',
            value: 'GR',
        },
        {
            name: 'Italy',
            value: 'IT',
        },
    ];

    constructor() {
        this.selectedState = 'US'; // Default value
    }

    selectPlan(planName: string) {
        this.selectedPlan = planName;
    }
}
