import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromAccessCenterIndividual from './access-center-individual.reducer';
import * as fromAccessCenterTable from './access-center-table.reducer';

export const featureKey = 'access-center';

export interface AccessCenterTableState {
    [fromAccessCenterTable.featureKey]: fromAccessCenterTable.State;
    [fromAccessCenterIndividual.featureKey]: fromAccessCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: AccessCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: AccessCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromAccessCenterTable.featureKey]: fromAccessCenterTable.reducer,
        [fromAccessCenterIndividual.featureKey]: fromAccessCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, AccessCenterTableState>(featureKey);

/**
 * AccessCenter Table Selectors
 */
export namespace AccessCenterTableSelectors {
    const selectAccessCenterTableState = createSelector(selectState, state => state[fromAccessCenterTable.featureKey]);

    export const selectLoading = createSelector(selectAccessCenterTableState, fromAccessCenterTable.selectLoading);
    export const selectError = createSelector(selectAccessCenterTableState, fromAccessCenterTable.selectError);
    export const selectUsers = createSelector(selectAccessCenterTableState, fromAccessCenterTable.selectAccessList);
}

/**
 * AccessCenter Individual Selectors
 */
export namespace AccessCenterIndividualSelectors {
    const selectAccessCenterIndividualState = createSelector(
        selectState,
        state => state[fromAccessCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectAccessCenterIndividualState,
        fromAccessCenterIndividual.selectLoading
    );
    export const selectError = createSelector(
        selectAccessCenterIndividualState,
        fromAccessCenterIndividual.selectError
    );
    export const selectUser = createSelector(
        selectAccessCenterIndividualState,
        fromAccessCenterIndividual.selectAccess
    );
}
