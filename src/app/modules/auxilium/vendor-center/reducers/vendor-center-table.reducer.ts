import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetVendorsResponse } from 'app/shared/interfaces/auxilium/vendor-center/vendor.interface';
import { VendorCenterTableActions } from '../actions/vendor-center-table.actions';

export const featureKey = 'vendor-center-table';

export interface State extends LoadingState {
    vendors: GetVendorsResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    vendors: [],
};

export const reducer = createReducer(
    initialState,

    on(VendorCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(VendorCenterTableActions.LoadVendors, state => ({ ...initialState, loading: true })),
    on(VendorCenterTableActions.LoadVendorsSuccess, (state, { vendors }) => ({
        ...state,
        loading: false,
        vendors,
    })),
    on(VendorCenterTableActions.LoadVendorsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectVendors = (state: State) => state.vendors;
