import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromAuditCenterTable from './audit-center-table.reducer';

export const featureKey = 'audit-center';

export interface AuditCenterTableState {
    [fromAuditCenterTable.featureKey]: fromAuditCenterTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: AuditCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: AuditCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromAuditCenterTable.featureKey]: fromAuditCenterTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, AuditCenterTableState>(featureKey);

/**
 * Audit Center Table Selectors
 */
export namespace AuditCenterTableSelectors {
    const selectAuditCenterTableState = createSelector(selectState, state => state[fromAuditCenterTable.featureKey]);

    export const selectLoading = createSelector(selectAuditCenterTableState, fromAuditCenterTable.selectLoading);
    export const selectError = createSelector(selectAuditCenterTableState, fromAuditCenterTable.selectError);
    export const selectAudits = createSelector(selectAuditCenterTableState, fromAuditCenterTable.selectAudits);
}
