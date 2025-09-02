import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientEmergencyContact } from 'app/shared/interfaces/auxilium/patient-center/patient-emergency-contacts.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { EmergencyContactsActions } from '../actions/patient-emergency-contacts.action';

export const featureKey = 'patient-emergency-contacts';

export interface State extends LoadingState {
    emergencyContacts: GetPatientEmergencyContact;
    zipCodeLookup: GetPatientZipCodeLookUp;
}

const initialState: State = {
    loading: false,
    error: null,
    emergencyContacts: [],
    zipCodeLookup: undefined,
};

export const reducer = createReducer(
    initialState,
    on(EmergencyContactsActions.LoadEmergencyContacts, state => ({ ...state, loading: true })),
    on(EmergencyContactsActions.LoadEmergencyContactsSuccess, (state, { emergencyContacts }) => ({
        ...state,
        loading: false,
        emergencyContacts,
    })),
    on(EmergencyContactsActions.LoadEmergencyContactsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(EmergencyContactsActions.DeleteEmergencyContact, state => ({ ...initialState, loading: true })),
    on(EmergencyContactsActions.DeleteEmergencyContactSuccess, state => ({ ...state, loading: false })),
    on(EmergencyContactsActions.DeleteEmergencyContactFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(EmergencyContactsActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(EmergencyContactsActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(EmergencyContactsActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectEmergencyContacts = (state: State) => state.emergencyContacts;
export const selectPatientCityState = (state: State) => state.zipCodeLookup;
