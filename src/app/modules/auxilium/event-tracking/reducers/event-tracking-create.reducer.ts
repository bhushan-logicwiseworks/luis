import { createReducer, on } from '@ngrx/store';
import { GetOwnersResponse } from 'app/shared/interfaces/auxilium/comm-center/api-responses.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { EventTrackingCreateActions } from '../actions/event-tracking-create.actions';

export const featureKey = 'comm-center-create';

export interface State extends LoadingState {
    owners: GetOwnersResponse;
    loadingOwners: boolean;
    errorOwners: any;
}

const initialState: State = {
    loading: false,
    error: null,

    owners: [],
    loadingOwners: false,
    errorOwners: null,
};

export const reducer = createReducer(
    initialState,
    on(EventTrackingCreateActions.CreateEmail, state => ({ ...state, loading: true, error: null })),
    on(EventTrackingCreateActions.CreateEmailSuccess, (state, { email }) => ({ ...state, loading: false, email })),
    on(EventTrackingCreateActions.CreateEmailFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(EventTrackingCreateActions.LoadOwners, state => ({ ...state, loadingOwners: true, errorOwners: null })),
    on(EventTrackingCreateActions.LoadOwnersSuccess, (state, { owners }) => ({
        ...state,
        loadingOwners: false,
        owners,
    })),
    on(EventTrackingCreateActions.LoadOwnersFailure, (state, { error }) => ({
        ...state,
        loadingOwners: false,
        errorOwners: error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectOwners = (state: State) => state.owners;
export const selectLoadingOwners = (state: State) => state.loadingOwners;
