import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientCareManagementActions } from '../actions/patient-caremanagement.action';

@Injectable({
    providedIn: 'root',
})
export class PatientCareManagementEffects {
    loadOwners$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCareManagementActions.LoadOwners),
            switchMap(action =>
                this.apiService.getOwners().pipe(
                    map(owners => PatientCareManagementActions.LoadOwnersSuccess({ owners })),
                    catchError(error => of(PatientCareManagementActions.LoadOwnersFailure({ error: error.error })))
                )
            )
        )
    );

    loadRecords$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCareManagementActions.LoadPatientCareManagement),
            switchMap(action =>
                this.apiService.getPatientCareManagementRecords(action.patientId).pipe(
                    map(records => PatientCareManagementActions.LoadPatientCareManagementSuccess({ records })),
                    catchError(error =>
                        of(PatientCareManagementActions.LoadPatientCareManagementFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    addRecord$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCareManagementActions.AddPatientCareManagement),
            switchMap(action =>
                this.apiService.addPatientCareManagementRecord(action.record).pipe(
                    map(record => {
                        ToastConfig.ADD_SUCCESS();
                        return PatientCareManagementActions.AddPatientCareManagementSuccess({ record });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(PatientCareManagementActions.AddPatientCareManagementFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    deleteRecord$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCareManagementActions.DeletePatientCareManagement),
            switchMap(action =>
                this.apiService.deletePatientCareManagementRecord(action.record).pipe(
                    map(() => {
                        ToastConfig.DELETE_SUCCESS();
                        return PatientCareManagementActions.DeletePatientCareManagementSuccess();
                    }),
                    catchError(error => {
                        ToastConfig.DELETE_FAILURE();
                        return of(
                            PatientCareManagementActions.DeletePatientCareManagementFailure({ error: error.error })
                        );
                    })
                )
            )
        )
    );

    loadPatientCareManagementContactNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCareManagementActions.LoadContactNotes),
            switchMap(({ patientId, refId }) =>
                this.apiService.getCareManagementContactNotes(patientId, refId).pipe(
                    map(notes => PatientCareManagementActions.LoadContactNotesSuccess({ notes })),
                    catchError(error =>
                        of(PatientCareManagementActions.LoadContactNotesFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    addContactNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCareManagementActions.AddContactNote),
            switchMap(action =>
                this.apiService.addCareManagementNote(action.note).pipe(
                    map(note => PatientCareManagementActions.AddContactNoteSuccess({ note: action.note })),
                    catchError(error => of(PatientCareManagementActions.AddContactNoteFailure({ error: error.error })))
                )
            )
        )
    );

    addContactNoteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCareManagementActions.AddContactNoteSuccess),
            tap(() => {
                ToastConfig.ADD_SUCCESS();
            }),
            map(({ note }) =>
                PatientCareManagementActions.LoadContactNotes({
                    patientId: note.entityID,
                    refId: note.refId,
                })
            )
        )
    );

    addContactNoteFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCareManagementActions.AddContactNoteFailure),
            tap(() => {
                ToastConfig.ADD_FAILURE();
            }),
            map(() => PatientCareManagementActions.Refresh())
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PatientCareManagementActions.AddPatientCareManagementSuccess,
                PatientCareManagementActions.DeletePatientCareManagementSuccess
            ),
            map(() => PatientCareManagementActions.Refresh())
        )
    );

    loadPayorRank1$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCareManagementActions.LoadPayorRank1),
            switchMap(action =>
                this.apiService.getPatientPayorRank1(action.patientId).pipe(
                    map(payorRank1 => PatientCareManagementActions.LoadPayorRank1Success({ payorRank1 })),
                    catchError(error => of(PatientCareManagementActions.LoadPayorRank1Failure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
