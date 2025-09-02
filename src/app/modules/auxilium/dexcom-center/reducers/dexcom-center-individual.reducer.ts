import { createReducer, on } from '@ngrx/store';
import {
    DexcomUserDisplay,
    GetDexcomUserResponse,
} from 'app/shared/interfaces/auxilium/dexcom-center/dexcomuser.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { DexcomCenterIndividualActions } from '../actions/dexcom-center-individual.actions';

export const featureKey = 'dexcom-center-individual';

export interface State extends LoadingState {
    users: GetDexcomUserResponse;
    user: DexcomUserDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    user: null,
    users: [],
};

export const reducer = createReducer(
    initialState,
    on(DexcomCenterIndividualActions.LoadUser, state => ({ ...state, loading: true })),
    on(DexcomCenterIndividualActions.LoadUserSuccess, (state, { user }) => ({ ...state, loading: false, user })),
    on(DexcomCenterIndividualActions.LoadUserFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectUser = (state: State) => state.user;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.users;
