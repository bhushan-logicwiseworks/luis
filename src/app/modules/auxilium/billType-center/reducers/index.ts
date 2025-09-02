import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromBillTypeCenterIndividual from './billType-center-individual.reducer';
import * as fromBillTypeCenterTable from './billType-center-table.reducer';

export const featureKey = 'BillType-center';

export interface BillTypeCenterTableState {
    [fromBillTypeCenterTable.featureKey]: fromBillTypeCenterTable.State;
    [fromBillTypeCenterIndividual.featureKey]: fromBillTypeCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: BillTypeCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: BillTypeCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromBillTypeCenterTable.featureKey]: fromBillTypeCenterTable.reducer,
        [fromBillTypeCenterIndividual.featureKey]: fromBillTypeCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, BillTypeCenterTableState>(featureKey);

/**
 * BillTypeCenter Table Selectors
 */
export namespace BillTypeCenterTableSelectors {
    const selectBillTypeCenterTableState = createSelector(
        selectState,
        state => state[fromBillTypeCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectBillTypeCenterTableState, fromBillTypeCenterTable.selectLoading);
    export const selectError = createSelector(selectBillTypeCenterTableState, fromBillTypeCenterTable.selectError);
    export const selectBillTypeReps = createSelector(
        selectBillTypeCenterTableState,
        fromBillTypeCenterTable.selectBillTypesReps
    );
}

/**
 * BillTypeCenter Individual Selectors
 */
export namespace BillTypeCenterIndividualSelectors {
    const selectBillTypeCenterIndividualState = createSelector(
        selectState,
        state => state[fromBillTypeCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectBillTypeCenterIndividualState,
        fromBillTypeCenterIndividual.selectLoading
    );
    export const selectBillType = createSelector(
        selectBillTypeCenterIndividualState,
        fromBillTypeCenterIndividual.selectBillType
    );
    export const selectError = createSelector(
        selectBillTypeCenterIndividualState,
        fromBillTypeCenterIndividual.selectError
    );
}
