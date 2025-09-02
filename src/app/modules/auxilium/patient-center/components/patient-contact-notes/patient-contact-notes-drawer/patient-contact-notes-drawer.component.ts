import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { ReorderPatientSelectors } from 'app/modules/auxilium/reorder-center/reducers';
import { Subject, combineLatest, startWith } from 'rxjs';
import { ScrollbarComponent } from '../../../../../../shared/components/scrollbar/scrollbar.component';
import { DateTimeFormatPipe } from '../../../../../../shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PatientNotesActions } from '../../../actions/patient-notes.actions';
import { PatientNotesSelectors } from '../../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-patient-contact-notes-drawer',
    templateUrl: './patient-contact-notes-drawer.component.html',
    styleUrls: ['./patient-contact-notes-drawer.component.scss'],
    imports: [ScrollbarComponent, NgClass, MatDivider, DateTimeFormatPipe],
})
export class PatientContactNotesDrawerComponent {
    data$ = this.store.select(PatientNotesSelectors.selectNotes);
    loading$ = this.store.select(PatientNotesSelectors.selectLoading);
    patientNotes$ = this.store.select(ReorderPatientSelectors.selectPatientNotes);
    patientNotes;
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    constructor(
        private store: Store,
        private _router: Router,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        const patId = this._router.url.split('/')[3];
        combineLatest([this.refresh$.pipe(startWith(null))])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                this.store.dispatch(PatientNotesActions.LoadPatientNotes({ patientId: +patId }));
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(notes => {
            if (notes) {
                const myArray = notes;
                const filteredArray = myArray.filter(obj => obj.addUserId !== 'SYSTEM');
                this.patientNotes = filteredArray;
                this.cdr.detectChanges();
            }
        });
    }
}
