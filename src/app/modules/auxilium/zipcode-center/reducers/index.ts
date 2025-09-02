import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromZipCodeCenterIndividual from './zipcode-center-individual.reducer';
import * as fromZipCodeCenterTable from './zipcode-center-table.reducer';

export const featureKey = 'zipcode-center';

export interface ZipCodeCenterTableState {
    [fromZipCodeCenterTable.featureKey]: fromZipCodeCenterTable.State;
    [fromZipCodeCenterIndividual.featureKey]: fromZipCodeCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: ZipCodeCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: ZipCodeCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromZipCodeCenterTable.featureKey]: fromZipCodeCenterTable.reducer,
        [fromZipCodeCenterIndividual.featureKey]: fromZipCodeCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, ZipCodeCenterTableState>(featureKey);

/**
 * ZipCodeCenter Table Selectors
 */
export namespace ZipCodeCenterTableSelectors {
    const selectZipCodeCenterTableState = createSelector(
        selectState,
        state => state[fromZipCodeCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectZipCodeCenterTableState, fromZipCodeCenterTable.selectLoading);
    export const selectError = createSelector(selectZipCodeCenterTableState, fromZipCodeCenterTable.selectError);
    export const selectZipCodes = createSelector(selectZipCodeCenterTableState, fromZipCodeCenterTable.selectZipCodes);
}

/**
 * ZipCodeCenter Individual Selectors
 */
export namespace ZipCodeCenterIndividualSelectors {
    const selectZipCodeCenterIndividualState = createSelector(
        selectState,
        state => state[fromZipCodeCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectZipCodeCenterIndividualState,
        fromZipCodeCenterIndividual.selectLoading
    );
    export const selectZipCode = createSelector(
        selectZipCodeCenterIndividualState,
        fromZipCodeCenterIndividual.selectZipCode
    );
    export const selectError = createSelector(
        selectZipCodeCenterIndividualState,
        fromZipCodeCenterIndividual.selectError
    );
}
