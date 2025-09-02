import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromIntakeCenterTable from './intake-center-table.reducer';

export const featureKey = 'intake-center';

export interface IntakeCenterTableState {
    [fromIntakeCenterTable.featureKey]: fromIntakeCenterTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: IntakeCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: IntakeCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromIntakeCenterTable.featureKey]: fromIntakeCenterTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, IntakeCenterTableState>(featureKey);

/**
 * Intake Center Table Selectors
 */
export namespace IntakeCenterTableSelectors {
    const selectIntakeCenterTableState = createSelector(selectState, state => state[fromIntakeCenterTable.featureKey]);

    export const selectLoading = createSelector(selectIntakeCenterTableState, fromIntakeCenterTable.selectLoading);
    export const selectError = createSelector(selectIntakeCenterTableState, fromIntakeCenterTable.selectError);
    export const selectIntakes = createSelector(selectIntakeCenterTableState, fromIntakeCenterTable.selectIntakes);
}
