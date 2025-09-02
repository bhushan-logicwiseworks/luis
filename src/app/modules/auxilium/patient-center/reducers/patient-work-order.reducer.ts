import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';

import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { PatientWorkOrders } from 'app/shared/interfaces/auxilium/patient-center/work-orders.interface';
import { PatientWorkOrderActions } from '../actions/patient-work-order.action';

export const patientsFeatureKey = 'patient-work-order';

export enum SelectedWorkOrderFilter {
    billedItems = 1,
    monthlyMarker = 2,
}
export interface State extends LoadingState {
    data: PatientWorkOrders[];
    selectedFilter: SelectedWorkOrderFilter;
    shipOrder: any;
    branch: GetBranchListResponse;
}

const initialState: State = {
    loading: false,
    error: null,
    data: [],
    shipOrder: {},
    selectedFilter: SelectedWorkOrderFilter.billedItems,
    branch: [],
};

export const reducer = createReducer(
    initialState,
    on(PatientWorkOrderActions.LoadWorkOrder, state => ({ ...state, loading: true, address: [] })),
    on(PatientWorkOrderActions.LoadWorkOrderSuccess, (state, { data }) => ({ ...state, loading: false, data })),
    on(PatientWorkOrderActions.ShipWorkOrder, state => ({ ...state, loading: true, address: [] })),
    on(PatientWorkOrderActions.ShipWorkOrderSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        shipOrder: data,
    })),
    on(PatientWorkOrderActions.ShipWorkOrderFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(PatientWorkOrderActions.LoadWorkOrderFailure, (state, { error }) => ({ ...state, loading: false, error })),
    on(PatientWorkOrderActions.ToggleWorkOrderFilter, state => ({
        ...state,
        loading: false,
        selectedFilter:
            state.selectedFilter === SelectedWorkOrderFilter.billedItems
                ? SelectedWorkOrderFilter.monthlyMarker
                : SelectedWorkOrderFilter.billedItems,
    })),
    on(PatientWorkOrderActions.LoadBranchDropDown, state => ({ ...state, loading: true })),
    on(PatientWorkOrderActions.LoadBranchDropDownSuccess, (state, { branch }) => ({
        ...state,
        loading: false,
        branch,
    })),
    on(PatientWorkOrderActions.LoadBranchDropDownFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectworkorder = (state: State) => state.data;
export const selectworkorderFilter = (state: State) => state.selectedFilter;
export const selectShipWorkOrder = (state: State) => state.shipOrder;
export const selectBranch = (state: State) => state.branch;
