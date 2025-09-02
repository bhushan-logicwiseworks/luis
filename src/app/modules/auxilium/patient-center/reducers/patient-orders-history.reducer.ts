import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientOrder } from 'app/shared/interfaces/auxilium/patient-center/patient-order.interface';
import { PatientOrderActions } from '../actions/patient-order-history.action';

export const patientsFeatureKey = 'patient-orders';

export interface State extends LoadingState {
    orders: PatientOrder[];
}

const initialState: State = {
    loading: false,
    error: null,
    orders: [],
};

export const reducer = createReducer(
    initialState,
    on(PatientOrderActions.loadOrder, state => ({ ...state, loading: true, orders: [] })),
    on(PatientOrderActions.loadOrdersSuccess, (state, { orders }) => ({ ...state, loading: false, orders })),
    on(PatientOrderActions.loadOrdersFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectOrders = (state: State) => state.orders;
