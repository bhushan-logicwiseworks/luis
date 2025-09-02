import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromSalesCenterIndividual from './sales-center-individual.reducer';
import * as fromSalesCenterTable from './sales-center-table.reducer';

export const featureKey = 'sales-center';

export interface SalesCenterTableState {
    [fromSalesCenterTable.featureKey]: fromSalesCenterTable.State;
    [fromSalesCenterIndividual.featureKey]: fromSalesCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: SalesCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: SalesCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromSalesCenterTable.featureKey]: fromSalesCenterTable.reducer,
        [fromSalesCenterIndividual.featureKey]: fromSalesCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, SalesCenterTableState>(featureKey);

/**
 * SalesCenter Table Selectors
 */
export namespace SalesCenterTableSelectors {
    const selectSalesCenterTableState = createSelector(selectState, state => state[fromSalesCenterTable.featureKey]);

    export const selectLoading = createSelector(selectSalesCenterTableState, fromSalesCenterTable.selectLoading);
    export const selectError = createSelector(selectSalesCenterTableState, fromSalesCenterTable.selectError);
    export const selectSalesReps = createSelector(selectSalesCenterTableState, fromSalesCenterTable.selectSalesReps);
    export const selectSalesRepById = createSelector(
        selectSalesCenterTableState,
        fromSalesCenterTable.selectSalesRepById
    );
    export const selectSalesCityState = createSelector(
        selectSalesCenterTableState,
        fromSalesCenterTable.selectSalesCityState
    );
}

/**
 * SalesCenter Individual Selectors
 */
export namespace SalesCenterIndividualSelectors {
    const selectSalesCenterIndividualState = createSelector(
        selectState,
        state => state[fromSalesCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectSalesCenterIndividualState,
        fromSalesCenterIndividual.selectLoading
    );
    export const selectSalesRep = createSelector(
        selectSalesCenterIndividualState,
        fromSalesCenterIndividual.selectSalesRep
    );
    export const selectError = createSelector(selectSalesCenterIndividualState, fromSalesCenterIndividual.selectError);
    export const selectBranch = createSelector(
        selectSalesCenterIndividualState,
        fromSalesCenterIndividual.selectBranch
    );
}
