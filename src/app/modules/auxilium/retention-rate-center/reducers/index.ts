import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as retentionRateTable from './retention-rate-table.reducers';

export const featureKey = 'retention-rate-center';

export interface RetentionRateTableState {
    [retentionRateTable.featureKey]: retentionRateTable.State;
    [retentionRateTable.featureKey]: retentionRateTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: RetentionRateTableState;
}

/**
 * Reducers
 */
export function reducers(state: RetentionRateTableState | undefined, action: Action) {
    return combineReducers({
        [retentionRateTable.featureKey]: retentionRateTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, RetentionRateTableState>(featureKey);

/**
 * DexcomCenter Table Selectors
 */
export namespace RetentionRateTableSelectors {
    const selectDexcomCenterTableState = createSelector(selectState, state => state[retentionRateTable.featureKey]);

    export const selectLoading = createSelector(selectDexcomCenterTableState, retentionRateTable.selectLoading);
    export const selectError = createSelector(selectDexcomCenterTableState, retentionRateTable.selectError);
    export const selectRetentions = createSelector(selectDexcomCenterTableState, retentionRateTable.selectRetentions);
}
