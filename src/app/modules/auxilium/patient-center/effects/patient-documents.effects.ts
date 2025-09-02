import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { ApiService } from 'app/core/services/api.service';
import { base64ToArrayBuffer } from 'app/shared/utils/base64ToArrayBuffer';
import { PatientDocumentsActions } from '../actions/patient-documents.actions';

@Injectable({
    providedIn: 'root',
})
export class PatientDocumentsEffects {
    loadDocuments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDocumentsActions.LoadDocuments),
            switchMap(action =>
                this.apiService.getPatientDocuments(action.patientId).pipe(
                    map(documents => PatientDocumentsActions.LoadDocumentsSuccess({ documents })),
                    catchError(error => of(PatientDocumentsActions.LoadDocumentsFailure({ error: error.error })))
                )
            )
        )
    );

    loadDocument$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDocumentsActions.LoadDocument),
            switchMap(action =>
                this.apiService.viewPatientDocument(action.id).pipe(
                    map(document => PatientDocumentsActions.LoadDocumentSuccess({ document })),
                    catchError(error => of(PatientDocumentsActions.LoadDocumentFailure({ error: error.error })))
                )
            )
        )
    );

    previewdocument$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDocumentsActions.SetPreviewUrl),
            switchMap(action =>
                this.apiService.viewPatientDocument(action.id).pipe(
                    map(document => PatientDocumentsActions.SetPreviewUrlSuccess({ document })),
                    catchError(error => of(PatientDocumentsActions.SetPreviewUrlFailure({ error: error.error })))
                )
            )
        )
    );

    DocumentUpload$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDocumentsActions.AddDocument),
            switchMap(action =>
                this.apiService.patientUploadDocument(action.document).pipe(
                    map(document => PatientDocumentsActions.AddDocumentSuccess({ document })),
                    catchError(error => of(PatientDocumentsActions.AddDocumentFailure({ error: error.error })))
                )
            )
        )
    );

    DocumentSave$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDocumentsActions.DocumentSave),
            switchMap(action =>
                this.apiService.patientUpdateDocument(action.document).pipe(
                    map(document => PatientDocumentsActions.DocumentSaveSuccess({ document })),
                    catchError(error => of(PatientDocumentsActions.DocumentSaveFailure({ error: error.error })))
                )
            )
        )
    );

    openDocumentInTab$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PatientDocumentsActions.LoadDocumentSuccess),
                tap(action => {
                    const arrBuffer = base64ToArrayBuffer(action.document[0].fileBlob);
                    const blob = new Blob([arrBuffer], { type: 'application/pdf' });
                    const fileUrl = URL?.createObjectURL(blob);
                    const el = document.createElement('a');
                    el.href = fileUrl;
                    el.target = '_blank';
                    el.click();
                })
            ),
        { dispatch: false }
    );

    openDocument$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PatientDocumentsActions.SetPreviewUrlSuccess),
                tap(action => {
                    const arrBuffer = base64ToArrayBuffer(action.document[0].fileBlob);
                    const blob = new Blob([arrBuffer], { type: 'application/pdf' });
                    const fileUrl = URL?.createObjectURL(blob);
                    const el = document.createElement('a');
                    el.href = fileUrl;
                    el.target = '_blank';
                })
            ),
        { dispatch: false }
    );

    deleteDocument$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDocumentsActions.DeletePatientDocument),
            switchMap(action =>
                this.apiService.deletePatientDocument(action.id).pipe(
                    map(documentReps => PatientDocumentsActions.DeletePatientDocumentSuccess()),
                    catchError(error =>
                        of(PatientDocumentsActions.DeletePatientDocumentFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PatientDocumentsActions.AddDocumentSuccess,
                PatientDocumentsActions.DocumentSaveSuccess,
                PatientDocumentsActions.DeletePatientDocumentSuccess
            ),
            map(() => PatientDocumentsActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
