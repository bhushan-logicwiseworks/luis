import { createReducer, on } from '@ngrx/store';
import { GetIcdCodeResponse } from 'app/shared/interfaces/auxilium/icdcode-center/icdcode.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { IcdCodeCenterTableActions } from '../actions/icdcode-center-table.actions';

export const featureKey = 'hotkeys-center-table';

export interface State extends LoadingState {
    icdcodes: GetIcdCodeResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    icdcodes: [],
};

export const reducer = createReducer(
    initialState,

    on(IcdCodeCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(IcdCodeCenterTableActions.LoadIcdCodes, state => ({ ...initialState, loading: true })),
    on(IcdCodeCenterTableActions.LoadIcdCodesSuccess, (state, { icdcodes }) => ({
        ...state,
        loading: false,
        icdcodes,
    })),
    on(IcdCodeCenterTableActions.LoadIcdCodesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectIcdCodesReps = (state: State) => state.icdcodes;
