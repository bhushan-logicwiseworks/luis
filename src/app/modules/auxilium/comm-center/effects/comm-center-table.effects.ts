import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { CommCenterCreateActions } from '../actions/comm-center-create.actions';
import { CommCenterEmailActions } from '../actions/comm-center-email.actions';
import { CommCenterTableActions } from '../actions/comm-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class CommCenterTableEffects {
    loadOwners$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.LoadOwners),
            switchMap(action =>
                this.apiService.getOwners().pipe(
                    map(owners => CommCenterTableActions.LoadOwnersSuccess({ owners })),
                    catchError(error => of(CommCenterTableActions.LoadOwnersFailure({ error: error.error })))
                )
            )
        )
    );

    loadEmails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.LoadEmails),
            switchMap(action =>
                this.apiService.getEmails(action.days).pipe(
                    //tap(e => console.log(e, 'luis')),
                    map(emails => CommCenterTableActions.LoadEmailsSuccess({ emails })),
                    catchError(error => of(CommCenterTableActions.LoadEmailsFailure({ error: error.error })))
                )
            )
        )
    );

    loadEmailsByOwner$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.LoadEmailsByOwner),
            switchMap(action =>
                this.apiService.getEmailsByOwner().pipe(
                    map(emails => CommCenterTableActions.LoadEmailsByOwnerSuccess({ emails })),
                    catchError(error => of(CommCenterTableActions.LoadEmailsByOwnerFailure({ error: error.error })))
                )
            )
        )
    );

    loadCompletedEmails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.LoadCompletedEmails),
            switchMap(action =>
                this.apiService.getCompletedEmails().pipe(
                    map(emails => CommCenterTableActions.LoadCompletedEmailsSuccess({ emails })),
                    catchError(error => of(CommCenterTableActions.LoadCompletedEmailsFailure({ error: error.error })))
                )
            )
        )
    );

    loadDeletedEmails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.LoadDeletedEmails),
            switchMap(action =>
                this.apiService.getDeletedEmails().pipe(
                    map(emails => CommCenterTableActions.LoadDeletedEmailsSuccess({ emails })),
                    catchError(error => of(CommCenterTableActions.LoadDeletedEmailsFailure({ error: error.error })))
                )
            )
        )
    );

    loadMyEmails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.LoadMyEmails),
            switchMap(action =>
                this.apiService.getMyEmails().pipe(
                    map(emails => CommCenterTableActions.LoadMyEmailsSuccess({ emails })),
                    catchError(error => of(CommCenterTableActions.LoadMyEmailsFailure({ error: error.error })))
                )
            )
        )
    );

    loadEmailsBySource$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.LoadEmailsBySource),
            switchMap(action =>
                this.apiService.getEmailsBySource(action.source).pipe(
                    map(emails => CommCenterTableActions.LoadEmailsBySourceSuccess({ emails })),
                    catchError(error => of(CommCenterTableActions.LoadEmailsBySourceFailure({ error: error.error })))
                )
            )
        )
    );

    loadCommDocument$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.LoadCommDocument),
            switchMap(action =>
                this.apiService.getDocument(action.emailId).pipe(
                    map(document => CommCenterTableActions.LoadCommDocumentSuccess({ document })),
                    catchError(error => of(CommCenterTableActions.LoadCommDocumentFailure({ error: error.error })))
                )
            )
        )
    );

    markMailAsComplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.MarkMailAsComplete),
            switchMap(action =>
                this.apiService.markMailAsComplete(action.emailId).pipe(
                    map(() => CommCenterTableActions.MarkMailAsCompleteSuccess()),
                    catchError(error => of(CommCenterTableActions.MarkMailAsCompleteFailure({ error: error.error })))
                )
            )
        )
    );

    deleteMail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.DeleteMail),
            switchMap(action =>
                this.apiService.deleteMail(action.emailId).pipe(
                    tap(e => console.log('')),
                    map(() => CommCenterTableActions.DeleteMailSuccess()),
                    catchError(error => of(CommCenterTableActions.DeleteMailFailure({ error: error.error })))
                )
            )
        )
    );

    deleteMails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.DeleteMails),
            switchMap(action =>
                this.apiService.deleteMails(action.emaildata).pipe(
                    map(() => CommCenterTableActions.DeleteMailSuccess()),
                    catchError(error => of(CommCenterTableActions.DeleteMailFailure({ error: error.error })))
                )
            )
        )
    );

    markMailsAsComplete$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.MarkMailsAsComplete),
            switchMap(action =>
                this.apiService.markMailsAsComplete(action.emaildata).pipe(
                    map(() => CommCenterTableActions.MarkMailAsCompleteSuccess()),
                    catchError(error => of(CommCenterTableActions.MarkMailAsCompleteFailure({ error: error.error })))
                )
            )
        )
    );

    reopenCompletedEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterTableActions.ReopenCompletedEmail),
            switchMap(action =>
                this.apiService.reopenCompletedEmail(action.emailId).pipe(
                    tap(() => {
                        ToastConfig.ADD_SUCCESS();
                    }),
                    map(() => CommCenterTableActions.ReopenCompletedEmailSuccess()),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();

                        return of(CommCenterTableActions.ReopenCompletedEmailFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    createEmailSuccessNotification$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CommCenterCreateActions.CreateEmailSuccess),
                tap(() => {
                    ToastConfig.ADD_SUCCESS();
                })
            ),
        { dispatch: false }
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                CommCenterTableActions.MarkMailAsCompleteSuccess,
                CommCenterTableActions.DeleteMailSuccess,
                CommCenterCreateActions.CreateEmailSuccess,
                CommCenterEmailActions.UpdateEmailGroupEditSuccess,
                CommCenterTableActions.ReopenCompletedEmailSuccess
            ),
            map(() => CommCenterTableActions.Refresh())
        )
    );

    openDocumentInTab$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(CommCenterTableActions.LoadCommDocumentSuccess),
                tap(action => {
                    const fileUrl = URL?.createObjectURL(action.document);
                    window?.open(fileUrl, '_blank');
                })
            ),
        { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
