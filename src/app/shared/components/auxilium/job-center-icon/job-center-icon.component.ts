import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import icAlarm from '@iconify/icons-ic/alarm';
import icTurnedInNot from '@iconify/icons-ic/twotone-turned-in-not';
import { MatIcon } from '@angular/material/icon';
import { IconModule } from '@abhinavakhil/iconify-angular';

@Component({
    selector: 'app-job-center-icon',
    templateUrl: './job-center-icon.component.html',
    styleUrls: ['./job-center-icon.component.scss'],
    imports: [MatIcon, IconModule],
})
export class JobCenterIconComponent {
    params: any;
    icTurnedInNot = icTurnedInNot;
    icAlarm = icAlarm;

    agInit(params: any): void {
        this.params = params;
    }

    compareDates(dt) {
        const todaysdate = Date.now();
        var dtToday = formatDate(todaysdate, 'M/d/yy', 'en-US');
        var dtJob = formatDate(dt, 'M/d/yy', 'en-US');
        if (dtToday == dtJob) {
            return true;
        } else {
            return false;
        }
    }
}
