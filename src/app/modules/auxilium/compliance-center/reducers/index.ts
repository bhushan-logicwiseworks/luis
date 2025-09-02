import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromComplianceCenterTable from './compliance-center-table.reducer';

export const featureKey = 'compliance-center';

export interface ComplianceCenterTableState {
    [fromComplianceCenterTable.featureKey]: fromComplianceCenterTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: ComplianceCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: ComplianceCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromComplianceCenterTable.featureKey]: fromComplianceCenterTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, ComplianceCenterTableState>(featureKey);

/**
 * Compliance Center Table Selectors
 */
export namespace ComplianceCenterTableSelectors {
    const selectComplianceCenterTableState = createSelector(
        selectState,
        state => state[fromComplianceCenterTable.featureKey]
    );

    export const selectLoading = createSelector(
        selectComplianceCenterTableState,
        fromComplianceCenterTable.selectLoading
    );
    export const selectError = createSelector(selectComplianceCenterTableState, fromComplianceCenterTable.selectError);
    export const selectCompliances = createSelector(
        selectComplianceCenterTableState,
        fromComplianceCenterTable.selectCompliances
    );
}
