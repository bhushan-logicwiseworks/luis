import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromReportCenterTable from './report-center-table.reducer';

export const featureKey = 'report-center';

export interface ReportsState {
    [fromReportCenterTable.featureKey]: fromReportCenterTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: ReportsState;
}
export function reducers(state: ReportsState | undefined, action: Action) {
    return combineReducers({
        // [fromReport.ReportsFeatureKey]: fromReport.reducer,
        [fromReportCenterTable.featureKey]: fromReportCenterTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, ReportsState>(featureKey);

/**
 * ReportCenter Table Selectors
 */
export namespace ReportCenterTableSelectors {
    const selectReportCenterTableState = createSelector(selectState, state => state[fromReportCenterTable.featureKey]);

    export const selectLoading = createSelector(selectReportCenterTableState, fromReportCenterTable.selectLoading);
    export const selectError = createSelector(selectReportCenterTableState, fromReportCenterTable.selectError);
    export const selectReports = createSelector(selectReportCenterTableState, fromReportCenterTable.selectReports);
    export const selectReport = createSelector(selectReportCenterTableState, fromReportCenterTable.selectReport);
}
