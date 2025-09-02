import { createReducer, on } from '@ngrx/store';

import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ReorderCenterTableActions } from '../actions/reorder-center-table.actions';
import { GetReordersResponse } from '../interfaces/reorderPatient';

export const featureKey = 'reorder-center-table';

export interface State extends LoadingState {
    Reorders: GetReordersResponse;
}

interface IdEntity {
    id: number;
}

const initialState: State = {
    loading: false,
    error: null,
    Reorders: [],
};

export const reducer = createReducer(
    initialState,

    on(ReorderCenterTableActions.resetState, () => {
        return initialState;
    }),

    on(ReorderCenterTableActions.LoadReorder, state => ({ ...initialState, loading: true })),
    on(ReorderCenterTableActions.LoadReorderSuccess, (state, { Reorders }) => ({ ...state, loading: false, Reorders })),
    on(ReorderCenterTableActions.LoadReorderFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectReorders = (state: State) => state.Reorders;
