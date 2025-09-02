import { createReducer, on } from '@ngrx/store';

import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientArHistory } from 'app/shared/interfaces/auxilium/patient-center/patient-ar-history.interface';
import {
    BillingEntity,
    DoctorInfo,
    DropdownDisplay,
    ICDCode,
} from 'app/shared/interfaces/auxilium/patient-center/patient-status.interface';
import { GetPatientResponse } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { PatientInquiryChangesActions } from '../actions/patient-inquiry-changes.action';

export const patientsFeatureKey = 'patient-inquiry-changes';

export interface State extends LoadingState {
    pwkType: DropdownDisplay[];
    tranType: DropdownDisplay[];
    pwkMethod: DropdownDisplay[];
    claimType: DropdownDisplay[];
    billType: DropdownDisplay[];
    printstatus: DropdownDisplay[];
    billTo: BillingEntity[];
    physician: DoctorInfo[];
    icdCode: ICDCode[];
    data: PatientArHistory[];
    historyData: PatientArHistory;
    salesrep: GetPatientResponse;
    branch: GetBranchListResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    pwkType: [],
    tranType: [],
    pwkMethod: [],
    claimType: [],
    billType: [],
    printstatus: [],
    billTo: [],
    icdCode: [],
    physician: [],
    data: [],
    salesrep: [],
    historyData: null,
    branch: [],
};

export const reducer = createReducer(
    initialState,
    on(PatientInquiryChangesActions.LoadInquiryChanges, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.LoadInquiryChangesSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        data,
    })),
    on(PatientInquiryChangesActions.LoadInquiryChangesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientInquiryChangesActions.LoadInquiryChangesId, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.LoadInquiryChangesIdSuccess, (state, { historyData }) => ({
        ...state,
        loading: false,
        historyData,
    })),
    on(PatientInquiryChangesActions.LoadInquiryChangesIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientInquiryChangesActions.LoadPatientSalesRep, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.LoadPatientSalesRepSuccess, (state, { salesrep }) => ({
        ...state,
        loading: false,
        salesrep,
    })),
    on(PatientInquiryChangesActions.LoadPatientSalesRepFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientInquiryChangesActions.PrintStatusDropDown, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.PrintStatusDropDownSuccess, (state, { printstatus }) => ({
        ...state,
        loading: false,
        printstatus,
    })),
    on(PatientInquiryChangesActions.PrintStatusDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientInquiryChangesActions.BillTypeDropdown, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.BillTypeDropdownSuccess, (state, { billType }) => ({
        ...state,
        loading: false,
        billType,
    })),
    on(PatientInquiryChangesActions.BillTypeDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientInquiryChangesActions.ClaimTypeDropdown, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.ClaimTypeDropdownSuccess, (state, { claimType }) => ({
        ...state,
        loading: false,
        claimType,
    })),
    on(PatientInquiryChangesActions.ClaimTypeDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientInquiryChangesActions.TranTypeDropdown, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.TranTypeDropdownSuccess, (state, { tranType }) => ({
        ...state,
        loading: false,
        tranType,
    })),
    on(PatientInquiryChangesActions.TranTypeDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientInquiryChangesActions.PwkMethodDropdown, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.PwkMethodDropdownSuccess, (state, { pwkMethod }) => ({
        ...state,
        loading: false,
        pwkMethod,
    })),
    on(PatientInquiryChangesActions.PwkMethodDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientInquiryChangesActions.PwkTypeDropdown, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.PwkTypeDropdownSuccess, (state, { pwkType }) => ({
        ...state,
        loading: false,
        pwkType,
    })),
    on(PatientInquiryChangesActions.PwkTypeDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientInquiryChangesActions.BillTo, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.BillToSuccess, (state, { billTo }) => ({ ...state, loading: false, billTo })),
    on(PatientInquiryChangesActions.BillToFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientInquiryChangesActions.IcdCode, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.IcdCodeSuccess, (state, { icdCode }) => ({ ...state, loading: false, icdCode })),
    on(PatientInquiryChangesActions.IcdCodeFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientInquiryChangesActions.Physician, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.PhysicianSuccess, (state, { physician }) => ({
        ...state,
        loading: false,
        physician,
    })),
    on(PatientInquiryChangesActions.PhysicianFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientInquiryChangesActions.LoadBranchDropDown, state => ({ ...state, loading: true })),
    on(PatientInquiryChangesActions.LoadBranchDropDownSuccess, (state, { branch }) => ({
        ...state,
        loading: false,
        branch,
    })),
    on(PatientInquiryChangesActions.LoadBranchDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectInquiryChanges = (state: State) => state.data;
export const selectPrintStatus = (state: State) => state.printstatus;
export const selectInquiryChangesId = (state: State) => state.historyData;
export const selectBillType = (state: State) => state.billType;
export const selectClaimType = (state: State) => state.claimType;
export const selectTranType = (state: State) => state.tranType;
export const selectPwkMethod = (state: State) => state.pwkMethod;
export const selectPwkType = (state: State) => state.pwkType;
export const selectBillTo = (state: State) => state.billTo;
export const selectIcdCode = (state: State) => state.icdCode;
export const selectPhysician = (state: State) => state.physician;
export const selectSalesRep = (state: State) => state.salesrep;
export const selectBranch = (state: State) => state.branch;
