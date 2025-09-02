import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { BillingEventsCenterResponse } from '../../../../shared/interfaces/auxilium/billing-events-center/billing-events-center.interfface';
import { GetOwnersResponse } from '../../../../shared/interfaces/auxilium/comm-center/api-responses.interface';
import { BillingEventsCenterCreateActions } from '../actions/billing-events-center-create.actions';

export const featureKey = 'billing-events-center-create';

export interface State extends LoadingState {
    billingEvent: BillingEventsCenterResponse;
    owners: GetOwnersResponse;
    loadingOwners: boolean;
    errorOwners: any;
}

const initialState: State = {
    billingEvent: null,
    loading: false,
    error: null,
    owners: [],
    loadingOwners: false,
    errorOwners: null,
};

export const reducer = createReducer(
    initialState,

    on(BillingEventsCenterCreateActions.SaveBillingEvent, state => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(BillingEventsCenterCreateActions.SaveBillingEventSuccess, (state, { response }) => ({
        ...state,
        loading: false,
        billingEvent: response,
        error: null,
    })),

    on(BillingEventsCenterCreateActions.SaveBillingEventFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(BillingEventsCenterCreateActions.LoadOwners, state => ({ ...state, loadingOwners: true, errorOwners: null })),
    on(BillingEventsCenterCreateActions.LoadOwnersSuccess, (state, { owners }) => ({
        ...state,
        loadingOwners: false,
        owners,
    })),
    on(BillingEventsCenterCreateActions.LoadOwnersFailure, (state, { error }) => ({
        ...state,
        loadingOwners: false,
        errorOwners: error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectOwners = (state: State) => state.owners;
export const selectLoadingOwners = (state: State) => state.loadingOwners;
