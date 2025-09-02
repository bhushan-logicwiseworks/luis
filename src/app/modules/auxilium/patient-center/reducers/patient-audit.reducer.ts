import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { Audit } from '../../../../shared/interfaces/auxilium/patient-center/patient-audit.interface';
import { ContactNote } from '../../../../shared/interfaces/auxilium/patient-center/patient-compliance-notes.interface';
import { AuditActions } from '../actions/patient-audit.action';

export const AuditFeatureKey = 'patient-audit';

export interface State extends LoadingState {
    audits: Audit[];
    contactNotes: ContactNote[];
}

const initialState: State = {
    loading: false,
    error: null,
    audits: [],
    contactNotes: [],
};

export const reducer = createReducer(
    initialState,
    on(AuditActions.loadAudit, state => ({ ...state, loading: true, audits: [] })),
    on(AuditActions.loadAuditSuccess, (state, { audits }) => ({
        ...state,
        loading: false,
        audits,
    })),
    on(AuditActions.loadAuditFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(AuditActions.addAudit, state => ({ ...state, loading: true })),
    on(AuditActions.addAuditSuccess, state => ({ ...state, loading: false })),
    on(AuditActions.addAuditFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(AuditActions.updateAudit, state => ({ ...state, loading: true })),
    on(AuditActions.updateAuditSuccess, (state, { audit }) => ({
        ...state,
        audits: state.audits.map(a => (a.id === audit[0].id ? audit[0] : a)),
        loading: false,
    })),
    on(AuditActions.updateAuditFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(AuditActions.LoadContactNotes, state => ({ ...state, contactNotes: [], loading: true })),
    on(AuditActions.LoadContactNotesSuccess, (state, { notes }) => ({
        ...state,
        contactNotes: notes,
        loading: false,
    })),
    on(AuditActions.LoadContactNotesFailure, (state, { error }) => ({
        ...state,
        contactNotes: [],
        loading: false,
        error,
    })),

    on(AuditActions.AddContactNote, state => ({ ...state, contactNotesLoading: true, contactNotesError: null })),
    on(AuditActions.AddContactNoteSuccess, (state, { note }) => ({
        ...state,
        contactNotes: [...state.contactNotes, note],
        contactNotesLoading: false,
        contactNotesError: null,
    })),
    on(AuditActions.AddContactNoteFailure, (state, { error }) => ({
        ...state,
        contactNotesLoading: false,
        contactNotesError: error,
    })),

    on(AuditActions.ResetState, () => initialState)
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectAudits = (state: State) => state.audits;
export const selectContactNotes = (state: State) => state.contactNotes;
