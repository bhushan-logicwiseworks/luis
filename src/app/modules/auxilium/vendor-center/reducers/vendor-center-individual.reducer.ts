import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { GetVendorsResponse, VendorDisplay } from 'app/shared/interfaces/auxilium/vendor-center/vendor.interface';
import { VendorCenterIndividualActions } from '../actions/vendor-center-individual.actions';

export const featureKey = 'vendor-center-individual';

export interface State extends LoadingState {
    vendor: GetVendorsResponse;
    vendors: VendorDisplay;
    zipCodeLookup: GetPatientZipCodeLookUp;
}

const initialState: State = {
    loading: false,
    error: null,
    vendors: null,
    vendor: [],
    zipCodeLookup: undefined,
};

export const reducer = createReducer(
    initialState,

    on(VendorCenterIndividualActions.LoadVendor, state => ({ ...state, loading: true })),
    on(VendorCenterIndividualActions.LoadVendorSuccess, (state, { vendors }) => ({
        ...state,
        loading: false,
        vendors,
    })),
    on(VendorCenterIndividualActions.LoadVendorFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(VendorCenterIndividualActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(VendorCenterIndividualActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(VendorCenterIndividualActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectVendor = (state: State) => state.vendors;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.vendor;
export const selectPatientCityState = (state: State) => state.zipCodeLookup;
