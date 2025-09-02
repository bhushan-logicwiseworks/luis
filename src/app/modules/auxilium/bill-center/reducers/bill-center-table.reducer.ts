import { createReducer, on } from '@ngrx/store';
import { GetAgingReportResponse } from 'app/shared/interfaces/auxilium/bill-center/aging-report.interface';
import { Counter } from 'app/shared/interfaces/auxilium/bill-center/bill-dashboard.interface';
import { BillCenterWorkOrderDisplay } from 'app/shared/interfaces/auxilium/bill-center/work-order.interface';
import { GetClaimsFor837Response } from 'app/shared/interfaces/auxilium/billType-center/claims-for-837.interface';
import { GetHeldItemsReportResponse } from 'app/shared/interfaces/auxilium/billType-center/held-items-report.interface';
import { GetValidationsInformationResponse } from 'app/shared/interfaces/auxilium/billType-center/validations-information.interface';
import { GetChargeResponse } from 'app/shared/interfaces/auxilium/charge-center/charge.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetRemits835Response } from '../../../../shared/interfaces/auxilium/bill-center/remits-835.interface';
import { BillCenterTableActions } from '../actions/bill-center-table.action';

export const featureKey = 'bill-center-table';

export interface State extends LoadingState {
    charges: GetChargeResponse;
    validation: GetValidationsInformationResponse;
    heldItemsReport: GetHeldItemsReportResponse;
    heldItemDetails: GetHeldItemsReportResponse;
    claimsFor837: GetClaimsFor837Response;
    dashboard: any;
    dashboardWorkOrdersAll: Counter[];
    dashboardWorkOrdersWithPOD: Counter[];
    dashboardWorkOrdersWithoutPOD: Counter[];

    workOrdersAll: BillCenterWorkOrderDisplay[];
    workOrdersWithPOD: BillCenterWorkOrderDisplay[];
    workOrdersWithoutPOD: BillCenterWorkOrderDisplay[];
    agingReport: GetAgingReportResponse;
    remits835: GetRemits835Response;
    eob: string;
}

const initialState: State = {
    loading: false,
    error: null,
    charges: [],
    validation: [],
    heldItemsReport: [],
    heldItemDetails: [],
    claimsFor837: [],
    dashboard: [],
    workOrdersAll: [],
    workOrdersWithPOD: [],
    workOrdersWithoutPOD: [],
    dashboardWorkOrdersAll: [],
    dashboardWorkOrdersWithPOD: [],
    dashboardWorkOrdersWithoutPOD: [],
    agingReport: [],
    remits835: [],
    eob: '',
};

export const reducer = createReducer(
    initialState,

    on(BillCenterTableActions.ResetState, () => {
        return initialState;
    }),

    on(BillCenterTableActions.LoadChargesReadyForClaims, state => ({ ...initialState, loading: true })),
    on(BillCenterTableActions.LoadChargesReadyForClaimsSuccess, (state, { charges }) => ({
        ...state,
        loading: false,
        charges,
    })),
    on(BillCenterTableActions.LoadChargesReadyForClaimsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(BillCenterTableActions.LoadClaimsReadyForValidation, state => ({ ...initialState, loading: true })),
    on(BillCenterTableActions.LoadClaimsReadyForValidationSuccess, (state, { validation }) => ({
        ...state,
        loading: false,
        validation,
    })),
    on(BillCenterTableActions.LoadClaimsReadyForValidationFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(BillCenterTableActions.PrepareClaimsForValidation, state => ({ ...initialState, loading: true })),
    on(BillCenterTableActions.PrepareClaimsForValidationSuccess, (state, { validation }) => ({
        ...state,
        loading: false,
        validation,
    })),
    on(BillCenterTableActions.PrepareClaimsForValidationFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(BillCenterTableActions.LoadHeldItemsReport, state => ({ ...initialState, loading: true })),
    on(BillCenterTableActions.LoadHeldItemsReportSuccess, (state, { heldItemsReport }) => ({
        ...state,
        loading: false,
        heldItemsReport,
    })),
    on(BillCenterTableActions.LoadHeldItemsReportFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(BillCenterTableActions.LoadHeldItemDetails, state => ({ ...initialState, loading: true })),
    on(BillCenterTableActions.LoadHeldItemDetailsSuccess, (state, { heldItemDetails }) => ({
        ...state,
        loading: false,
        heldItemDetails,
    })),
    on(BillCenterTableActions.LoadHeldItemDetailsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(BillCenterTableActions.LoadClaimFor837, state => ({ ...initialState, loading: true })),
    on(BillCenterTableActions.LoadClaimFor837Success, (state, { claimsFor837 }) => ({
        ...state,
        loading: false,
        claimsFor837,
    })),
    on(BillCenterTableActions.LoadClaimFor837Failure, (state, { error }) => ({ ...state, loading: false, error })),

    on(BillCenterTableActions.LoadBillDashBoard, state => ({ ...initialState, loading: true })),
    on(BillCenterTableActions.LoadBillDashBoardSuccess, (state, { dashboard }) => ({
        ...state,
        loading: false,
        dashboard,
    })),
    on(BillCenterTableActions.LoadBillDashBoardFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(BillCenterTableActions.loadDashBoardWorkOrdersAll, state => ({ ...state, loading: true })),
    on(BillCenterTableActions.loadDashBoardWorkOrdersAllSuccess, (state, { dashboardWorkOrdersAll }) => ({
        ...state,
        loading: false,
        dashboardWorkOrdersAll: dashboardWorkOrdersAll,
    })),
    on(BillCenterTableActions.loadDashBoardWorkOrdersAllFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(BillCenterTableActions.loadDashBoardWorkOrdersWithPOD, state => ({ ...state, loading: true })),
    on(BillCenterTableActions.loadDashBoardWorkOrdersWithPODSuccess, (state, { dashboardWorkOrdersWithPOD }) => ({
        ...state,
        loading: false,
        dashboardWorkOrdersWithPOD: dashboardWorkOrdersWithPOD,
    })),
    on(BillCenterTableActions.loadDashBoardWorkOrdersWithPODFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(BillCenterTableActions.loadDashBoardWorkOrdersWithoutPOD, state => ({ ...state, loading: true })),
    on(BillCenterTableActions.loadDashBoardWorkOrdersWithoutPODSuccess, (state, { dashboardWorkOrdersWithoutPOD }) => ({
        ...state,
        loading: false,
        dashboardWorkOrdersWithoutPOD: dashboardWorkOrdersWithoutPOD,
    })),
    on(BillCenterTableActions.loadDashBoardWorkOrdersWithoutPODFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    // Work Orders
    on(BillCenterTableActions.LoadWorkOrdersAll, state => ({ ...state, loading: true })),
    on(BillCenterTableActions.LoadWorkOrdersAllSuccess, (state, { workOrders }) => ({
        ...state,
        loading: false,
        workOrdersAll: workOrders,
    })),
    on(BillCenterTableActions.LoadWorkOrdersAllFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(BillCenterTableActions.LoadWorkOrdersWithPOD, state => ({ ...state, loading: true })),
    on(BillCenterTableActions.LoadWorkOrdersWithPODSuccess, (state, { workOrders }) => ({
        ...state,
        loading: false,
        workOrdersWithPOD: workOrders,
    })),
    on(BillCenterTableActions.LoadWorkOrdersWithPODFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(BillCenterTableActions.LoadWorkOrdersWithoutPOD, state => ({ ...state, loading: true })),
    on(BillCenterTableActions.LoadWorkOrdersWithoutPODSuccess, (state, { workOrders }) => ({
        ...state,
        loading: false,
        workOrdersWithoutPOD: workOrders,
    })),
    on(BillCenterTableActions.LoadWorkOrdersWithoutPODFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(BillCenterTableActions.LoadAgingReport, state => ({ ...state, loading: true })),
    on(BillCenterTableActions.LoadAgingReportSuccess, (state, { aginReports }) => ({
        ...state,
        loading: false,
        agingReport: aginReports,
    })),
    on(BillCenterTableActions.LoadAgingReportFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectChargesReps = (state: State) => state.charges;
export const selectValidationsReps = (state: State) => state.validation;
export const selectHeldItemsReportReps = (state: State) => state.heldItemsReport;
export const selectHeldItemsDetails = (state: State) => state.heldItemDetails;
export const selectClaimFor837 = (state: State) => state.claimsFor837;
export const selectBillDashboard = (state: State) => state.dashboard;
export const selectWorkOrdersAll = (state: State) => state.workOrdersAll;
export const selectWorkOrdersWithPOD = (state: State) => state.workOrdersWithPOD;
export const selectWorkOrdersWithoutPOD = (state: State) => state.workOrdersWithoutPOD;
export const selectDashboardWorkOrdersAll = (state: State) => state.dashboardWorkOrdersAll;
export const selectDashboardWorkOrdersWithPOD = (state: State) => state.dashboardWorkOrdersWithPOD;
export const selectDashboardWorkOrdersWithoutPOD = (state: State) => state.dashboardWorkOrdersWithoutPOD;
export const selectAgingReport = (state: State) => state.agingReport;
