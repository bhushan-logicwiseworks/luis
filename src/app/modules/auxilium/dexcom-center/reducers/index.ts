import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromDexcomCenterIndividual from './dexcom-center-individual.reducer';
import * as fromDexcomCenterTable from './dexcom-center-table.reducer';

export const featureKey = 'dexcom-center';

export interface DexcomCenterTableState {
    [fromDexcomCenterTable.featureKey]: fromDexcomCenterTable.State;
    [fromDexcomCenterIndividual.featureKey]: fromDexcomCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: DexcomCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: DexcomCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromDexcomCenterTable.featureKey]: fromDexcomCenterTable.reducer,
        [fromDexcomCenterIndividual.featureKey]: fromDexcomCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, DexcomCenterTableState>(featureKey);

/**
 * DexcomCenter Table Selectors
 */
export namespace DexcomCenterTableSelectors {
    const selectDexcomCenterTableState = createSelector(selectState, state => state[fromDexcomCenterTable.featureKey]);

    export const selectLoading = createSelector(selectDexcomCenterTableState, fromDexcomCenterTable.selectLoading);
    export const selectError = createSelector(selectDexcomCenterTableState, fromDexcomCenterTable.selectError);
    export const selectUsers = createSelector(selectDexcomCenterTableState, fromDexcomCenterTable.selectUsers);
}

/**
 * DexcomCenter Individual Selectors
 */
export namespace DexcomCenterIndividualSelectors {
    const selectDexcomCenterIndividualState = createSelector(
        selectState,
        state => state[fromDexcomCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectDexcomCenterIndividualState,
        fromDexcomCenterIndividual.selectLoading
    );
    export const selectError = createSelector(
        selectDexcomCenterIndividualState,
        fromDexcomCenterIndividual.selectError
    );
    export const selectUser = createSelector(selectDexcomCenterIndividualState, fromDexcomCenterIndividual.selectUser);
}
