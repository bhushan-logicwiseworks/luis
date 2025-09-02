import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';
import { PayorBillOptionActions } from '../actions/payor-bill-option.action';

export const patientsFeatureKey = 'payor-center-bill-info';

export interface State extends LoadingState {
    payorBillOption: Payor;
}

const initialState: State = {
    loading: false,
    error: null,
    payorBillOption: null,
};

export const reducer = createReducer(
    initialState,

    on(PayorBillOptionActions.AddPayorBillOption, state => ({ ...state, loading: true })),
    on(PayorBillOptionActions.AddPayorBillOptionSuccess, (state, { payorBillOption }) => ({
        ...state,
        loading: false,
        payorBillOption,
    })),
    on(PayorBillOptionActions.AddPayorBillOptionFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectpayorBillOption = (state: State) => state.payorBillOption;
