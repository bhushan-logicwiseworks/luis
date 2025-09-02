import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromBillingEventsCenterCreate from './billing-events-center-create.reducer';
import * as fromBillingEventsCenterTable from './billing-events-center-table.reducer';

export const featureKey = 'billing-events-center';

export interface BillingEventsCenterTableState {
    [fromBillingEventsCenterTable.featureKey]: fromBillingEventsCenterTable.State;
    [fromBillingEventsCenterCreate.featureKey]: fromBillingEventsCenterCreate.State;
}

export interface State extends fromRoot.State {
    [featureKey]: BillingEventsCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: BillingEventsCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromBillingEventsCenterTable.featureKey]: fromBillingEventsCenterTable.reducer,
        [fromBillingEventsCenterCreate.featureKey]: fromBillingEventsCenterCreate.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, BillingEventsCenterTableState>(featureKey);

/**
 * Billing Events Center Table Selectors
 */
export namespace BillingEventsCenterTableSelectors {
    const selectBillingEventsCenterTableState = createSelector(
        selectState,
        state => state[fromBillingEventsCenterTable.featureKey]
    );

    export const selectLoading = createSelector(
        selectBillingEventsCenterTableState,
        fromBillingEventsCenterTable.selectLoading
    );
    export const selectError = createSelector(
        selectBillingEventsCenterTableState,
        fromBillingEventsCenterTable.selectError
    );
    export const selectBillingEvents = createSelector(
        selectBillingEventsCenterTableState,
        fromBillingEventsCenterTable.selectBillingEvents
    );
}

export namespace BillingEventsCenterCreateSelectors {
    const selectBillingEventsCenterCreateState = createSelector(
        selectState,
        state => state[fromBillingEventsCenterCreate.featureKey]
    );

    export const selectLoading = createSelector(
        selectBillingEventsCenterCreateState,
        fromBillingEventsCenterCreate.selectLoading
    );
    export const selectError = createSelector(
        selectBillingEventsCenterCreateState,
        fromBillingEventsCenterCreate.selectError
    );
    // export const selectBillingEvent = createSelector(
    //     selectBillingEventsCenterCreateState,
    //     fromBillingEventsCenterCreate.selectBillingEvent
    // );
    export const selectOwners = createSelector(
        selectBillingEventsCenterCreateState,
        fromBillingEventsCenterCreate.selectOwners
    );
    export const selectLoadingOwners = createSelector(
        selectBillingEventsCenterCreateState,
        fromBillingEventsCenterCreate.selectLoadingOwners
    );
}
