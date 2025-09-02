import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { CommCenterEmailActions } from '../actions/comm-center-email.actions';
import { CommCenterEmailSelectors } from '../reducers';

@Injectable({
    providedIn: 'root',
})
export class CommCenterEmailEffects {
    loadEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.LoadEmail),
            switchMap(action =>
                this.apiService.getEmail(action.emailId).pipe(
                    map(email => CommCenterEmailActions.LoadEmailSuccess({ email })),
                    catchError(error => of(CommCenterEmailActions.LoadEmailFailure({ error: error.error })))
                )
            )
        )
    );

    loadOwners$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.LoadOwners),
            switchMap(action =>
                this.apiService.getOwners().pipe(
                    map(owners => CommCenterEmailActions.LoadOwnersSuccess({ owners })),
                    catchError(error => of(CommCenterEmailActions.LoadOwnersFailure({ error: error.error })))
                )
            )
        )
    );

    loadNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.LoadNotes),
            switchMap(action =>
                this.apiService.getNotes(action.emailId).pipe(
                    map(notes => CommCenterEmailActions.LoadNotesSuccess({ notes })),
                    catchError(error => of(CommCenterEmailActions.LoadNotesFailure({ error: error.error })))
                )
            )
        )
    );

    addNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.AddNote),
            switchMap(action =>
                this.apiService.addNote(action.note).pipe(
                    tap(e => console.log('')),
                    map(note => CommCenterEmailActions.AddNoteSuccess({ note })),
                    catchError(error => of(CommCenterEmailActions.AddNoteFailure({ error: error.error })))
                )
            )
        )
    );

    loadCommDocument$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.LoadCommDocument),
            switchMap(action =>
                this.apiService.getDocument(action.attachmentId).pipe(
                    map(document => {
                        if (!action.isPreviewOnly) {
                            return CommCenterEmailActions.LoadCommDocumentSuccess({
                                document,
                                isPreviewOnly: action.isPreviewOnly,
                                attachMentName: action.attachMentName,
                            });
                        }
                        return CommCenterEmailActions.SetPreviewUrl({ url: URL.createObjectURL(document) });
                    }),
                    catchError(error => of(CommCenterEmailActions.LoadCommDocumentFailure({ error: error.error })))
                )
            )
        )
    );

    loadAudio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.PlayAudioAttachment),
            withLatestFrom(this.store.select(CommCenterEmailSelectors.selectAudioPlaying)),
            switchMap(([action, playing]) => {
                if (playing) {
                    return of(CommCenterEmailActions.StopAudioAttachment());
                }
                return this.apiService.getDocument(action.attachmentId).pipe(
                    map(document => CommCenterEmailActions.PlayAudioAttachmentSuccess({ data: document })),
                    catchError(error => of(CommCenterEmailActions.PlayAudioAttachmentFailure({ error: error.error })))
                );
            })
        )
    );

    loadAttachments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.LoadAttachments),
            switchMap(action =>
                this.apiService.getAttachments(action.emailId).pipe(
                    map(attachments => CommCenterEmailActions.LoadAttachmentsSuccess({ attachments })),
                    catchError(error => of(CommCenterEmailActions.LoadAttachmentsFailure({ error: error.error })))
                )
            )
        )
    );

    updateLabel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.UpdateLabel),
            switchMap(action =>
                this.apiService.updateLabel(action.emailId, action.label).pipe(
                    map(update => CommCenterEmailActions.UpdateLabelSuccess({ update })),
                    catchError(error => of(CommCenterEmailActions.UpdateLabelFailure({ error: error.error })))
                )
            )
        )
    );

    updateOwner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.UpdateOwner),
            switchMap(action =>
                this.apiService.updateOwner(action.emailId, action.owner).pipe(
                    map(update => CommCenterEmailActions.UpdateOwnerSuccess({ update })),
                    catchError(error => of(CommCenterEmailActions.UpdateOwnerFailure({ error: error.error })))
                )
            )
        )
    );

    updateByEditGroup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.UpdateEmailGroupEdit),
            switchMap(({ emailEditGroup }) => {
                return this.apiService.emailGroupEdit(emailEditGroup).pipe(
                    map(update => CommCenterEmailActions.UpdateEmailGroupEditSuccess()),
                    catchError(error => of(CommCenterEmailActions.UpdateEmailGroupEditFailure({ error: error.error })))
                );
            })
        )
    );

    loadTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.LoadTags),
            switchMap(action =>
                this.apiService.getTags(action.emailId).pipe(
                    map(tags => CommCenterEmailActions.LoadTagsSuccess({ tags })),
                    catchError(error => of(CommCenterEmailActions.LoadTagsFailure({ error: error.error })))
                )
            )
        )
    );

    addTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.AddTag),
            switchMap(action =>
                this.apiService.addTag(action.emailId, action.tag).pipe(
                    map(attachments => CommCenterEmailActions.AddTagSuccess()),
                    catchError(error => of(CommCenterEmailActions.AddTagFailure({ error: error.error })))
                )
            )
        )
    );

    faxIntoPatientRecord$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.PatientFaxIntoPatientRecord),
            switchMap(action =>
                this.apiService.faxIntoPatientRecord(action.contactInfo).pipe(
                    map(patient => {
                        ToastConfig.ADD_SUCCESS();
                        this.location.back();
                        return CommCenterEmailActions.PatientFaxIntoPatientRecordSuccess({ patient });
                    }),
                    catchError(error =>
                        of(CommCenterEmailActions.PatientFaxIntoPatientRecordFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    deleteTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.DeleteTag),
            switchMap(action =>
                this.apiService.deleteTag(action.emailId, action.tag).pipe(
                    map(attachments => CommCenterEmailActions.DeleteTagSuccess()),
                    catchError(error => of(CommCenterEmailActions.DeleteTagFailure({ error: error.error })))
                )
            )
        )
    );

    searchPatient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterEmailActions.PatientSearch),
            switchMap(action =>
                this.apiService.patientSearch(action.patientSearch).pipe(
                    map(patient => {
                        if (Array.isArray(patient) && !patient.length) {
                            ToastConfig.CUSTOM_FAILURE('patientNotFound');
                        }
                        return CommCenterEmailActions.PatientSearchSuccess({ patient });
                    }),
                    catchError(error => of(CommCenterEmailActions.PatientSearchFailure({ error: error.error })))
                )
            )
        )
    );

    openDocumentInTab$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CommCenterEmailActions.LoadCommDocumentSuccess),
                tap(action => {
                    if (action.isPreviewOnly === undefined) {
                        const fileUrl = URL?.createObjectURL(action.document);
                        window?.open(fileUrl, '_blank');
                    } else {
                        const fileUrl = URL?.createObjectURL(action.document);
                        const el = document.createElement('a');
                        el.download = action.attachMentName;
                        el.href = fileUrl;
                        el.target = '_blank';
                        el.click();
                    }
                })
            ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store: Store,
        private location: Location
    ) {}
}
