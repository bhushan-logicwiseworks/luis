import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromPhysicianCenterIndividual from './physician-center-individual.reducer';
import * as fromPhysicianCenterTable from './physician-center-table.reducer';

export const featureKey = 'physician-center';

export interface PhysicianCenterTableState {
    [fromPhysicianCenterTable.featureKey]: fromPhysicianCenterTable.State;
    [fromPhysicianCenterIndividual.featureKey]: fromPhysicianCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: PhysicianCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: PhysicianCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromPhysicianCenterTable.featureKey]: fromPhysicianCenterTable.reducer,
        [fromPhysicianCenterIndividual.featureKey]: fromPhysicianCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, PhysicianCenterTableState>(featureKey);

/**
 * PhysicianCenter Table Selectors
 */
export namespace PhysicianCenterTableSelectors {
    const selectPhysicianCenterTableState = createSelector(
        selectState,
        state => state[fromPhysicianCenterTable.featureKey]
    );

    export const selectLoading = createSelector(
        selectPhysicianCenterTableState,
        fromPhysicianCenterTable.selectLoading
    );
    export const selectError = createSelector(selectPhysicianCenterTableState, fromPhysicianCenterTable.selectError);
    export const selectPhysicians = createSelector(
        selectPhysicianCenterTableState,
        fromPhysicianCenterTable.selectPhysicians
    );
    export const selecttaxonomy = createSelector(
        selectPhysicianCenterTableState,
        fromPhysicianCenterTable.selecttaxonomy
    );
    export const selectPhysicianById = createSelector(
        selectPhysicianCenterTableState,
        fromPhysicianCenterTable.selectPhysicianById
    );
}

/**
 * PhysicianCenter Individual Selectors
 */
export namespace PhysicianCenterIndividualSelectors {
    const selectPhysicianCenterIndividualState = createSelector(
        selectState,
        state => state[fromPhysicianCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectPhysicianCenterIndividualState,
        fromPhysicianCenterIndividual.selectLoading
    );
    export const selectPhysician = createSelector(
        selectPhysicianCenterIndividualState,
        fromPhysicianCenterIndividual.selectPhysician
    );
    export const selectError = createSelector(
        selectPhysicianCenterIndividualState,
        fromPhysicianCenterIndividual.selectError
    );
    export const selectPatientCityState = createSelector(
        selectPhysicianCenterIndividualState,
        fromPhysicianCenterIndividual.selectPatientCityState
    );
    export const selectBranch = createSelector(
        selectPhysicianCenterIndividualState,
        fromPhysicianCenterIndividual.selectBranch
    );
}
