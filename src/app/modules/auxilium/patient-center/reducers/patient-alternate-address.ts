import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientOtherAddress } from 'app/shared/interfaces/auxilium/patient-center/patient-alternate-address.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { PatientAlternateAddressActions } from '../actions/patient-alternate-address.action';

export const patientsFeatureKey = 'patient-address';

export interface State extends LoadingState {
    address: PatientOtherAddress[];
    zipCodeLookup: GetPatientZipCodeLookUp;
}

const initialState: State = {
    loading: false,
    error: null,
    address: [],
    zipCodeLookup: undefined,
};

export const reducer = createReducer(
    initialState,
    on(PatientAlternateAddressActions.ResetState, state => ({ ...state, zipCodeLookup: null })),
    on(PatientAlternateAddressActions.LoadAlternateAddress, state => ({ ...state, loading: true, address: [] })),
    on(PatientAlternateAddressActions.LoadAlternateAddressSuccess, (state, { address }) => ({
        ...state,
        loading: false,
        address,
        zipCodeLookup: undefined,
    })),
    on(PatientAlternateAddressActions.LoadAlternateAddressFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
        zipCodeLookup: undefined,
    })),

    on(PatientAlternateAddressActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(PatientAlternateAddressActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(PatientAlternateAddressActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectaddress = (state: State) => state.address;
export const selectPatientCityState = (state: State) => state.zipCodeLookup;
