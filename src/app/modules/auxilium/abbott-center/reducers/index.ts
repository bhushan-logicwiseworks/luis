import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromAbbottCenterIndividual from './abbott-center-individual.reducer';
import * as fromAbbottCenterTable from './abbott-center-table.reducer';

export const featureKey = 'abbott-center';

export interface AbbottCenterTableState {
    [fromAbbottCenterTable.featureKey]: fromAbbottCenterTable.State;
    [fromAbbottCenterIndividual.featureKey]: fromAbbottCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: AbbottCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: AbbottCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromAbbottCenterTable.featureKey]: fromAbbottCenterTable.reducer,
        [fromAbbottCenterIndividual.featureKey]: fromAbbottCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, AbbottCenterTableState>(featureKey);

/**
 * DexcomCenter Table Selectors
 */
export namespace AbbottCenterTableSelectors {
    const selectAbbottCenterTableState = createSelector(selectState, state => state[fromAbbottCenterTable.featureKey]);

    export const selectLoading = createSelector(selectAbbottCenterTableState, fromAbbottCenterTable.selectLoading);
    export const selectError = createSelector(selectAbbottCenterTableState, fromAbbottCenterTable.selectError);
    export const selectUsers = createSelector(selectAbbottCenterTableState, fromAbbottCenterTable.selectUsers);
}

/**
 * DexcomCenter Individual Selectors
 */
export namespace AbbottCenterIndividualSelectors {
    const selectAbbottCenterIndividualState = createSelector(
        selectState,
        state => state[fromAbbottCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectAbbottCenterIndividualState,
        fromAbbottCenterIndividual.selectLoading
    );
    export const selectError = createSelector(
        selectAbbottCenterIndividualState,
        fromAbbottCenterIndividual.selectError
    );
    export const selectUser = createSelector(selectAbbottCenterIndividualState, fromAbbottCenterIndividual.selectUser);
}
