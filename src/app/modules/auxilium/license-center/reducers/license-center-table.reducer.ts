import { createReducer, on } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import {
    GetLicenseInfoResponse,
    LicenseInfo,
} from 'app/shared/interfaces/auxilium/license-center/license-info-interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { LicenseCenterTableActions } from '../actions/license-center-table.actions';

export const featureKey = 'license-center-new-table';

export interface State extends LoadingState {
    licenses: GetLicenseInfoResponse;
    zipCodeLookup: GetPatientZipCodeLookUp;
    license: LicenseInfo;
    branch: GetBranchListResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    licenses: [],
    zipCodeLookup: undefined,
    license: null,
    branch: [],
};

export const reducer = createReducer(
    initialState,

    on(LicenseCenterTableActions.ResetState, () => {
        return initialState;
    }),
    on(LicenseCenterTableActions.ResetStateZipCode, state => ({ ...state, zipCodeLookup: null })),

    on(LicenseCenterTableActions.LoadLicenses, state => ({ ...initialState, loading: true })),
    on(LicenseCenterTableActions.LoadLicensesSuccess, (state, { licenses }) => ({
        ...state,
        loading: false,
        licenses,
    })),
    on(LicenseCenterTableActions.LoadLicensesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(LicenseCenterTableActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(LicenseCenterTableActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(LicenseCenterTableActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(LicenseCenterTableActions.LoadBranchDropDown, state => ({ ...state, loading: true })),
    on(LicenseCenterTableActions.LoadBranchDropDownSuccess, (state, { branch }) => ({
        ...state,
        loading: false,
        branch,
    })),
    on(LicenseCenterTableActions.LoadBranchDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(LicenseCenterTableActions.LoadLicensesById, state => ({ ...initialState, loading: true })),
    on(LicenseCenterTableActions.LoadLicensesByIdSuccess, (state, { License }) => ({
        ...state,
        loading: false,
        license: License,
    })),
    on(LicenseCenterTableActions.LoadLicensesByIdFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectLicenses = (state: State) => state.licenses;
export const selectZipCode = (state: State) => state.zipCodeLookup;
export const selectBranch = (state: State) => state.branch;
export const selectLicenseById = (state: State) => state.license;
