import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { EventTrackingEmailActions } from '../actions/event-tracking-email.actions';
import { EventTrackingEmailSelectors } from '../reducers';

@Injectable({
    providedIn: 'root',
})
export class EventTrackingEmailEffects {
    loadEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.LoadEmail),
            switchMap(action =>
                this.apiService.getEmail(action.emailId).pipe(
                    map(email => EventTrackingEmailActions.LoadEmailSuccess({ email })),
                    catchError(error => of(EventTrackingEmailActions.LoadEmailFailure({ error: error.error })))
                )
            )
        )
    );

    loadOwners$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.LoadOwners),
            switchMap(action =>
                this.apiService.getOwners().pipe(
                    map(owners => EventTrackingEmailActions.LoadOwnersSuccess({ owners })),
                    catchError(error => of(EventTrackingEmailActions.LoadOwnersFailure({ error: error.error })))
                )
            )
        )
    );

    loadNotes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.LoadNotes),
            switchMap(action =>
                this.apiService.getNotes(action.emailId).pipe(
                    map(notes => EventTrackingEmailActions.LoadNotesSuccess({ notes })),
                    catchError(error => of(EventTrackingEmailActions.LoadNotesFailure({ error: error.error })))
                )
            )
        )
    );

    addNote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.AddNote),
            switchMap(action =>
                this.apiService.addNote(action.note).pipe(
                    tap(e => console.log('')),
                    map(note => EventTrackingEmailActions.AddNoteSuccess({ note })),
                    catchError(error => of(EventTrackingEmailActions.AddNoteFailure({ error: error.error })))
                )
            )
        )
    );

    loadCommDocument$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.LoadCommDocument),
            switchMap(action =>
                this.apiService.getDocument(action.attachmentId).pipe(
                    map(document => {
                        if (!action.isPreviewOnly) {
                            return EventTrackingEmailActions.LoadCommDocumentSuccess({
                                document,
                                isPreviewOnly: action.isPreviewOnly,
                                attachMentName: action.attachMentName,
                            });
                        }
                        return EventTrackingEmailActions.SetPreviewUrl({ url: URL.createObjectURL(document) });
                    }),
                    catchError(error => of(EventTrackingEmailActions.LoadCommDocumentFailure({ error: error.error })))
                )
            )
        )
    );

    loadAudio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.PlayAudioAttachment),
            withLatestFrom(this.store.select(EventTrackingEmailSelectors.selectAudioPlaying)),
            switchMap(([action, playing]) => {
                if (playing) {
                    return of(EventTrackingEmailActions.StopAudioAttachment());
                }
                return this.apiService.getDocument(action.attachmentId).pipe(
                    map(document => EventTrackingEmailActions.PlayAudioAttachmentSuccess({ data: document })),
                    catchError(error =>
                        of(EventTrackingEmailActions.PlayAudioAttachmentFailure({ error: error.error }))
                    )
                );
            })
        )
    );

    loadAttachments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.LoadAttachments),
            switchMap(action =>
                this.apiService.getAttachments(action.emailId).pipe(
                    map(attachments => EventTrackingEmailActions.LoadAttachmentsSuccess({ attachments })),
                    catchError(error => of(EventTrackingEmailActions.LoadAttachmentsFailure({ error: error.error })))
                )
            )
        )
    );

    updateLabel$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.UpdateLabel),
            switchMap(action =>
                this.apiService.updateLabel(action.emailId, action.label).pipe(
                    map(update => EventTrackingEmailActions.UpdateLabelSuccess({ update })),
                    catchError(error => of(EventTrackingEmailActions.UpdateLabelFailure({ error: error.error })))
                )
            )
        )
    );

    updateOwner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.UpdateOwner),
            switchMap(action =>
                this.apiService.updateOwner(action.emailId, action.owner).pipe(
                    map(update => EventTrackingEmailActions.UpdateOwnerSuccess({ update })),
                    catchError(error => of(EventTrackingEmailActions.UpdateOwnerFailure({ error: error.error })))
                )
            )
        )
    );

    loadTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.LoadTags),
            switchMap(action =>
                this.apiService.getTags(action.emailId).pipe(
                    map(tags => EventTrackingEmailActions.LoadTagsSuccess({ tags })),
                    catchError(error => of(EventTrackingEmailActions.LoadTagsFailure({ error: error.error })))
                )
            )
        )
    );

    addTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.AddTag),
            switchMap(action =>
                this.apiService.addTag(action.emailId, action.tag).pipe(
                    map(attachments => EventTrackingEmailActions.AddTagSuccess()),
                    catchError(error => of(EventTrackingEmailActions.AddTagFailure({ error: error.error })))
                )
            )
        )
    );

    faxIntoPatientRecord$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.PatientFaxIntoPatientRecord),
            switchMap(action =>
                this.apiService.faxIntoPatientRecord(action.contactInfo).pipe(
                    map(patient => {
                        ToastConfig.ADD_SUCCESS();
                        this.location.back();
                        return EventTrackingEmailActions.PatientFaxIntoPatientRecordSuccess({ patient });
                    }),
                    catchError(error =>
                        of(EventTrackingEmailActions.PatientFaxIntoPatientRecordFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    deleteTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.DeleteTag),
            switchMap(action =>
                this.apiService.deleteTag(action.emailId, action.tag).pipe(
                    map(attachments => EventTrackingEmailActions.DeleteTagSuccess()),
                    catchError(error => of(EventTrackingEmailActions.DeleteTagFailure({ error: error.error })))
                )
            )
        )
    );

    searchPatient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingEmailActions.PatientSearch),
            switchMap(action =>
                this.apiService.patientSearch(action.patientSearch).pipe(
                    map(patient => {
                        if (Array.isArray(patient) && !patient.length) {
                            ToastConfig.CUSTOM_FAILURE('patientNotFound');
                        }
                        return EventTrackingEmailActions.PatientSearchSuccess({ patient });
                    }),
                    catchError(error => of(EventTrackingEmailActions.PatientSearchFailure({ error: error.error })))
                )
            )
        )
    );

    openDocumentInTab$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(EventTrackingEmailActions.LoadCommDocumentSuccess),
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
