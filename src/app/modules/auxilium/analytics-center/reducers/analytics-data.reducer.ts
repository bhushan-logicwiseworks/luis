import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Analytics } from 'app/shared/interfaces/auxilium/analytics-center/analytics.interface';
import * as AnalyticsDataActions from '../actions/analytics-data.actions';

export const analyticsDatasFeatureKey = 'analyticsDatas';

export interface State extends EntityState<Analytics> {
    // additional entities state properties
    loading: boolean;
    error: Error;
    loaded: boolean;
}

export const adapter: EntityAdapter<Analytics> = createEntityAdapter<Analytics>();

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    loading: false,
    loaded: false,
    error: null,
});

export const reducer = createReducer(
    initialState,
    on(AnalyticsDataActions.addAnalyticsData, (state, action) => adapter.addOne(action.analyticsData, state)),
    on(AnalyticsDataActions.upsertAnalyticsData, (state, action) => adapter.upsertOne(action.analyticsData, state)),
    on(AnalyticsDataActions.addAnalyticsDatas, (state, action) => adapter.addMany(action.analyticsDatas, state)),
    on(AnalyticsDataActions.upsertAnalyticsDatas, (state, action) => adapter.upsertMany(action.analyticsDatas, state)),
    on(AnalyticsDataActions.updateAnalyticsData, (state, action) => adapter.updateOne(action.analyticsData, state)),
    on(AnalyticsDataActions.updateAnalyticsDatas, (state, action) => adapter.updateMany(action.analyticsDatas, state)),
    on(AnalyticsDataActions.deleteAnalyticsData, (state, action) => adapter.removeOne(action.id, state)),
    on(AnalyticsDataActions.deleteAnalyticsDatas, (state, action) => adapter.removeMany(action.ids, state)),

    on(AnalyticsDataActions.loadAnalyticsDatas, state => ({ ...state, loading: true, error: null })),
    on(AnalyticsDataActions.loadAnalyticsDataSuccess, (state, action) =>
        adapter.setAll(action.analyticsData, { ...state, loading: false, error: null, loaded: false })
    ),
    on(AnalyticsDataActions.loadAnalyticsDataFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
        loaded: false,
    })),

    on(AnalyticsDataActions.clearAnalyticsDatas, state => adapter.removeAll(state))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectLoaded = (state: State) => state.loaded;
