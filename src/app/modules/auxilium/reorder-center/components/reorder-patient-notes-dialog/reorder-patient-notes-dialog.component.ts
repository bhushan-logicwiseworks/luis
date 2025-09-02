import { Component, OnInit } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ReorderPatientSelectors } from '../../reducers';
import { ScrollbarComponent } from '../../../../../shared/components/scrollbar/scrollbar.component';
import { NgClass, AsyncPipe } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { DateTimeFormatPipe } from '../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';

@Component({
    selector: 'ac-reorder-patient-notes-dialog',
    templateUrl: './reorder-patient-notes-dialog.component.html',
    styleUrls: ['./reorder-patient-notes-dialog.component.scss'],
    imports: [
        ScrollbarComponent,
        NgClass,
        MatDivider,
        AsyncPipe,
        DateTimeFormatPipe,
    ],
})
export class ReorderPatientNotesDialogComponent implements OnInit {
    icClose = icClose;
    patientNotes$ = this.store
        .select(ReorderPatientSelectors.selectPatientNotes)
        .pipe(map(notes => notes.sort((a, b) => b.addDate?.localeCompare(a.addDate))));

    constructor(private store: Store) {}

    ngOnInit(): void {}
}
