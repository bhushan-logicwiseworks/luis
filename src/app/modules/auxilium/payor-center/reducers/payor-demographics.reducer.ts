import { createReducer, on } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';
import { PayorDemographicsActions } from '../actions/payor-demographics.action';

export const featureKey = 'payor-center-individual';

export interface State extends LoadingState {
    payorDemographics: Payor;
    zipCodeLookup: GetPatientZipCodeLookUp;
    branch: GetBranchListResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    payorDemographics: null,
    zipCodeLookup: null,
    branch: [],
};

export const reducer = createReducer(
    initialState,

    on(PayorDemographicsActions.AddPayorDemographics, state => ({ ...state, loading: true })),
    on(PayorDemographicsActions.AddPayorDemographicsSuccess, (state, { payorDemographics }) => ({
        ...state,
        loading: false,
        payorDemographics,
    })),
    on(PayorDemographicsActions.AddPayorDemographicsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PayorDemographicsActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(PayorDemographicsActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(PayorDemographicsActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PayorDemographicsActions.LoadBranchDropDown, state => ({ ...state, loading: true })),
    on(PayorDemographicsActions.LoadBranchDropDownSuccess, (state, { branch }) => ({
        ...state,
        loading: false,
        branch,
    })),
    on(PayorDemographicsActions.LoadBranchDropDownFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectpayorBillInfo = (state: State) => state.payorDemographics;
export const selectPatientCityState = (state: State) => state.zipCodeLookup;
export const selectBranch = (state: State) => state.branch;
