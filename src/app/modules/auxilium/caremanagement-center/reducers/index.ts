import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromCareManagementCenterTable from './caremanagement-center-table.reducer';

export const featureKey = 'caremanagement-center';

export interface CareManagementTableState {
    [fromCareManagementCenterTable.featureKey]: fromCareManagementCenterTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: CareManagementTableState;
}

/**
 * Reducers
 */
export function reducers(state: CareManagementTableState | undefined, action: Action) {
    return combineReducers({
        [fromCareManagementCenterTable.featureKey]: fromCareManagementCenterTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, CareManagementTableState>(featureKey);

/**
 * Compliance Center Table Selectors
 */
export namespace CareManagementTableSelectors {
    const selectCareManagementTableState = createSelector(
        selectState,
        state => state[fromCareManagementCenterTable.featureKey]
    );

    export const selectLoading = createSelector(
        selectCareManagementTableState,
        fromCareManagementCenterTable.selectLoading
    );
    export const selectError = createSelector(
        selectCareManagementTableState,
        fromCareManagementCenterTable.selectError
    );
    export const selectCareManagements = createSelector(
        selectCareManagementTableState,
        fromCareManagementCenterTable.selectCareManagements
    );
}
