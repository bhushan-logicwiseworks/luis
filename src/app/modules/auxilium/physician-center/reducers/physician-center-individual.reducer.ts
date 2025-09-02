import { createReducer, on } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import {
    GetPhysicianResponse,
    PhysicianDisplay,
} from 'app/shared/interfaces/auxilium/physician-center/physician.interface';
import { PhysicianCenterIndividualActions } from '../actions/physician-center-individual.actions';

export const featureKey = 'physician-center-individual';

export interface State extends LoadingState {
    physicians: GetPhysicianResponse;
    physician: PhysicianDisplay;
    zipCodeLookup: GetPatientZipCodeLookUp;
    branch: GetBranchListResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    physician: null,
    physicians: [],
    zipCodeLookup: undefined,
    branch: [],
};

export const reducer = createReducer(
    initialState,

    on(PhysicianCenterIndividualActions.LoadPhysician, state => ({ ...state, loading: true })),
    on(PhysicianCenterIndividualActions.LoadPhysicianSuccess, (state, { physician }) => ({
        ...state,
        loading: false,
        physician,
    })),
    on(PhysicianCenterIndividualActions.LoadPhysicianFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PhysicianCenterIndividualActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(PhysicianCenterIndividualActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(PhysicianCenterIndividualActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PhysicianCenterIndividualActions.LoadBranchDropDown, state => ({ ...state, loading: true })),
    on(PhysicianCenterIndividualActions.LoadBranchDropDownSuccess, (state, { branch }) => ({
        ...state,
        loading: false,
        branch,
    })),
    on(PhysicianCenterIndividualActions.LoadBranchDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectPhysician = (state: State) => state.physician;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.physicians;
export const selectPatientCityState = (state: State) => state.zipCodeLookup;
export const selectBranch = (state: State) => state.branch;
