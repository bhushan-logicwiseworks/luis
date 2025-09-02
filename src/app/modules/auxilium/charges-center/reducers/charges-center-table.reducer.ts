import { createReducer, on } from '@ngrx/store';
import { GetChargeResponse } from 'app/shared/interfaces/auxilium/charge-center/charge.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ChargesCenterTableActions } from '../actions/charges-center-table.action';

export const featureKey = 'charges-center-table';

export interface State extends LoadingState {
    charges: GetChargeResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    charges: [],
};

export const reducer = createReducer(
    initialState,

    on(ChargesCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(ChargesCenterTableActions.LoadCharges, state => ({ ...initialState, loading: true })),
    on(ChargesCenterTableActions.LoadChargesSuccess, (state, { charges }) => ({ ...state, loading: false, charges })),
    on(ChargesCenterTableActions.LoadChargesFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectChargesReps = (state: State) => state.charges;
