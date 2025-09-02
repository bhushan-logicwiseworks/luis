import { createReducer, on } from '@ngrx/store';
import {
    GetCompletedEmailsResponse,
    GetDeletedEmailsResponse,
    GetEmailsByOwnerResponse,
    GetEmailsBySourceResponse,
    GetEmailsResponse,
    GetOwnersResponse,
} from 'app/shared/interfaces/auxilium/comm-center/api-responses.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { CommCenterTableActions } from '../actions/comm-center-table.actions';

export const featureKey = 'comm-center-table';

export interface State extends LoadingState {
    emails: GetEmailsResponse;
    emailsByOwner: GetEmailsByOwnerResponse;
    completedEmails: GetCompletedEmailsResponse;
    deletedEmails: GetDeletedEmailsResponse;
    myEmails: GetEmailsByOwnerResponse;
    emailsBySource: GetEmailsBySourceResponse;
    owners: GetOwnersResponse;
}

interface IdEntity {
    id: number;
}

const initialState: State = {
    loading: false,
    error: null,
    emails: [],
    emailsByOwner: [],
    completedEmails: [],
    deletedEmails: [],
    myEmails: [],
    emailsBySource: [],
    owners: [],
};

export const reducer = createReducer(
    initialState,
    on(CommCenterTableActions.LoadEmails, state => ({ ...initialState, loading: true })),
    on(CommCenterTableActions.LoadEmailsSuccess, (state, { emails }) => ({ ...state, loading: false, emails })),
    on(CommCenterTableActions.LoadEmailsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterTableActions.LoadEmailsByOwner, state => ({ ...state, loading: true })),
    on(CommCenterTableActions.LoadEmailsByOwnerSuccess, (state, { emails }) => ({
        ...state,
        loading: false,
        emailsByOwner: emails,
    })),
    on(CommCenterTableActions.LoadEmailsByOwnerFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterTableActions.LoadEmailsBySource, state => ({ ...state, loading: true })),
    on(CommCenterTableActions.LoadEmailsBySourceSuccess, (state, { emails }) => ({
        ...state,
        loading: false,
        emailsBySource: emails,
    })),
    on(CommCenterTableActions.LoadEmailsBySourceFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterTableActions.LoadMyEmails, state => ({ ...state, loading: true })),
    on(CommCenterTableActions.LoadMyEmailsSuccess, (state, { emails }) => ({
        ...state,
        loading: false,
        myEmails: emails,
    })),
    on(CommCenterTableActions.LoadMyEmailsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterTableActions.LoadOwners, state => ({ ...state, loading: true })),
    on(CommCenterTableActions.LoadOwnersSuccess, (state, { owners }) => ({ ...state, loading: false, owners })),
    on(CommCenterTableActions.LoadOwnersFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterTableActions.LoadCompletedEmails, state => ({ ...state, loading: true })),
    on(CommCenterTableActions.LoadCompletedEmailsSuccess, (state, { emails }) => ({
        ...state,
        loading: false,
        completedEmails: emails,
    })),
    on(CommCenterTableActions.LoadCompletedEmailsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterTableActions.LoadDeletedEmails, state => ({ ...state, loading: true })),
    on(CommCenterTableActions.LoadDeletedEmailsSuccess, (state, { emails }) => ({
        ...state,
        loading: false,
        deletedEmails: emails,
    })),
    on(CommCenterTableActions.LoadDeletedEmailsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterTableActions.LoadCommDocument, state => ({ ...state, loading: true })),
    on(CommCenterTableActions.LoadCommDocumentSuccess, state => ({ ...state, loading: false })),
    on(CommCenterTableActions.LoadCommDocumentFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterTableActions.MarkMailAsComplete, state => ({ ...state, loading: true })),
    on(CommCenterTableActions.MarkMailAsCompleteSuccess, state => ({ ...state, loading: false })),
    on(CommCenterTableActions.MarkMailAsCompleteFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterTableActions.MarkMailsAsComplete, state => ({ ...state, loading: true })),
    on(CommCenterTableActions.MarkMailsAsCompleteSuccess, state => ({ ...state, loading: false })),
    on(CommCenterTableActions.MarkMailsAsCompleteFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterTableActions.DeleteMail, state => ({ ...state, loading: true })),
    on(CommCenterTableActions.DeleteMailSuccess, state => ({ ...state, loading: false })),
    on(CommCenterTableActions.DeleteMailFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterTableActions.DeleteMails, state => ({ ...state, loading: true })),
    on(CommCenterTableActions.DeleteMailsSuccess, state => ({ ...state, loading: false })),
    on(CommCenterTableActions.DeleteMailsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterTableActions.ReopenCompletedEmail, state => ({ ...state, loading: true })),
    on(CommCenterTableActions.ReopenCompletedEmailSuccess, state => ({ ...state, loading: false })),
    on(CommCenterTableActions.ReopenCompletedEmailFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectEmails = (state: State) => state.emails;
export const selectEmailsByOwner = (state: State) => state.emailsByOwner;
export const selectCompletedEmails = (state: State) => state.completedEmails;
export const selectDeletedEmails = (state: State) => state.deletedEmails;
export const selectMyEmails = (state: State) => state.myEmails;
export const selectEmailsBySource = (state: State) => state.emailsBySource;
export const selectOwners = (state: State) => state.owners;
