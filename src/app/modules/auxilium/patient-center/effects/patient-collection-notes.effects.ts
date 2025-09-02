import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ApiService } from 'app/core/services/api.service';
import { PatientCollectionNotesActions } from '../actions/patient-collection-notes.actions';

@Injectable({
    providedIn: 'root',
})
export class PatientCollectionNotesEffects {
    loadPatientNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCollectionNotesActions.LoadPatientCollectionNotes),
            switchMap(action =>
                this.apiService.getPatientCollectionDocuments(action.patientId).pipe(
                    map(notes => PatientCollectionNotesActions.LoadPatientCollectionNotesSuccess({ notes })),
                    catchError(error =>
                        of(PatientCollectionNotesActions.LoadPatientCollectionNotesFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // loadContactType$ = createEffect(() => this.actions$.pipe(
    //   ofType(PatientCollectionNotesActions.LoadContactType),
    //   switchMap(action =>
    //     this.apiService.getPatientContactType().pipe(
    //       map(contactType => PatientCollectionNotesActions.LoadContactTypeSuccess({ contactType })),
    //       catchError(error => of(PatientCollectionNotesActions.LoadContactTypeFailure({ error: error.error })))
    //     )
    //   )
    // ));

    loadContactList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCollectionNotesActions.LoadContactList),
            switchMap(action =>
                this.apiService.getContactList().pipe(
                    map(contactList => PatientCollectionNotesActions.LoadContactListSuccess({ contactList })),
                    catchError(error =>
                        of(PatientCollectionNotesActions.LoadContactListFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    addPatientNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCollectionNotesActions.AddPatientCollectionNote),
            switchMap(action =>
                this.apiService.patientCollectionNoteSave(action.note).pipe(
                    map(note => PatientCollectionNotesActions.AddPatientCollectionNoteSuccess({ note })),
                    catchError(error =>
                        of(PatientCollectionNotesActions.AddPatientCollectionNoteFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCollectionNotesActions.AddPatientCollectionNoteSuccess),
            map(() => PatientCollectionNotesActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
