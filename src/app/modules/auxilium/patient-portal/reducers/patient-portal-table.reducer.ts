import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientPortalUserResponse } from 'app/shared/interfaces/auxilium/patient-portal/patient-portal-user.interface';
import { PatientPortalTableActions } from '../actions/patient-portal-table.actions';

export const featureKey = 'patient-portal-table';

export interface State extends LoadingState {
    users: GetPatientPortalUserResponse;
}

interface IdEntity {
    id: number;
}

const initialState: State = {
    loading: false,
    error: null,
    users: [],
};

export const reducer = createReducer(
    initialState,

    on(PatientPortalTableActions.ResetState, () => {
        return initialState;
    }),

    on(PatientPortalTableActions.LoadPPUsers, state => ({ ...initialState, loading: true })),
    on(PatientPortalTableActions.LoadPPUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
    on(PatientPortalTableActions.LoadPPUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientPortalTableActions.DeletePPUser, state => ({ ...state, loading: true })),
    on(PatientPortalTableActions.DeletePPUserSuccess, state => ({ ...state, loading: false })),
    on(PatientPortalTableActions.DeletePPUserFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectUsers = (state: State) => state.users;
