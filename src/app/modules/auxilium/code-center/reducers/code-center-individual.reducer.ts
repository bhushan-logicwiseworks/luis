import { createReducer, on } from '@ngrx/store';
import { CodeDisplay, GetCodesResponse } from 'app/shared/interfaces/auxilium/code-center/code.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { CodeCenterIndividualActions } from '../actions/code-center-individual.actions';

export const featureKey = 'code-center-individual';

export interface State extends LoadingState {
    code: GetCodesResponse;
    codes: CodeDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    codes: null,
    code: [],
};

export const reducer = createReducer(
    initialState,

    on(CodeCenterIndividualActions.LoadCode, state => ({ ...state, loading: true })),
    on(CodeCenterIndividualActions.LoadCodeSuccess, (state, { code: codes }) => ({
        ...state,
        loading: false,
        codes,
    })),
    on(CodeCenterIndividualActions.LoadCodeFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectCode = (state: State) => state.codes;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.code;
