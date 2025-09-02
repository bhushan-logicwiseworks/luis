import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromMapCenterTable from './map-center-table.reducer';

export const featureKey = 'map-center';

export interface MapListTableState {
    [fromMapCenterTable.featureKey]: fromMapCenterTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: MapListTableState;
}

/**
 * Reducers
 */
export function reducers(state: MapListTableState | undefined, action: Action) {
    return combineReducers({
        [fromMapCenterTable.featureKey]: fromMapCenterTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, MapListTableState>(featureKey);

/**
 * Map List Table Selectors
 */
export namespace MapListTableSelectors {
    const selectMapListTableState = createSelector(selectState, state => state[fromMapCenterTable.featureKey]);

    export const selectLoading = createSelector(selectMapListTableState, fromMapCenterTable.selectLoading);
    export const selectError = createSelector(selectMapListTableState, fromMapCenterTable.selectError);
    export const selectMapList = createSelector(selectMapListTableState, fromMapCenterTable.selectMapList);
    export const selectSalesReps = createSelector(selectMapListTableState, fromMapCenterTable.selectSalesReps);
}
