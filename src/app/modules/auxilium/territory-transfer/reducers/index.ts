import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromReorderCenterTable from './territory-transfer.reducer';

export const featureKey = 'territory-center';

export interface ReorderCenterTableState {
    [fromReorderCenterTable.featureKey]: fromReorderCenterTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: ReorderCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: ReorderCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromReorderCenterTable.featureKey]: fromReorderCenterTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, ReorderCenterTableState>(featureKey);

/**
 * Territory Transfer Selectors
 */
export namespace TerritoryTransferSelectors {
    export const selectTerritoryTransferState = createSelector(
        selectState,
        state => state[fromReorderCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectTerritoryTransferState, fromReorderCenterTable.selectLoading);
    export const selectError = createSelector(selectTerritoryTransferState, fromReorderCenterTable.selectError);
    export const selectSalesResp = createSelector(selectTerritoryTransferState, fromReorderCenterTable.selectSalesResp);
    export const selectPatientCategory = createSelector(
        selectTerritoryTransferState,
        fromReorderCenterTable.selectPatientCategory
    );
}
