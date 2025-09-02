import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { AuditActions } from '../actions/patient-audit.action';

@Injectable({
    providedIn: 'root',
})
export class PatientAuditEffects {
    loadAudits$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuditActions.loadAudit),
            switchMap(action =>
                this.apiService.getPatientAudit(action.patientId).pipe(
                    map(audits => AuditActions.loadAuditSuccess({ audits })),
                    catchError(error => of(AuditActions.loadAuditFailure({ error: error.error })))
                )
            )
        )
    );

    addAudit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuditActions.addAudit),
            switchMap(action =>
                this.apiService.savePatientAudit(action.audit).pipe(
                    map(() => {
                        ToastConfig.ADD_SUCCESS();
                        return AuditActions.addAuditSuccess({ audit: [action.audit] });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(AuditActions.addAuditFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    updateAudit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuditActions.updateAudit),
            switchMap(action =>
                this.apiService.savePatientAudit(action.audit).pipe(
                    map(() => {
                        ToastConfig.EDIT_SUCCESS();
                        return AuditActions.updateAuditSuccess({ audit: [action.audit] });
                    }),
                    catchError(error => {
                        ToastConfig.EDIT_FAILURE();
                        return of(AuditActions.updateAuditFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    loadAuditContactNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuditActions.LoadContactNotes),
            switchMap(({ patientId, refId }) =>
                this.apiService.getPatientAuditContactNotes(patientId, refId).pipe(
                    map(notes => AuditActions.LoadContactNotesSuccess({ notes })),
                    catchError(error => of(AuditActions.LoadContactNotesFailure({ error: error.error })))
                )
            )
        )
    );

    addContactNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuditActions.AddContactNote),
            switchMap(action =>
                this.apiService.addAuditNote(action.note).pipe(
                    map(note => AuditActions.AddContactNoteSuccess({ note: action.note })),
                    catchError(error => of(AuditActions.AddContactNoteFailure({ error: error.error })))
                )
            )
        )
    );

    addContactNoteSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuditActions.AddContactNoteSuccess),
            tap(() => {
                ToastConfig.ADD_SUCCESS();
            }),
            map(({ note }) =>
                AuditActions.LoadContactNotes({
                    patientId: note.entityID,
                    refId: note.refId,
                })
            )
        )
    );

    addContactNoteFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuditActions.AddContactNoteFailure),
            tap(() => {
                ToastConfig.ADD_FAILURE();
            }),
            map(() => AuditActions.refresh())
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuditActions.addAuditSuccess, AuditActions.DeleteAuditSuccess),
            map(() => AuditActions.refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
