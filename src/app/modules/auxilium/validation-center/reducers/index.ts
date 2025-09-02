import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromValidationCenterIndividual from './validation-center-individual.reducer';
import * as fromValidationCenterTable from './validation-center-table.reducer';

export const featureKey = 'validation-center';

export interface ValidationCenterTableState {
    [fromValidationCenterTable.featureKey]: fromValidationCenterTable.State;
    [fromValidationCenterIndividual.featureKey]: fromValidationCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: ValidationCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: ValidationCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromValidationCenterTable.featureKey]: fromValidationCenterTable.reducer,
        [fromValidationCenterIndividual.featureKey]: fromValidationCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, ValidationCenterTableState>(featureKey);

/**
 * PhysicianCenter Table Selectors
 */
export namespace ValidationCenterTableSelectors {
    const selectPhysicianCenterTableState = createSelector(
        selectState,
        state => state[fromValidationCenterTable.featureKey]
    );

    export const selectLoading = createSelector(
        selectPhysicianCenterTableState,
        fromValidationCenterTable.selectLoading
    );
    export const selectError = createSelector(selectPhysicianCenterTableState, fromValidationCenterTable.selectError);
    export const selectValidations = createSelector(
        selectPhysicianCenterTableState,
        fromValidationCenterTable.selectValidations
    );
    export const selecttaxonomy = createSelector(
        selectPhysicianCenterTableState,
        fromValidationCenterTable.selecttaxonomy
    );
    export const selectValidationById = createSelector(
        selectPhysicianCenterTableState,
        fromValidationCenterTable.selectValidationById
    );
}

/**
 * PhysicianCenter Individual Selectors
 */
export namespace ValidationCenterIndividualSelectors {
    const selectPhysicianCenterIndividualState = createSelector(
        selectState,
        state => state[fromValidationCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectPhysicianCenterIndividualState,
        fromValidationCenterIndividual.selectLoading
    );
    export const selectValidation = createSelector(
        selectPhysicianCenterIndividualState,
        fromValidationCenterIndividual.selectValidation
    );
    export const selectError = createSelector(
        selectPhysicianCenterIndividualState,
        fromValidationCenterIndividual.selectError
    );
    export const selectPatientCityState = createSelector(
        selectPhysicianCenterIndividualState,
        fromValidationCenterIndividual.selectPatientCityState
    );
}
