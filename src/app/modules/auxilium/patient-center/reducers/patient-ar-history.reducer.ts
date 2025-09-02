import { createReducer, on } from '@ngrx/store';

import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientArHistoryById } from 'app/shared/interfaces/auxilium/patient-center/patient-ar-history-by-id.interface';
import { PatientArHistory } from 'app/shared/interfaces/auxilium/patient-center/patient-ar-history.interface';
import { DropdownDisplay } from 'app/shared/interfaces/auxilium/patient-center/patient-status.interface';
import { PatientArHistoryActions } from '../actions/patient-ar-history.action';

export const patientsFeatureKey = 'patient-ar-history';

export interface State extends LoadingState {
    data: PatientArHistory[];
    historyData: PatientArHistoryById;
    billType: DropdownDisplay[];
    branch: GetBranchListResponse;
    amtAdjustedCode: DropdownDisplay[];
}

const initialState: State = {
    loading: false,
    error: null,
    data: [],
    billType: [],
    historyData: null,
    branch: [],
    amtAdjustedCode: [],
};

export const reducer = createReducer(
    initialState,
    on(PatientArHistoryActions.LoadArHistory, state => ({ ...state, loading: true })),
    on(PatientArHistoryActions.LoadArHistorySuccess, (state, { data }) => ({ ...state, loading: false, data })),
    on(PatientArHistoryActions.LoadArHistoryFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientArHistoryActions.LoadHistoryById, state => ({ ...state, loading: true })),
    on(PatientArHistoryActions.LoadHistoryByIdSuccess, (state, { historyData }) => ({
        ...state,
        loading: false,
        historyData,
    })),
    on(PatientArHistoryActions.LoadHistoryByIdFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientArHistoryActions.BillTypeDropdown, state => ({ ...state, loading: true })),
    on(PatientArHistoryActions.BillTypeDropdownSuccess, (state, { billType }) => ({
        ...state,
        loading: false,
        billType,
    })),
    on(PatientArHistoryActions.BillTypeDropdownFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(PatientArHistoryActions.LoadBranchDropDown, state => ({ ...state, loading: true })),
    on(PatientArHistoryActions.LoadBranchDropDownSuccess, (state, { branch }) => ({
        ...state,
        loading: false,
        branch,
    })),
    on(PatientArHistoryActions.LoadBranchDropDownFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(PatientArHistoryActions.AmtAdjustedCodeDropdown, state => ({ ...state, loading: true })),
    on(PatientArHistoryActions.AmtAdjustedCodeDropdownSuccess, (state, { amtAdjustedCode }) => ({
        ...state,
        loading: false,
        amtAdjustedCode,
    })),
    on(PatientArHistoryActions.AmtAdjustedCodeDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectArHistory = (state: State) => state.data;
export const selectArHistoryById = (state: State) => state.historyData;
export const selectBillType = (state: State) => state.billType;
export const selectBranch = (state: State) => state.branch;
export const selectAmtAdjustedCode = (state: State) => state.amtAdjustedCode;
