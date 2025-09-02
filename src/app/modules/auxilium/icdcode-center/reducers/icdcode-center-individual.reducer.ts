import { createReducer, on } from '@ngrx/store';
import { GetIcdCodeResponse, ICDCodeDisplay } from 'app/shared/interfaces/auxilium/icdcode-center/icdcode.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { IcdCodesCenterIndividualActions } from '../actions/icdcode-center-individual.actions';

export const featureKey = 'hotkeys-center-individual';

export interface State extends LoadingState {
    icdcodes: GetIcdCodeResponse;
    icdcode: ICDCodeDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    icdcode: null,
    icdcodes: [],
};

export const reducer = createReducer(
    initialState,

    on(IcdCodesCenterIndividualActions.LoadIcdCode, state => ({ ...state, loading: true })),
    on(IcdCodesCenterIndividualActions.LoadIcdCodeSuccess, (state, { icdcode }) => ({
        ...state,
        loading: false,
        icdcode,
    })),
    on(IcdCodesCenterIndividualActions.LoadIcdCodeFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(IcdCodesCenterIndividualActions.LoadIcdCodeById, state => ({ ...initialState, loading: true })),
    on(IcdCodesCenterIndividualActions.LoadIcdCodeByIdSuccess, (state, { icdcode }) => ({
        ...state,
        loading: false,
        icdcode,
    })),
    on(IcdCodesCenterIndividualActions.LoadIcdCodeByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectIcdCode = (state: State) => state.icdcode;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.icdcodes;
export const selectIcdCodeById = (state: State) => state.icdcode;
