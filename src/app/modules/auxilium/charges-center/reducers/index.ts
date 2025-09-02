import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromChargesCenterTable from './charges-center-table.reducer';

export const featureKey = 'new-charges-center';

export interface ChargesCenterTableState {
    [fromChargesCenterTable.featureKey]: fromChargesCenterTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: ChargesCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: ChargesCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromChargesCenterTable.featureKey]: fromChargesCenterTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, ChargesCenterTableState>(featureKey);

/**
 * ChargesCenter Table Selectors
 */
export namespace ChargesCenterTableSelectors {
    const selectChargesCenterTableState = createSelector(
        selectState,
        state => state[fromChargesCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectChargesCenterTableState, fromChargesCenterTable.selectLoading);
    export const selectError = createSelector(selectChargesCenterTableState, fromChargesCenterTable.selectError);
    export const selectChargesReps = createSelector(
        selectChargesCenterTableState,
        fromChargesCenterTable.selectChargesReps
    );
}
