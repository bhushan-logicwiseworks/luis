import { createReducer, on } from '@ngrx/store';
import { LicenseFolder } from 'app/shared/interfaces/auxilium/license-center/license-folder-interface';
import { LicenseInfo } from 'app/shared/interfaces/auxilium/license-center/license-info-interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { LicenseCenterIndividualActions } from '../actions/license-center-individual.actions';

export const featureKey = 'license-center-new-individual';

export interface State extends LoadingState {
    licenses: LicenseInfo;
    licenseFolder: LicenseFolder;
}

const initialState: State = {
    loading: false,
    error: null,
    licenses: null,
    licenseFolder: null,
};

export const reducer = createReducer(
    initialState,
    on(LicenseCenterIndividualActions.UpdateLicense, state => ({ ...state, loading: true })),
    on(LicenseCenterIndividualActions.UpdateLicenseSuccess, (state, { licenses }) => ({
        ...state,
        loading: false,
        licenses,
    })),
    on(LicenseCenterIndividualActions.UpdateLicenseFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(LicenseCenterIndividualActions.AddLicenseFolder, state => ({ ...state, loading: true })),
    on(LicenseCenterIndividualActions.AddLicenseFolderSuccess, (state, { licenseFolder }) => ({
        ...state,
        loading: false,
        licenseFolder,
    })),
    on(LicenseCenterIndividualActions.AddLicenseFolderFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectLicensesRep = (state: State) => state.licenses;
export const selectLicenseFolderByIdRep = (state: State) => state.licenseFolder;
export const selectError = (state: State) => state.error;
