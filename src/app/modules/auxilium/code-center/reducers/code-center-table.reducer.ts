import { createReducer, on } from '@ngrx/store';
import { GetCodesResponse } from 'app/shared/interfaces/auxilium/code-center/code.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { CodeCenterTableActions } from '../actions/code-center-table.actions';

export const featureKey = 'code-center-table';

export interface State extends LoadingState {
    codes: GetCodesResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    codes: [],
};

export const reducer = createReducer(
    initialState,

    on(CodeCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(CodeCenterTableActions.LoadCodes, state => ({ ...initialState, loading: true })),
    on(CodeCenterTableActions.LoadCodesSuccess, (state, { codelist: codes }) => ({
        ...state,
        loading: false,
        codes,
    })),
    on(CodeCenterTableActions.LoadCodesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectCodes = (state: State) => state.codes;
