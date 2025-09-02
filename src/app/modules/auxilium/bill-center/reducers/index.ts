import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromBillCenterTable from './bill-center-table.reducer';

export const featureKey = 'bill-center';

export interface BillCenterTableState {
    [fromBillCenterTable.featureKey]: fromBillCenterTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: BillCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: BillCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromBillCenterTable.featureKey]: fromBillCenterTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, BillCenterTableState>(featureKey);

/**
 * BillCenter Table Selectors
 */
export namespace BillCenterTableSelectors {
    const selectBillCenterTableState = createSelector(selectState, state => state[fromBillCenterTable.featureKey]);

    export const selectLoading = createSelector(selectBillCenterTableState, fromBillCenterTable.selectLoading);
    export const selectError = createSelector(selectBillCenterTableState, fromBillCenterTable.selectError);
    export const selectChargesReps = createSelector(selectBillCenterTableState, fromBillCenterTable.selectChargesReps);
    export const selectValidationsReps = createSelector(
        selectBillCenterTableState,
        fromBillCenterTable.selectValidationsReps
    );
    export const selectHeldItemsReportReps = createSelector(
        selectBillCenterTableState,
        fromBillCenterTable.selectHeldItemsReportReps
    );
    export const selectHeldItemsDetails = createSelector(
        selectBillCenterTableState,
        fromBillCenterTable.selectHeldItemsDetails
    );
    export const selectClaimFor837 = createSelector(selectBillCenterTableState, fromBillCenterTable.selectClaimFor837);
    export const selectBillDashboard = createSelector(
        selectBillCenterTableState,
        fromBillCenterTable.selectBillDashboard
    );
    export const selectWorkOrdersAll = createSelector(
        selectBillCenterTableState,
        fromBillCenterTable.selectWorkOrdersAll
    );
    export const selectWorkOrdersWithPOD = createSelector(
        selectBillCenterTableState,
        fromBillCenterTable.selectWorkOrdersWithPOD
    );
    export const selectWorkOrdersWithoutPOD = createSelector(
        selectBillCenterTableState,
        fromBillCenterTable.selectWorkOrdersWithoutPOD
    );

    export const selectDashboardWorkOrdersAll = createSelector(
        selectBillCenterTableState,
        fromBillCenterTable.selectDashboardWorkOrdersAll
    );
    export const selectDashboardWorkOrdersWithPOD = createSelector(
        selectBillCenterTableState,
        fromBillCenterTable.selectDashboardWorkOrdersWithPOD
    );
    export const selectDashboardWorkOrdersWithoutPOD = createSelector(
        selectBillCenterTableState,
        fromBillCenterTable.selectDashboardWorkOrdersWithoutPOD
    );
    export const selectAgingReport = createSelector(selectBillCenterTableState, fromBillCenterTable.selectAgingReport);
}
