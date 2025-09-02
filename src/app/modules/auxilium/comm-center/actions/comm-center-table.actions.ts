import { createAction, props } from '@ngrx/store';
import {
    Email,
    GetCompletedEmailsResponse,
    GetDeletedEmailsResponse,
    GetEmailsByOwnerResponse,
    GetEmailsBySourceResponse,
    GetEmailsResponse,
    GetOwnersResponse,
} from 'app/shared/interfaces/auxilium/comm-center/api-responses.interface';

const LoadOwners = createAction('[CommCenter Table/API] Load Owners');
const LoadOwnersSuccess = createAction(
    '[CommCenter Table/API] Load Owners Success',
    props<{ owners: GetOwnersResponse }>()
);
const LoadOwnersFailure = createAction('[CommCenter Table/API] Load Owners Failure', props<{ error: Error }>());

const LoadEmails = createAction('[CommCenter Table/API] Load Emails', props<{ days: number }>());
const LoadEmailsSuccess = createAction(
    '[CommCenter Table/API] Load Emails Success',
    props<{ emails: GetEmailsResponse }>()
);
const LoadEmailsFailure = createAction('[CommCenter Table/API] Load Emails Failure', props<{ error: Error }>());

const LoadEmailsByOwner = createAction('[CommCenter Table/API] Load Emails By Owner');
const LoadEmailsByOwnerSuccess = createAction(
    '[CommCenter Table/API] Load Emails By Owner Success',
    props<{ emails: GetEmailsByOwnerResponse }>()
);
const LoadEmailsByOwnerFailure = createAction(
    '[CommCenter Table/API] Load Emails By Owner Failure',
    props<{ error: Error }>()
);

const LoadCompletedEmails = createAction('[CommCenter Table/API] Load Completed Emails');
const LoadCompletedEmailsSuccess = createAction(
    '[CommCenter Table/API] Load Completed Emails Success',
    props<{ emails: GetCompletedEmailsResponse }>()
);
const LoadCompletedEmailsFailure = createAction(
    '[CommCenter Table/API] Load Completed Emails Failure',
    props<{ error: Error }>()
);

const LoadDeletedEmails = createAction('[CommCenter Table/API] Load Deleted Emails');
const LoadDeletedEmailsSuccess = createAction(
    '[CommCenter Table/API] Load Deleted Emails Success',
    props<{ emails: GetDeletedEmailsResponse }>()
);
const LoadDeletedEmailsFailure = createAction(
    '[CommCenter Table/API] Load Deleted Emails Failure',
    props<{ error: Error }>()
);

const LoadMyEmails = createAction('[CommCenter Table/API] Load My Emails');
const LoadMyEmailsSuccess = createAction(
    '[CommCenter Table/API] Load My Emails Success',
    props<{ emails: GetEmailsByOwnerResponse }>()
);
const LoadMyEmailsFailure = createAction('[CommCenter Table/API] Load My Emails Failure', props<{ error: Error }>());

const LoadEmailsBySource = createAction('[CommCenter Table/API] Load Emails by Source', props<{ source: string }>());
const LoadEmailsBySourceSuccess = createAction(
    '[CommCenter Table/API] Load Emails by Source Success',
    props<{ emails: GetEmailsBySourceResponse }>()
);
const LoadEmailsBySourceFailure = createAction(
    '[CommCenter Table/API] Load Emails by Source Failure',
    props<{ error: Error }>()
);

const LoadCommDocument = createAction('[CommCenter Table/API] Load Comm Document', props<{ emailId: Email['id'] }>());
const LoadCommDocumentSuccess = createAction(
    '[CommCenter Table/API] Load Comm Document Success',
    props<{ document: Blob }>()
);
const LoadCommDocumentFailure = createAction(
    '[CommCenter Table/API] Load Comm Document Failure',
    props<{ error: Error }>()
);

const MarkMailAsComplete = createAction(
    '[CommCenter Table/API] Mark Mail As Complete',
    props<{ emailId: Email['id'] }>()
);
const MarkMailAsCompleteSuccess = createAction('[CommCenter Table/API] Mark Mail As Complete Success');
const MarkMailAsCompleteFailure = createAction(
    '[CommCenter Table/API] Mark Mail As Complete Failure',
    props<{ error: Error }>()
);

const MarkMailsAsComplete = createAction(
    '[CommCenter Table/API] Mark Mails As Complete',
    props<{ emaildata: Email['id'][] }>()
);
const MarkMailsAsCompleteSuccess = createAction('[CommCenter Table/API] Mark Mails As Complete Success');
const MarkMailsAsCompleteFailure = createAction(
    '[CommCenter Table/API] Mark Mails As Complete Failure',
    props<{ error: Error }>()
);

const DeleteMail = createAction('[CommCenter Table/API] Delete Mail', props<{ emailId: Email['id'] }>());
const DeleteMailSuccess = createAction('[CommCenter Table/API] Delete Mail Success');
const DeleteMailFailure = createAction('[CommCenter Table/API] Delete Mail Failure', props<{ error: Error }>());

const DeleteMails = createAction('[CommCenter Table/API] Delete Mails', props<{ emaildata: Email['id'][] }>());
const DeleteMailsSuccess = createAction('[CommCenter Table/API] Delete Mails Success');
const DeleteMailsFailure = createAction('[CommCenter Table/API] Delete Mails Failure', props<{ error: Error }>());

const ReopenCompletedEmail = createAction(
    '[CommCenter Table/API] Reopen Completed Email',
    props<{ emailId: Email['id'] }>()
);
const ReopenCompletedEmailSuccess = createAction('[CommCenter Table/API] Reopen Completed Email Success');
const ReopenCompletedEmailFailure = createAction(
    '[CommCenter Table/API] Reopen Completed Email Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[CommCenter Table/API] Refresh');

export const CommCenterTableActions = {
    LoadOwners,
    LoadOwnersSuccess,
    LoadOwnersFailure,
    LoadCompletedEmails,
    LoadCompletedEmailsSuccess,
    LoadCompletedEmailsFailure,
    LoadDeletedEmails,
    LoadDeletedEmailsSuccess,
    LoadDeletedEmailsFailure,
    LoadEmails,
    LoadEmailsSuccess,
    LoadEmailsFailure,
    LoadEmailsByOwner,
    LoadEmailsByOwnerSuccess,
    LoadEmailsByOwnerFailure,
    LoadMyEmails,
    LoadMyEmailsSuccess,
    LoadMyEmailsFailure,
    LoadEmailsBySource,
    LoadEmailsBySourceSuccess,
    LoadEmailsBySourceFailure,
    LoadCommDocument,
    LoadCommDocumentSuccess,
    LoadCommDocumentFailure,
    MarkMailAsComplete,
    MarkMailAsCompleteSuccess,
    MarkMailAsCompleteFailure,
    MarkMailsAsComplete,
    MarkMailsAsCompleteSuccess,
    MarkMailsAsCompleteFailure,
    DeleteMail,
    DeleteMailSuccess,
    DeleteMailFailure,
    DeleteMails,
    DeleteMailsSuccess,
    DeleteMailsFailure,
    ReopenCompletedEmail,
    ReopenCompletedEmailSuccess,
    ReopenCompletedEmailFailure,
    Refresh,
};
