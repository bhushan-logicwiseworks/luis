import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromCodeCenterIndividual from './code-center-individual.reducer';
import * as fromCodeCenterTable from './code-center-table.reducer';

export const featureKey = 'code-center';

export interface CodeCenterTableState {
    [fromCodeCenterTable.featureKey]: fromCodeCenterTable.State;
    [fromCodeCenterIndividual.featureKey]: fromCodeCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: CodeCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: CodeCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromCodeCenterTable.featureKey]: fromCodeCenterTable.reducer,
        [fromCodeCenterIndividual.featureKey]: fromCodeCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, CodeCenterTableState>(featureKey);

/**
 * CodeCenter Table Selectors
 */
export namespace CodeCenterTableSelectors {
    const selectCodeCenterTableState = createSelector(selectState, state => state[fromCodeCenterTable.featureKey]);

    export const selectLoading = createSelector(selectCodeCenterTableState, fromCodeCenterTable.selectLoading);
    export const selectError = createSelector(selectCodeCenterTableState, fromCodeCenterTable.selectError);
    export const selectCodeReps = createSelector(selectCodeCenterTableState, fromCodeCenterTable.selectCodes);
}

/**
 * CodeCenter Individual Selectors
 */
export namespace CodeCenterIndividualSelectors {
    const selectCodeCenterIndividualState = createSelector(
        selectState,
        state => state[fromCodeCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectCodeCenterIndividualState,
        fromCodeCenterIndividual.selectLoading
    );
    export const selectCode = createSelector(selectCodeCenterIndividualState, fromCodeCenterIndividual.selectCode);
    export const selectError = createSelector(selectCodeCenterIndividualState, fromCodeCenterIndividual.selectError);
}
