import { createReducer, on } from '@ngrx/store';
import { GetIdentityResponse } from 'app/shared/interfaces/auxilium/identity-center/identity.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { IdentityCenterTableActions } from '../actions/identity-center-table.actions';

export const featureKey = 'identity-center-table';

export interface State extends LoadingState {
    users: GetIdentityResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    users: [],
};

export const reducer = createReducer(
    initialState,

    on(IdentityCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(IdentityCenterTableActions.LoadUsers, state => ({ ...initialState, loading: true })),
    on(IdentityCenterTableActions.LoadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
    on(IdentityCenterTableActions.LoadUsersFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectUsers = (state: State) => state.users;
