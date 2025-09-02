import { createReducer, on } from '@ngrx/store';
import { GetAbbottUserResponse } from 'app/shared/interfaces/auxilium/abbott-center/abbottuser.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { AbbottCenterTableActions } from '../actions/abbott-center-table.actions';

export const featureKey = 'abbott-center-table';

export interface State extends LoadingState {
    users: GetAbbottUserResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    users: [],
};

export const reducer = createReducer(
    initialState,
    on(AbbottCenterTableActions.ResetState, () => {
        return initialState;
    }),
    on(AbbottCenterTableActions.LoadUsers, state => ({ ...initialState, loading: true })),
    on(AbbottCenterTableActions.LoadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
    on(AbbottCenterTableActions.LoadUsersFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectUsers = (state: State) => state.users;
