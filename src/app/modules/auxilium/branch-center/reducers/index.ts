import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromBranchCenterIndividual from './branch-center-individual.reducer';
import * as fromBranchCenterTable from './branch-center-table.reducer';

export const featureKey = 'branch-center';

export interface BranchCenterTableState {
    [fromBranchCenterTable.featureKey]: fromBranchCenterTable.State;
    [fromBranchCenterIndividual.featureKey]: fromBranchCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: BranchCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: BranchCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromBranchCenterTable.featureKey]: fromBranchCenterTable.reducer,
        [fromBranchCenterIndividual.featureKey]: fromBranchCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, BranchCenterTableState>(featureKey);

/**
 * BranchCenter Table Selectors
 */
export namespace BranchCenterTableSelectors {
    const selectBranchCenterTableState = createSelector(selectState, state => state[fromBranchCenterTable.featureKey]);

    export const selectLoading = createSelector(selectBranchCenterTableState, fromBranchCenterTable.selectLoading);
    export const selectError = createSelector(selectBranchCenterTableState, fromBranchCenterTable.selectError);
    export const selectBranches = createSelector(selectBranchCenterTableState, fromBranchCenterTable.selectBranches);
}

/**
 * BranchCenter Individual Selectors
 */
export namespace BranchCenterIndividualSelectors {
    const selectBranchCenterIndividualState = createSelector(
        selectState,
        state => state[fromBranchCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectBranchCenterIndividualState,
        fromBranchCenterIndividual.selectLoading
    );
    export const selectBranchRep = createSelector(
        selectBranchCenterIndividualState,
        fromBranchCenterIndividual.selectBranchRep
    );
    export const selectError = createSelector(
        selectBranchCenterIndividualState,
        fromBranchCenterIndividual.selectError
    );
    export const selectPatientCityState = createSelector(
        selectBranchCenterIndividualState,
        fromBranchCenterIndividual.selectPatientCityState
    );
}
