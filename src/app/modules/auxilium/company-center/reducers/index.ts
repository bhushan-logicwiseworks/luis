import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';

import * as fromCompanyCenterIndividual from './company-center-individual.reducer';
import * as fromCompanyCenterTable from './company-center-table.reducer';

export const featureKey = 'company-center';

export interface CompanyCenterTableState {
    [fromCompanyCenterTable.featureKey]: fromCompanyCenterTable.State;
    [fromCompanyCenterIndividual.featureKey]: fromCompanyCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: CompanyCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: CompanyCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromCompanyCenterTable.featureKey]: fromCompanyCenterTable.reducer,
        [fromCompanyCenterIndividual.featureKey]: fromCompanyCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, CompanyCenterTableState>(featureKey);

/**
 * CompanyCenter Table Selectors
 */
export namespace CompanyCenterTableSelectors {
    const selectCompanyCenterTableState = createSelector(
        selectState,
        state => state[fromCompanyCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectCompanyCenterTableState, fromCompanyCenterTable.selectLoading);
    export const selectError = createSelector(selectCompanyCenterTableState, fromCompanyCenterTable.selectError);
    export const selectCompany = createSelector(selectCompanyCenterTableState, fromCompanyCenterTable.selectCompany);
    export const selectCompanyById = createSelector(
        selectCompanyCenterTableState,
        fromCompanyCenterTable.selectCompanyById
    );
    export const selectTaxonomy = createSelector(selectCompanyCenterTableState, fromCompanyCenterTable.selectTaxonomy);
}

/**
 * CompanyCenter Individual Selectors
 */
export namespace CompanyCenterIndividualSelectors {
    const selectCompanyCenterIndividualState = createSelector(
        selectState,
        state => state[fromCompanyCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectCompanyCenterIndividualState,
        fromCompanyCenterIndividual.selectLoading
    );
    export const selectError = createSelector(
        selectCompanyCenterIndividualState,
        fromCompanyCenterIndividual.selectError
    );
    export const selectCompanyCityState = createSelector(
        selectCompanyCenterIndividualState,
        fromCompanyCenterIndividual.selectCompanyCityState
    );
}
