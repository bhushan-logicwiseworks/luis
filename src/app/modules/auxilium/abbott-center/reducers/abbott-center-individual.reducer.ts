import { createReducer, on } from '@ngrx/store';
import {
    AbbottUserDisplay,
    GetAbbottUserResponse,
} from 'app/shared/interfaces/auxilium/abbott-center/abbottuser.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { AbbottCenterIndividualActions } from '../actions/abbott-center-individual.actions';

export const featureKey = 'abbott-center-individual';

export interface State extends LoadingState {
    users: GetAbbottUserResponse;
    user: AbbottUserDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    user: null,
    users: [],
};

export const reducer = createReducer(
    initialState,
    on(AbbottCenterIndividualActions.LoadUser, state => ({ ...state, loading: true })),
    on(AbbottCenterIndividualActions.LoadUserSuccess, (state, { user }) => ({ ...state, loading: false, user })),
    on(AbbottCenterIndividualActions.LoadUserFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectUser = (state: State) => state.user;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.users;
