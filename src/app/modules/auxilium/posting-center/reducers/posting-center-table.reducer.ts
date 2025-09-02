import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { EOBPatientDisplay } from '../../../../shared/interfaces/auxilium/bill-center/eob-patients.interface';
import {
    GetRemits835Response,
    Remits835Display,
} from '../../../../shared/interfaces/auxilium/bill-center/remits-835.interface';
import { PostingCenterTableActions } from '../actions/posting-center-table.action';

export const featureKey = 'bill-center-table';

export interface State extends LoadingState {
    eobdata: GetRemits835Response;
    eobinfo: Remits835Display;
    eobById: EOBPatientDisplay;
    eob: string;
}

const initialState: State = {
    loading: false,
    error: null,
    eobdata: [],
    eobinfo: null,
    eob: '',
    eobById: null,
};

export const reducer = createReducer(
    initialState,

    on(PostingCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(PostingCenterTableActions.LoadExplanationOfBenefits, state => ({ ...state, loading: true })),
    on(PostingCenterTableActions.LoadExplanationOfBenefitsSuccess, (state, { eobdata }) => ({
        ...state,
        loading: false,
        eobdata: eobdata,
    })),
    on(PostingCenterTableActions.LoadExplanationOfBenefitsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PostingCenterTableActions.LoadEOBDetails, state => ({ ...state, loading: true })),
    on(PostingCenterTableActions.LoadEOBDetailsSuccess, (state, { eobinfo }) => ({
        ...state,
        loading: false,
        eobinfo,
    })),
    on(PostingCenterTableActions.LoadEOBDetailsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(PostingCenterTableActions.LoadEOB, state => ({ ...state, loading: true })),
    on(PostingCenterTableActions.LoadEOBSuccess, (state, { eob }) => ({
        ...state,
        loading: false,
        eob,
    })),
    on(PostingCenterTableActions.LoadEOBFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PostingCenterTableActions.LoadPatientEOBById, state => ({ ...state, loading: true })),
    on(PostingCenterTableActions.LoadPatientEOBByIdSuccess, (state, { eob }) => ({
        ...state,
        loading: false,
        eob,
    })),
    on(PostingCenterTableActions.LoadPatientEOBByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PostingCenterTableActions.LoadEOBById, state => ({ ...state, loading: true })),
    on(PostingCenterTableActions.LoadEOBByIdSuccess, (state, { eobById }) => ({
        ...state,
        loading: false,
        eobById,
    })),
    on(PostingCenterTableActions.LoadEOBByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PostingCenterTableActions.DeleteExplanationOfBenefits, state => ({ ...state, loading: true })),
    on(PostingCenterTableActions.DeleteExplanationOfBenefitsSuccess, state => ({ ...state, loading: false })),
    on(PostingCenterTableActions.DeleteExplanationOfBenefitsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectEOBData = (state: State) => state.eobdata;
export const selectEOB = (state: State) => state.eob;
export const selectEOBById = (state: State) => state.eobById;
export const selectPatientEOBById = (state: State) => state.eobById;
export const selectEOBInfo = (state: State) => state.eobinfo;
