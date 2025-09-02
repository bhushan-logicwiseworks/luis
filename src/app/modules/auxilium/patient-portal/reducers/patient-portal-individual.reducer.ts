import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientPortalUserDisplay } from 'app/shared/interfaces/auxilium/patient-portal/patient-portal-user.interface';
import { PatientPortalIndividualActions } from '../actions/patient-portal-individual.actions';

export const featureKey = 'patient-portal-individual';

export interface State extends LoadingState {
    user: PatientPortalUserDisplay;
    userDetails: PatientPortalUserDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    user: null,
    userDetails: null,
};

export const reducer = createReducer(
    initialState,

    on(PatientPortalIndividualActions.LoadPPUser, state => ({ ...state, loading: true, error: null, email: null })),
    on(PatientPortalIndividualActions.LoadPPUserSuccess, (state, { user }) => ({ ...state, loading: false, user })),
    on(PatientPortalIndividualActions.LoadPPUserFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientPortalIndividualActions.UpdateUserDetails, state => ({
        ...state,
        loading: true,
        error: null,
        email: null,
    })),
    on(PatientPortalIndividualActions.UpdateUserDetailsSuccess, (state, { userDetails }) => ({
        ...state,
        loading: false,
        userDetails,
    })),
    on(PatientPortalIndividualActions.UpdateUserDetailsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
