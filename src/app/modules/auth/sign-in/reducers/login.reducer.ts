import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { LoginActions } from '../actions/login.actions';

export const featureKey = 'login';

export interface State extends LoadingState {}

const initialState: State = {
    loading: false,
    error: null,
};

export const reducer = createReducer(
    initialState,
    on(LoginActions.Login, state => ({ ...state, loading: true })),
    on(LoginActions.LoginSuccess, (state, { user }) => ({ ...state, loading: false, user })),
    on(LoginActions.LoginFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
