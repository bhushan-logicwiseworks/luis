import { createReducer, on } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { DropdownDisplay } from 'app/shared/interfaces/auxilium/patient-center/patient-status.interface';
import { GetPatientResponse } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';
import { GetBatchEligibility } from 'app/shared/interfaces/auxilium/work-order-center/batch-eligibility-response.interface';
import {
    GetWorkOrderRepsResponse,
    WorkOrderDisplay,
} from 'app/shared/interfaces/auxilium/work-order-center/work-order-center.interface';
import { WorkOrderCenterIndividualActions } from '../actions/work-order-center-individual.actions';

export const featureKey = 'sales-center-individual';

export interface State extends LoadingState {
    workreps: GetWorkOrderRepsResponse;
    workrep: WorkOrderDisplay;
    salesrep: GetPatientResponse;
    billType: DropdownDisplay[];
    itemcode: string;
    payorsDetail: Payor;
    referCode: string;
    branch: GetBranchListResponse;
    batchEligibility: GetBatchEligibility;
}

const initialState: State = {
    loading: false,
    error: null,
    workrep: null,
    workreps: [],
    salesrep: [],
    billType: [],
    itemcode: '',
    payorsDetail: null,
    referCode: '',
    branch: [],
    batchEligibility: [],
};

export const reducer = createReducer(
    initialState,

    on(WorkOrderCenterIndividualActions.resetState, () => {
        return initialState;
    }),

    on(WorkOrderCenterIndividualActions.LoadWorkOrderDetails, state => ({ ...state, loading: true })),
    on(WorkOrderCenterIndividualActions.LoadWorkOrderDetailsSuccess, (state, { workrep }) => ({
        ...state,
        loading: false,
        workrep,
    })),
    on(WorkOrderCenterIndividualActions.LoadWorkOrderDetailsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(WorkOrderCenterIndividualActions.LoadworkSalesRep, state => ({ ...state, loading: true })),
    on(WorkOrderCenterIndividualActions.LoadworkSalesRepSuccess, (state, { salesrep }) => ({
        ...state,
        loading: false,
        salesrep,
    })),
    on(WorkOrderCenterIndividualActions.LoadworkSalesRepFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(WorkOrderCenterIndividualActions.BillTypeDropdown, state => ({ ...state, loading: true })),
    on(WorkOrderCenterIndividualActions.BillTypeDropdownSuccess, (state, { billType }) => ({
        ...state,
        loading: false,
        billType,
    })),
    on(WorkOrderCenterIndividualActions.BillTypeDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(WorkOrderCenterIndividualActions.getItemCode, state => ({ ...state, loading: true })),
    on(WorkOrderCenterIndividualActions.getItemCodeSuccess, (state, { itemcode }) => ({
        ...state,
        loading: false,
        itemcode,
    })),
    on(WorkOrderCenterIndividualActions.getItemCodeFailure, state => ({ ...state, loading: false })),

    on(WorkOrderCenterIndividualActions.LoadPayorDetails, state => ({ ...state, loading: true })),
    on(WorkOrderCenterIndividualActions.LoadPayorDetailsSuccess, (state, { payorsDetail }) => ({
        ...state,
        loading: false,
        payorsDetail,
    })),
    on(WorkOrderCenterIndividualActions.LoadPayorDetailsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(WorkOrderCenterIndividualActions.getReferCode, state => ({ ...state, loading: true })),
    on(WorkOrderCenterIndividualActions.getReferCodeSuccess, (state, { referCode }) => ({
        ...state,
        loading: false,
        referCode,
    })),
    on(WorkOrderCenterIndividualActions.getReferCodeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(WorkOrderCenterIndividualActions.LoadBranchDropDown, state => ({ ...state, loading: true })),
    on(WorkOrderCenterIndividualActions.LoadBranchDropDownSuccess, (state, { branch }) => ({
        ...state,
        loading: false,
        branch,
    })),
    on(WorkOrderCenterIndividualActions.LoadBranchDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(WorkOrderCenterIndividualActions.GetBatchEligibilitySuccess, (state, { eligibility }) => ({
        ...state,
        loading: false,
        batchEligibility: eligibility,
    })),
    on(WorkOrderCenterIndividualActions.GetBatchEligibilityFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    on(WorkOrderCenterIndividualActions.ProcessBatchEligibility, state => ({ ...state, loading: true })),
    on(WorkOrderCenterIndividualActions.ProcessBatchEligibilitySuccess, (state, { eligibility }) => ({
        ...state,
        loading: false,
        batchEligibility: state.batchEligibility.map(item => {
            const updatedItem = eligibility.find(el => el.patientId === item.patientId);
            if (updatedItem) {
                return {
                    ...item,
                    isEligible: updatedItem.isEligible, // Set to true for processed records
                };
            }
            return item;
        }),
    })),
    on(WorkOrderCenterIndividualActions.ProcessBatchEligibilityFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectWorkOrderCenterRep = (state: State) => state.workrep;
export const selectDropDownSalesRep = (state: State) => state.salesrep;
export const selectBillType = (state: State) => state.billType;
export const selectError = (state: State) => state.error;
export const selectAll = (state: State) => state.workreps;
export const selectItemCode = (state: State) => state.itemcode;
export const selectPayorsDetail = (state: State) => state.payorsDetail;
export const selectReferCode = (state: State) => state.referCode;
export const selectBranch = (state: State) => state.branch;
export const selectBatchEligibility = (state: State) => state.batchEligibility;
