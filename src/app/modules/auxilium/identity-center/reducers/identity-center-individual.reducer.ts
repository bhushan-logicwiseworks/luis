import { createReducer, on } from '@ngrx/store';
import {
    GetIdentityResponse,
    IdentityDisplay,
} from 'app/shared/interfaces/auxilium/identity-center/identity.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { IdentityCenterIndividualActions } from '../actions/identity-center-individual.actions';

export const featureKey = 'identity-center-individual';

export interface State extends LoadingState {
    users: GetIdentityResponse;
    user: IdentityDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    user: null,
    users: [],
};

export const reducer = createReducer(
    initialState,

    on(IdentityCenterIndividualActions.LoadUser, state => ({ ...state, loading: true })),
    on(IdentityCenterIndividualActions.LoadUserSuccess, (state, { user }) => ({ ...state, loading: false, user })),
    on(IdentityCenterIndividualActions.LoadUserFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectUser = (state: State) => state.user;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.users;
