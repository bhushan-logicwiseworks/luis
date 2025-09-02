import { createReducer, on } from '@ngrx/store';
import { GetDexcomUserResponse } from 'app/shared/interfaces/auxilium/dexcom-center/dexcomuser.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { DexcomCenterTableActions } from '../actions/dexcom-center-table.actions';

export const featureKey = 'dexcom-center-table';

export interface State extends LoadingState {
    users: GetDexcomUserResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    users: [],
};

export const reducer = createReducer(
    initialState,
    on(DexcomCenterTableActions.ResetState, () => {
        return initialState;
    }),
    on(DexcomCenterTableActions.LoadUsers, state => ({ ...initialState, loading: true })),
    on(DexcomCenterTableActions.LoadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
    on(DexcomCenterTableActions.LoadUsersFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectUsers = (state: State) => state.users;
