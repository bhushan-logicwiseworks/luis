import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientAutomatedEmailsActions } from '../actions/patient-automated-emails.actions';

export const featureKey = 'patient-automated-emails';

export interface State extends LoadingState {
    automatedEmails: any;
}

const initialState: State = {
    loading: false,
    error: null,
    automatedEmails: null,
};

export const reducer = createReducer(
    initialState,
    on(PatientAutomatedEmailsActions.LoadAutomatedEmails, state => ({ ...state, loading: true })),
    on(PatientAutomatedEmailsActions.LoadAutomatedEmailsSuccess, (state, { automatedEmails }) => ({
        ...state,
        loading: false,
        automatedEmails,
    })),
    on(PatientAutomatedEmailsActions.LoadAutomatedEmailsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectAutomatedEmails = (state: State) => state.automatedEmails;
