import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromHotKeysCenterIndividual from './hotKeys-center-individual.reducer';
import * as fromHotKeysCenterTable from './hotKeys-center-table.reducer';

export const featureKey = 'Hotkeys-center';

export interface HotKeysCenterTableState {
    [fromHotKeysCenterTable.featureKey]: fromHotKeysCenterTable.State;
    [fromHotKeysCenterIndividual.featureKey]: fromHotKeysCenterIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: HotKeysCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: HotKeysCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromHotKeysCenterTable.featureKey]: fromHotKeysCenterTable.reducer,
        [fromHotKeysCenterIndividual.featureKey]: fromHotKeysCenterIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, HotKeysCenterTableState>(featureKey);

/**
 * HotKeysCenter Table Selectors
 */
export namespace HotKeysCenterTableSelectors {
    const selectHotKeysCenterTableState = createSelector(
        selectState,
        state => state[fromHotKeysCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectHotKeysCenterTableState, fromHotKeysCenterTable.selectLoading);
    export const selectError = createSelector(selectHotKeysCenterTableState, fromHotKeysCenterTable.selectError);
    export const selectHotKeysReps = createSelector(
        selectHotKeysCenterTableState,
        fromHotKeysCenterTable.selectHotKeysReps
    );
}

/**
 * HotKeysCenter Individual Selectors
 */
export namespace HotKeysCenterIndividualSelectors {
    const selectHotKeysCenterIndividualState = createSelector(
        selectState,
        state => state[fromHotKeysCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectHotKeysCenterIndividualState,
        fromHotKeysCenterIndividual.selectLoading
    );
    export const selectHotkey = createSelector(
        selectHotKeysCenterIndividualState,
        fromHotKeysCenterIndividual.selectHotkey
    );
    export const selectError = createSelector(
        selectHotKeysCenterIndividualState,
        fromHotKeysCenterIndividual.selectError
    );
}
