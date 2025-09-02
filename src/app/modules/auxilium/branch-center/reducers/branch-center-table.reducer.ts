import { createReducer, on } from '@ngrx/store';
import { BranchRepDisplay } from 'app/shared/interfaces/auxilium/branch-center/branchrep.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { BranchCenterTableActions } from '../actions/branch-center-table.actions';

export const featureKey = 'branch-center-table';

export interface State extends LoadingState {
    branches: BranchRepDisplay[];
}

const initialState: State = {
    loading: false,
    error: null,
    branches: [],
};

export const reducer = createReducer(
    initialState,

    on(BranchCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(BranchCenterTableActions.LoadBranches, state => ({ ...initialState, loading: true })),
    on(BranchCenterTableActions.LoadBranchesSuccess, (state, { branches }) => ({
        ...state,
        loading: false,
        branches,
    })),
    on(BranchCenterTableActions.LoadBranchesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectBranches = (state: State) => state.branches;
