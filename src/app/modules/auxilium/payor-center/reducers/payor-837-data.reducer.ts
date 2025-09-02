import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';
import { Payor837DataActions } from '../actions/payor-837-data.action';

export const patientsFeatureKey = 'payor-center-837-data';

export interface State extends LoadingState {
    payor837Data: Payor;
}

const initialState: State = {
    loading: false,
    error: null,
    payor837Data: null,
};

export const reducer = createReducer(
    initialState,

    on(Payor837DataActions.AddPayor837Data, state => ({ ...state, loading: true })),
    on(Payor837DataActions.AddPayor837DataSuccess, (state, { payor837Data }) => ({
        ...state,
        loading: false,
        payor837Data,
    })),
    on(Payor837DataActions.AddPayor837DataFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPayor837Data = (state: State) => state.payor837Data;
