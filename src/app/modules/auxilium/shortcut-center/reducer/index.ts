import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromShortcutsTable from './shortcut-center-table.reducers';

export const featureKey = 'shortcut-center';

export interface ShortcutsTableState {
    [fromShortcutsTable.featureKey]: fromShortcutsTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: ShortcutsTableState;
}

/**
 * Reducers
 */
export function reducers(state: ShortcutsTableState | undefined, action: Action) {
    return combineReducers({
        [fromShortcutsTable.featureKey]: fromShortcutsTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, ShortcutsTableState>(featureKey);

/**
 * DexcomCenter Table Selectors
 */
export namespace ShortcutsTableSelectors {
    const selectShortcutCenterTableState = createSelector(selectState, state => state[fromShortcutsTable.featureKey]);

    export const selectLoading = createSelector(selectShortcutCenterTableState, fromShortcutsTable.selectLoading);
    export const selectError = createSelector(selectShortcutCenterTableState, fromShortcutsTable.selectError);
    export const selectShortcuts = createSelector(selectShortcutCenterTableState, fromShortcutsTable.selectShortcuts);
    export const selectShortcutItemCodes = createSelector(
        selectShortcutCenterTableState,
        fromShortcutsTable.selectShortcutItemCodes
    );

    export const selectEditShortcutsLoading = createSelector(
        selectShortcutCenterTableState,
        fromShortcutsTable.selectEditShortcutsLoading
    );
    export const selectEditShortcutsError = createSelector(
        selectShortcutCenterTableState,
        fromShortcutsTable.selectEditShortcutsError
    );
    export const selectEditShortcuts = createSelector(
        selectShortcutCenterTableState,
        fromShortcutsTable.selectEditShortcuts
    );
    export const selectBillType = createSelector(selectShortcutCenterTableState, fromShortcutsTable.selectBillType);

    export const selectItemCode = createSelector(selectShortcutCenterTableState, fromShortcutsTable.selectItemCode);
}
