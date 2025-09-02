import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { BillingEventsCenterResponse } from '../../../../shared/interfaces/auxilium/billing-events-center/billing-events-center.interfface';
import { BillingEventsCenterTableActions } from '../actions/billing-events-center-table.action';

export const featureKey = 'billing-events-center-table';

export interface State extends LoadingState {
    BillingEvents: BillingEventsCenterResponse;
}

// interface IdEntity {
//   id: number;
// }

const initialState: State = {
    loading: false,
    error: null,
    BillingEvents: [],
};

export const reducer = createReducer(
    initialState,
    on(BillingEventsCenterTableActions.resetState, () => initialState),

    on(BillingEventsCenterTableActions.LoadBillingEvents, state => ({ ...initialState, loading: true })),
    on(BillingEventsCenterTableActions.LoadBillingEventsSuccess, (state, { BillingEvents }) => ({
        ...state,
        loading: false,
        BillingEvents,
    })),
    on(BillingEventsCenterTableActions.LoadBillingEventsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(BillingEventsCenterTableActions.LoadAllBillingEvents, state => ({ ...initialState, loading: true })),
    on(BillingEventsCenterTableActions.LoadAllBillingEventsSuccess, (state, { BillingEvents }) => ({
        ...state,
        loading: false,
        BillingEvents,
    })),
    on(BillingEventsCenterTableActions.LoadAllBillingEventsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectBillingEvents = (state: State) => state.BillingEvents;
