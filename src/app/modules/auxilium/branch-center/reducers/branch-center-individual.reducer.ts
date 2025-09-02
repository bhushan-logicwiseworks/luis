import { createReducer, on } from '@ngrx/store';
import {
    BranchRepDisplay,
    GetBranchRepsResponse,
} from 'app/shared/interfaces/auxilium/branch-center/branchrep.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { BranchCenterIndividualActions } from '../actions/branch-center-individual.actions';

export const featureKey = 'branch-center-individual';

export interface State extends LoadingState {
    branches: GetBranchRepsResponse;
    branch: BranchRepDisplay;
    zipCodeLookup: GetPatientZipCodeLookUp;
}

const initialState: State = {
    loading: false,
    error: null,
    branch: null,
    branches: [],
    zipCodeLookup: undefined,
};

export const reducer = createReducer(
    initialState,

    on(BranchCenterIndividualActions.LoadBranch, state => ({ ...state, loading: true })),
    on(BranchCenterIndividualActions.LoadBranchSuccess, (state, { branch }) => ({
        ...state,
        loading: false,
        branch,
    })),
    on(BranchCenterIndividualActions.LoadBranchFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(BranchCenterIndividualActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(BranchCenterIndividualActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(BranchCenterIndividualActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectBranchRep = (state: State) => state.branch;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.branches;
export const selectPatientCityState = (state: State) => state.zipCodeLookup;
