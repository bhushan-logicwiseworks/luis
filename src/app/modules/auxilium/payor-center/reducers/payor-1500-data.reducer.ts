import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';
import { Payor1500DataActions } from '../actions/payor-1500-data.action';

export const patientsFeatureKey = 'payor-center-1500-data';

export interface State extends LoadingState {
    payor1500Data: Payor;
}

const initialState: State = {
    loading: false,
    error: null,
    payor1500Data: null,
};

export const reducer = createReducer(
    initialState,

    on(Payor1500DataActions.AddPayor1500Data, state => ({ ...state, loading: true })),
    on(Payor1500DataActions.AddPayor1500DataSuccess, (state, { payor1500Data }) => ({
        ...state,
        loading: false,
        payor1500Data,
    })),
    on(Payor1500DataActions.AddPayor1500DataFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPayor1500Data = (state: State) => state.payor1500Data;
