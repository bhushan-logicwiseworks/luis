import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from 'app/core/services/api.service';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientNotesActions } from '../actions/patient-notes.actions';

@Injectable({
    providedIn: 'root',
})
export class PatientNotesEffects {
    // loadPatientNotes$ = createEffect(() => this.actions$.pipe(
    //   ofType(PatientNotesActions.LoadPatientNotes),
    //   switchMap(action =>
    //     this.apiService.getPatientContactNotes(action.patientId).pipe(
    //       map(notes => {
    //         console.log(notes)
    //       return  PatientNotesActions.LoadPatientNotesSuccess({ notes })
    //       }),
    //       catchError(error => of(PatientNotesActions.LoadPatientNotesFailure({ error: error.error })))
    //     )
    //   )
    // ));
    loadPatientNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientNotesActions.LoadPatientNotes),
            switchMap(action =>
                this.apiService.getPatientContactNotes(action.patientId).pipe(
                    map(notes => {
                        // Sanitize HTML content for each note
                        // const sanitizedNotes = notes.map(note => ({
                        //   ...note,
                        //   note: this.sanitizer.bypassSecurityTrustHtml(note.note.toString())
                        // }));
                        return PatientNotesActions.LoadPatientNotesSuccess({ notes: notes });
                    }),
                    catchError(error => of(PatientNotesActions.LoadPatientNotesFailure({ error: error.error })))
                )
            )
        )
    );

    /* loadContactType$ = createEffect(() => this.actions$.pipe(
    ofType(PatientNotesActions.LoadContactType),
    switchMap(action =>
      this.apiService.getPatientContactType().pipe(
        map(contactType => PatientNotesActions.LoadContactTypeSuccess({ contactType })),
        catchError(error => of(PatientNotesActions.LoadContactTypeFailure({ error: error.error })))
      )
    )
  )); */

    loadContactList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientNotesActions.LoadContactList),
            switchMap(action =>
                this.apiService.getContactList().pipe(
                    map(contactList => PatientNotesActions.LoadContactListSuccess({ contactList })),
                    catchError(error => of(PatientNotesActions.LoadContactListFailure({ error: error.error })))
                )
            )
        )
    );

    addPatientNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientNotesActions.AddPatientNote),
            switchMap(action =>
                this.apiService.patientContactNoteSave(action.note).pipe(
                    map(note => {
                        ToastConfig.ADD_SUCCESS();
                        return PatientNotesActions.AddPatientNoteSuccess({ note });
                    }),
                    catchError(error => of(PatientNotesActions.AddPatientNoteFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientNotesActions.AddPatientNoteSuccess),
            map(() => PatientNotesActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private sanitizer: DomSanitizer,
        private apiService: ApiService
    ) {}
}
