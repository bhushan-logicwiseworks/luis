import { createReducer, on } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientPrism } from 'app/shared/interfaces/auxilium/patient-center/patient-prism.interface';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';
import { PatientDemographicsActions } from '../actions/patient-demographics.action';

export const patientsFeatureKey = 'patient-demographics';

export interface State extends LoadingState {
    demographics: PatientEntity;
    referCode: string;
    branch: GetBranchListResponse;
    authPrism: PatientPrism;
}

const initialState: State = {
    loading: false,
    error: null,
    demographics: null,
    referCode: '',
    branch: [],
    authPrism: null,
};

export const reducer = createReducer(
    initialState,

    on(PatientDemographicsActions.ResetState, () => ({ ...initialState })),

    on(PatientDemographicsActions.AddPatientDemographics, state => ({ ...state, loading: true })),
    on(PatientDemographicsActions.AddPatientDemographicsSuccess, (state, { demographics }) => ({
        ...state,
        loading: false,
        demographics,
    })),
    on(PatientDemographicsActions.AddPatientDemographicsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientDemographicsActions.getReferCode, state => ({ ...state, loading: true })),
    on(PatientDemographicsActions.getReferCodeSuccess, (state, { referCode }) => ({
        ...state,
        loading: false,
        referCode,
    })),
    on(PatientDemographicsActions.getReferCodeFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientDemographicsActions.LoadBranchDropDown, state => ({ ...state, loading: true })),
    on(PatientDemographicsActions.LoadBranchDropDownSuccess, (state, { branch }) => ({
        ...state,
        loading: false,
        branch,
    })),
    on(PatientDemographicsActions.LoadBranchDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientDemographicsActions.LoadPrismAuthorization, state => ({ ...state, loading: true })),
    on(PatientDemographicsActions.LoadPrismAuthorizationSuccess, (state, { authPrism }) => ({
        ...state,
        loading: false,
        authPrism,
    })),
    on(PatientDemographicsActions.LoadPrismAuthorizationFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectdemographics = (state: State) => state.demographics;
export const selectReferCode = (state: State) => state.referCode;
export const selectBranch = (state: State) => state.branch;
export const selectauthPrism = (state: State) => state.authPrism;
