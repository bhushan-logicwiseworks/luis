import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromVendorCenterIndividual from './vendor-center-individual.reducer';
import * as fromVendorCenterTable from './vendor-center-table.reducer';

export const featureKey = 'vendor-center';

export interface VendorCenterTableState {
    [fromVendorCenterTable.featureKey]: fromVendorCenterTable.State;
    [fromVendorCenterIndividual.featureKey]: fromVendorCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: VendorCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: VendorCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromVendorCenterTable.featureKey]: fromVendorCenterTable.reducer,
        [fromVendorCenterIndividual.featureKey]: fromVendorCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, VendorCenterTableState>(featureKey);

/**
 * VendorCenter Table Selectors
 */
export namespace VendorCenterTableSelectors {
    const selectVendorCenterTableState = createSelector(selectState, state => state[fromVendorCenterTable.featureKey]);

    export const selectLoading = createSelector(selectVendorCenterTableState, fromVendorCenterTable.selectLoading);
    export const selectError = createSelector(selectVendorCenterTableState, fromVendorCenterTable.selectError);
    export const selectVendors = createSelector(selectVendorCenterTableState, fromVendorCenterTable.selectVendors);
}

/**
 * VendorCenter Individual Selectors
 */
export namespace VendorCenterIndividualSelectors {
    const selectVendorCenterIndividualState = createSelector(
        selectState,
        state => state[fromVendorCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectVendorCenterIndividualState,
        fromVendorCenterIndividual.selectLoading
    );
    export const selectVendor = createSelector(
        selectVendorCenterIndividualState,
        fromVendorCenterIndividual.selectVendor
    );
    export const selectError = createSelector(
        selectVendorCenterIndividualState,
        fromVendorCenterIndividual.selectError
    );
    export const selectPatientCityState = createSelector(
        selectVendorCenterIndividualState,
        fromVendorCenterIndividual.selectPatientCityState
    );
}
