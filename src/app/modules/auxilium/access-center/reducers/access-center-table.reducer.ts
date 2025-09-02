import { createReducer, on } from '@ngrx/store';
import { GetAccessResponse } from 'app/shared/interfaces/auxilium/access-center/access.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { AccessCenterTableActions } from '../actions/access-center-table.actions';

export const featureKey = 'access-center-table';

export interface State extends LoadingState {
    accesslist: GetAccessResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    accesslist: [],
};

export const reducer = createReducer(
    initialState,

    on(AccessCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(AccessCenterTableActions.LoadAccessList, state => ({ ...initialState, loading: true })),
    on(AccessCenterTableActions.LoadAccessListSuccess, (state, { accesslist }) => ({
        ...state,
        loading: false,
        accesslist,
    })),
    on(AccessCenterTableActions.LoadAccessListFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(AccessCenterTableActions.DeleteAccess, state => ({ ...state, loading: true })),
    on(AccessCenterTableActions.DeleteAccessSuccess, state => ({ ...state, loading: false })),
    on(AccessCenterTableActions.DeleteAccessFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectAccessList = (state: State) => state.accesslist;
