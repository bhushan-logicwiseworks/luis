import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromPriceCenterTable from './price-center-table.reducer';

export const featureKey = 'price-center';

export interface PriceCenterTableState {
    [fromPriceCenterTable.featureKey]: fromPriceCenterTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: PriceCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: PriceCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromPriceCenterTable.featureKey]: fromPriceCenterTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, PriceCenterTableState>(featureKey);

/**
 * PhysicianCenter Table Selectors
 */
export namespace PriceCenterTableSelectors {
    const selectPriceCenterTableState = createSelector(selectState, state => state[fromPriceCenterTable.featureKey]);
    export const selectLoading = createSelector(selectPriceCenterTableState, fromPriceCenterTable.selectLoading);
    export const selectSearchItem = createSelector(selectPriceCenterTableState, fromPriceCenterTable.selectItem);
    export const selectedItemPriceList = createSelector(
        selectPriceCenterTableState,
        fromPriceCenterTable.selectedItemPriceList
    );
    export const selectedItemPriceInfo = createSelector(
        selectPriceCenterTableState,
        fromPriceCenterTable.selectedItemPriceInfo
    );
}
