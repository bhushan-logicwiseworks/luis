import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromIcdCodesCenterIndividual from './icdcode-center-individual.reducer';
import * as fromIcdCodesCenterTable from './icdcode-center-table.reducer';

export const featureKey = 'IcdCodes-center';

export interface IcdCodesCenterTableState {
    [fromIcdCodesCenterTable.featureKey]: fromIcdCodesCenterTable.State;
    [fromIcdCodesCenterIndividual.featureKey]: fromIcdCodesCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: IcdCodesCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: IcdCodesCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromIcdCodesCenterTable.featureKey]: fromIcdCodesCenterTable.reducer,
        [fromIcdCodesCenterIndividual.featureKey]: fromIcdCodesCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, IcdCodesCenterTableState>(featureKey);

/**
 * IcdCodesCenter Table Selectors
 */
export namespace IcdCodesCenterTableSelectors {
    const selectIcdCodesCenterTableState = createSelector(
        selectState,
        state => state[fromIcdCodesCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectIcdCodesCenterTableState, fromIcdCodesCenterTable.selectLoading);
    export const selectError = createSelector(selectIcdCodesCenterTableState, fromIcdCodesCenterTable.selectError);
    export const selectIcdCodesReps = createSelector(
        selectIcdCodesCenterTableState,
        fromIcdCodesCenterTable.selectIcdCodesReps
    );
}

/**
 * IcdCodesCenter Individual Selectors
 */
export namespace IcdCodesCenterIndividualSelectors {
    const selectIcdCodesCenterIndividualState = createSelector(
        selectState,
        state => state[fromIcdCodesCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectIcdCodesCenterIndividualState,
        fromIcdCodesCenterIndividual.selectLoading
    );
    export const selecticdcode = createSelector(
        selectIcdCodesCenterIndividualState,
        fromIcdCodesCenterIndividual.selectIcdCode
    );
    export const selectIcdCodeById = createSelector(
        selectIcdCodesCenterIndividualState,
        fromIcdCodesCenterIndividual.selectIcdCodeById
    );
    export const selectError = createSelector(
        selectIcdCodesCenterIndividualState,
        fromIcdCodesCenterIndividual.selectError
    );
}
