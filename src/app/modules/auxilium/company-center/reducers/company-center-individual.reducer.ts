import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { CompanyCenterIndividualActions } from '../actions/company-center-individualeffects';

export const featureKey = 'company-center-individual';

export interface State extends LoadingState {
    // validations: GetValidationResponse;
    // validation: Validation;
    zipCodeLookup: GetPatientZipCodeLookUp;
}

const initialState: State = {
    loading: false,
    error: null,
    // validation: null,
    // validations: [],
    zipCodeLookup: undefined,
};

export const reducer = createReducer(
    initialState,

    on(CompanyCenterIndividualActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(CompanyCenterIndividualActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(CompanyCenterIndividualActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
// export const selectValidation = (state: State) => state.validation;
export const selectError = (state: State) => state.error;
// export const selectAll = (state: State) => state.validations;
export const selectCompanyCityState = (state: State) => state.zipCodeLookup;
