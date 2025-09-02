import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromWorkOrderCenterIndividual from './work-order-center-individual.reducer';
import * as fromWorkOrderCenterTable from './work-order-center-table.reducer';

export const featureKey = 'work-order-center';

export interface WorkOrderCenterTableState {
    [fromWorkOrderCenterTable.featureKey]: fromWorkOrderCenterTable.State;
    [fromWorkOrderCenterIndividual.featureKey]: fromWorkOrderCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: WorkOrderCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: WorkOrderCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromWorkOrderCenterTable.featureKey]: fromWorkOrderCenterTable.reducer,
        [fromWorkOrderCenterIndividual.featureKey]: fromWorkOrderCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, WorkOrderCenterTableState>(featureKey);

/**
 * WorkOrderCenter Table Selectors
 */
export namespace WorkOrderCenterTableSelectors {
    const selectWorkOrderCenterTableState = createSelector(
        selectState,
        state => state[fromWorkOrderCenterTable.featureKey]
    );

    export const selectLoading = createSelector(
        selectWorkOrderCenterTableState,
        fromWorkOrderCenterTable.selectLoading
    );
    export const selectError = createSelector(selectWorkOrderCenterTableState, fromWorkOrderCenterTable.selectError);
    export const selectWorkOrderReps = createSelector(
        selectWorkOrderCenterTableState,
        fromWorkOrderCenterTable.selectWorkOrderCenterReps
    );
    export const selectWorkOrderSearch = createSelector(
        selectWorkOrderCenterTableState,
        fromWorkOrderCenterTable.selectWorkOrderSearch
    );
}

/**
 * WorkOrderCenter Individual Selectors
 */
export namespace WorkOrderCenterIndividualSelectors {
    const selectWorkOrderCenterIndividualState = createSelector(
        selectState,
        state => state[fromWorkOrderCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectWorkOrderCenterIndividualState,
        fromWorkOrderCenterIndividual.selectLoading
    );
    export const selectWorkOrderIndividual = createSelector(
        selectWorkOrderCenterIndividualState,
        fromWorkOrderCenterIndividual.selectWorkOrderCenterRep
    );
    export const selectDropDownSalesrep = createSelector(
        selectWorkOrderCenterIndividualState,
        fromWorkOrderCenterIndividual.selectDropDownSalesRep
    );
    export const selectBillType = createSelector(
        selectWorkOrderCenterIndividualState,
        fromWorkOrderCenterIndividual.selectBillType
    );
    export const selectPayorsDetail = createSelector(
        selectWorkOrderCenterIndividualState,
        fromWorkOrderCenterIndividual.selectPayorsDetail
    );
    export const selectError = createSelector(
        selectWorkOrderCenterIndividualState,
        fromWorkOrderCenterIndividual.selectError
    );
    export const selectItemCode = createSelector(
        selectWorkOrderCenterIndividualState,
        fromWorkOrderCenterIndividual.selectItemCode
    );
    export const selectReferCode = createSelector(
        selectWorkOrderCenterIndividualState,
        fromWorkOrderCenterIndividual.selectReferCode
    );
    export const selectBranch = createSelector(
        selectWorkOrderCenterIndividualState,
        fromWorkOrderCenterIndividual.selectBranch
    );
    export const selectBatchEligibility = createSelector(
        selectWorkOrderCenterIndividualState,
        fromWorkOrderCenterIndividual.selectBatchEligibility
    );
}
