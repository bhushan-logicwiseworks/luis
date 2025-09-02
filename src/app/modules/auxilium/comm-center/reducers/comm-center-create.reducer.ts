import { createReducer, on } from '@ngrx/store';
import { GetOwnersResponse } from 'app/shared/interfaces/auxilium/comm-center/api-responses.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { CommCenterCreateActions } from '../actions/comm-center-create.actions';

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
    on(CommCenterCreateActions.CreateEmail, state => ({ ...state, loading: true, error: null })),
    on(CommCenterCreateActions.CreateEmailSuccess, (state, { email }) => ({ ...state, loading: false, email })),
    on(CommCenterCreateActions.CreateEmailFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterCreateActions.LoadOwners, state => ({ ...state, loadingOwners: true, errorOwners: null })),
    on(CommCenterCreateActions.LoadOwnersSuccess, (state, { owners }) => ({ ...state, loadingOwners: false, owners })),
    on(CommCenterCreateActions.LoadOwnersFailure, (state, { error }) => ({
        ...state,
        loadingOwners: false,
        errorOwners: error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectOwners = (state: State) => state.owners;
export const selectLoadingOwners = (state: State) => state.loadingOwners;
