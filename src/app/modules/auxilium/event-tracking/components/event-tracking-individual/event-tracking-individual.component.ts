import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { DateTimeFormatPipe } from '../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';

@Component({
    selector: 'app-event-tracking-individual',
    templateUrl: './event-tracking-individual.component.html',
    styleUrls: ['./event-tracking-individual.component.scss'],
    imports: [
        MatTooltip,
        MatIcon,
        DateTimeFormatPipe,
    ],
})
export class EventTrackingIndividualComponent {
    eventTrackingData;

    constructor(@Optional() @Inject(MAT_DIALOG_DATA) private data: any) {
        this.eventTrackingData = data.dynamicComponentData;
    }
}
