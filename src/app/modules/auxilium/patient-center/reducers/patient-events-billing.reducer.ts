import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ContactNote } from '../../../../shared/interfaces/auxilium/patient-center/patient-compliance-notes.interface';
import { PatientEventsBilling } from '../../../../shared/interfaces/auxilium/patient-center/patient-events-billing.interface';
import { PatientEventsBillingActions } from '../actions/patient-events-billing.action';

export const featureKey = 'patient-events-billing';

export interface State extends LoadingState {
    BillingEvents: PatientEventsBilling[];
    contactNotes: ContactNote[];
}

const initialState: State = {
    loading: false,
    error: null,
    BillingEvents: [],
    contactNotes: [],
};

export const reducer = createReducer(
    initialState,
    on(PatientEventsBillingActions.LoadPatientBillingEvents, state => ({ ...state, loading: true, BillingEvents: [] })),
    on(PatientEventsBillingActions.LoadPatientBillingEventsSuccess, (state, { BillingEvents }) => ({
        ...state,
        loading: false,
        BillingEvents,
    })),
    on(PatientEventsBillingActions.LoadPatientBillingEventsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientEventsBillingActions.LoadContactNotes, state => ({ ...state, contactNotes: [], loading: true })),
    on(PatientEventsBillingActions.LoadContactNotesSuccess, (state, { notes }) => ({
        ...state,
        contactNotes: notes,
        loading: false,
    })),
    on(PatientEventsBillingActions.LoadContactNotesFailure, (state, { error }) => ({
        ...state,
        contactNotes: [],
        loading: false,
        error,
    })),

    on(PatientEventsBillingActions.AddContactNote, state => ({ ...state, loading: true })),
    on(PatientEventsBillingActions.AddContactNoteSuccess, (state, { note }) => ({
        ...state,
        loading: false,
        contactNotes: [...state.contactNotes, note],
    })),
    on(PatientEventsBillingActions.AddContactNoteFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientEventsBillingActions.ResetState, () => initialState)
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectBillingEvents = (state: State) => state.BillingEvents;
export const selectContactNotes = (state: State) => state.contactNotes;
