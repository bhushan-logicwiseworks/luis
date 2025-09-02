import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientEventsBillingActions } from '../actions/patient-events-billing.action';

@Injectable({
    providedIn: 'root',
})
export class PatientEventsBillingEffects {
    loadRecords$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientEventsBillingActions.LoadPatientBillingEvents),
            switchMap(action =>
                this.apiService.getPatientEventsBillingRecords(action.patientId, action.eventType).pipe(
                    map(BillingEvents =>
                        PatientEventsBillingActions.LoadPatientBillingEventsSuccess({ BillingEvents })
                    ),
                    catchError(error =>
                        of(PatientEventsBillingActions.LoadPatientBillingEventsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPatientBillingContactNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientEventsBillingActions.LoadContactNotes),
            switchMap(({ patientId, refId }) =>
                this.apiService.getBillingEventContactNotes(patientId, refId).pipe(
                    map(notes => PatientEventsBillingActions.LoadContactNotesSuccess({ notes })),
                    catchError(error => of(PatientEventsBillingActions.LoadContactNotesFailure({ error: error.error })))
                )
            )
        )
    );

    addContactNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientEventsBillingActions.AddContactNote),
            switchMap(action =>
                this.apiService.addEventBillingNote(action.note).pipe(
                    map(note => PatientEventsBillingActions.AddContactNoteSuccess({ note: action.note })),
                    catchError(error => of(PatientEventsBillingActions.AddContactNoteFailure({ error: error.error })))
                )
            )
        )
    );

    addContactNoteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientEventsBillingActions.AddContactNoteSuccess),
            tap(() => {
                ToastConfig.ADD_SUCCESS();
            }),
            map(({ note }) =>
                PatientEventsBillingActions.LoadContactNotes({
                    patientId: note.entityID,
                    refId: note.refId,
                })
            )
        )
    );

    addContactNoteFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientEventsBillingActions.AddContactNoteFailure),
            tap(() => {
                ToastConfig.ADD_FAILURE();
            }),
            map(() => PatientEventsBillingActions.Refresh())
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(),
            // PatientEventsBillingActions.AddPatientCareManagementSuccess,
            // PatientEventsBillingActions.DeletePatientCareManagementSuccess
            map(() => PatientEventsBillingActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
