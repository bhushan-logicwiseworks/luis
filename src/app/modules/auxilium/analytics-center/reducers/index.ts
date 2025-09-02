import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromAnalytics from '../reducers/analytics-data.reducer';

export const featureKey = 'analytics-data';

export interface AnalyticsDataState {
    [fromAnalytics.analyticsDatasFeatureKey]: fromAnalytics.State;
}

export interface State extends fromRoot.State {
    [featureKey]: AnalyticsDataState;
}

export function reducers(state: AnalyticsDataState | undefined, action: Action) {
    return combineReducers({
        [fromAnalytics.analyticsDatasFeatureKey]: fromAnalytics.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, AnalyticsDataState>(featureKey);

/**
 * FileVault Selectors
 */
export namespace AnalyticsSelectors {
    const selectVaultsState = createSelector(selectState, state => state[fromAnalytics.analyticsDatasFeatureKey]);

    export const selectIds = createSelector(selectVaultsState, fromAnalytics.selectIds);
    export const selectEntities = createSelector(selectVaultsState, fromAnalytics.selectEntities);
    export const selectAll = createSelector(selectVaultsState, fromAnalytics.selectAll);
    export const selectTotal = createSelector(selectVaultsState, fromAnalytics.selectTotal);

    export const selectLoaded = createSelector(selectVaultsState, fromAnalytics.selectLoaded);
}
