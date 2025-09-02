import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ContactNote } from 'app/shared/interfaces/auxilium/patient-center/patient-compliance-notes.interface';
import { Compliance } from 'app/shared/interfaces/auxilium/patient-center/patient-compliance.interface';
import { ComplianceActions } from '../actions/patient-compliance.action';

export const complianceFeatureKey = 'patient-compliance';

export interface State extends LoadingState {
    compliances: Compliance[];
    contactNotes: ContactNote[];
}

const initialState: State = {
    loading: false,
    error: null,
    compliances: [],
    contactNotes: [],
};

export const reducer = createReducer(
    initialState,
    on(ComplianceActions.loadCompliance, state => ({ ...state, loading: true, compliances: [] })),
    on(ComplianceActions.loadComplianceSuccess, (state, { compliances }) => ({
        ...state,
        loading: false,
        compliances,
    })),
    on(ComplianceActions.loadComplianceFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ComplianceActions.addCompliance, state => ({ ...state, loading: true })),
    on(ComplianceActions.addComplianceSuccess, state => ({ ...state, loading: false })),
    on(ComplianceActions.addComplianceFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ComplianceActions.updateCompliance, state => ({ ...state, loading: true })),
    on(ComplianceActions.updateComplianceSuccess, (state, { compliance }) => ({
        ...state,
        compliances: state.compliances.map(c => (c.id === compliance[0].id ? compliance[0] : c)),
        loading: false,
        error: null,
    })),
    on(ComplianceActions.updateComplianceFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ComplianceActions.LoadContactNotes, state => ({ ...state, contactNotes: [], loading: true })),
    on(ComplianceActions.LoadContactNotesSuccess, (state, { notes }) => ({
        ...state,
        contactNotes: notes,
        loading: false,
    })),
    on(ComplianceActions.LoadContactNotesFailure, (state, { error }) => ({
        ...state,
        contactNotes: [],
        loading: false,
        error,
    })),

    on(ComplianceActions.AddContactNote, state => ({ ...state, contactNotesLoading: true, contactNotesError: null })),
    on(ComplianceActions.AddContactNoteSuccess, (state, { note }) => ({
        ...state,
        contactNotes: [...state.contactNotes, note],
        contactNotesLoading: false,
        contactNotesError: null,
    })),
    on(ComplianceActions.AddContactNoteFailure, (state, { error }) => ({
        ...state,
        contactNotesLoading: false,
        contactNotesError: error,
    })),

    on(ComplianceActions.DeleteCompliance, state => ({ ...state, loading: true })),
    on(ComplianceActions.DeleteComplianceSuccess, state => ({ ...state, loading: false })),
    on(ComplianceActions.DeleteComplianceFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(ComplianceActions.LoadContactNotes, state => ({ ...state, contactNotes: [], loading: true })),
    on(ComplianceActions.LoadContactNotesSuccess, (state, { notes }) => ({
        ...state,
        contactNotes: notes,
        loading: false,
    })),
    on(ComplianceActions.LoadContactNotesFailure, (state, { error }) => ({
        ...state,
        contactNotes: [],
        loading: false,
        error,
    })),

    on(ComplianceActions.ResetState, () => initialState)
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectCompliances = (state: State) => state.compliances;
export const selectContactNotes = (state: State) => state.contactNotes;
