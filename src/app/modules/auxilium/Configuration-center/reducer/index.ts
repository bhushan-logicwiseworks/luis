import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as configurationsTable from './configuration-center-table.reducers';

export const featureKey = 'configuration-center';

export interface ConfigurationTableState {
    [configurationsTable.featureKey]: configurationsTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: ConfigurationTableState;
}

/**
 * Reducers
 */
export function reducers(state: ConfigurationTableState | undefined, action: Action) {
    return combineReducers({
        [configurationsTable.featureKey]: configurationsTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, ConfigurationTableState>(featureKey);

/**
 * DexcomCenter Table Selectors
 */
export namespace ConfigurationenterTableSelectors {
    const selectConfigurationCenterTableState = createSelector(
        selectState,
        state => state[configurationsTable.featureKey]
    );

    export const selectLoading = createSelector(selectConfigurationCenterTableState, configurationsTable.selectLoading);
    export const selectError = createSelector(selectConfigurationCenterTableState, configurationsTable.selectError);
    export const selectConfiguration = createSelector(
        selectConfigurationCenterTableState,
        configurationsTable.selectConfiguration
    );
}
