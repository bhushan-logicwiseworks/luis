import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { ComplianceActions } from '../actions/patient-compliance.action';

@Injectable({
    providedIn: 'root',
})
export class PatientComplianceEffects {
    loadCompliances$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ComplianceActions.loadCompliance),
            switchMap(action =>
                this.apiService.getPatientCompliance(action.patientId).pipe(
                    map(compliances => ComplianceActions.loadComplianceSuccess({ compliances })),
                    catchError(error => of(ComplianceActions.loadComplianceFailure({ error: error.error })))
                )
            )
        )
    );

    addCompliance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ComplianceActions.addCompliance),
            switchMap(action =>
                this.apiService.savePatientCompliance(action.compliance).pipe(
                    map(() => {
                        ToastConfig.ADD_SUCCESS();
                        return ComplianceActions.addComplianceSuccess({ compliance: [action.compliance] });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(ComplianceActions.addComplianceFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    updateCompliance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ComplianceActions.updateCompliance),
            switchMap(action =>
                this.apiService.savePatientCompliance(action.compliance).pipe(
                    map(() => {
                        ToastConfig.EDIT_SUCCESS();
                        return ComplianceActions.updateComplianceSuccess({ compliance: [action.compliance] });
                    }),
                    catchError(error => {
                        ToastConfig.EDIT_FAILURE();
                        return of(ComplianceActions.updateComplianceFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    deleteCompliance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ComplianceActions.DeleteCompliance),
            switchMap(action =>
                this.apiService.deletePatientCompliance(action.compliance).pipe(
                    map(() => {
                        ToastConfig.DELETE_SUCCESS();
                        return ComplianceActions.DeleteComplianceSuccess();
                    }),
                    catchError(error => {
                        ToastConfig.DELETE_FAILURE();
                        return of(ComplianceActions.DeleteComplianceFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ComplianceActions.addComplianceSuccess, ComplianceActions.DeleteComplianceSuccess),
            map(() => ComplianceActions.refresh())
        )
    );

    loadComplianceContactNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ComplianceActions.LoadContactNotes),
            switchMap(({ patientId, refId }) =>
                this.apiService.getComplianceContactNotes(patientId, refId).pipe(
                    map(notes => ComplianceActions.LoadContactNotesSuccess({ notes })),
                    catchError(error => of(ComplianceActions.LoadContactNotesFailure({ error: error.error })))
                )
            )
        )
    );

    addContactNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ComplianceActions.AddContactNote),
            switchMap(action =>
                this.apiService.addComplianceNote(action.note).pipe(
                    map(note => ComplianceActions.AddContactNoteSuccess({ note: action.note })),
                    catchError(error => of(ComplianceActions.AddContactNoteFailure({ error: error.error })))
                )
            )
        )
    );

    addContactNoteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ComplianceActions.AddContactNoteSuccess),
            tap(() => {
                ToastConfig.ADD_SUCCESS();
            }),
            map(({ note }) =>
                ComplianceActions.LoadContactNotes({
                    patientId: note.entityID,
                    refId: note.refId,
                })
            )
        )
    );

    addContactNoteFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ComplianceActions.AddContactNoteFailure),
            tap(() => {
                ToastConfig.ADD_FAILURE();
            }),
            map(() => ComplianceActions.refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
