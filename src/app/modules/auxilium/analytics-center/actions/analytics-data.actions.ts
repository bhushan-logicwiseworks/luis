import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Analytics } from 'app/shared/interfaces/auxilium/analytics-center/analytics.interface';

export const loadAnalyticsDatas = createAction('[AnalyticsData/API] Load AnalyticsDatas');

export const loadAnalyticsDataSuccess = createAction(
    '[AnalyticsData/API] Load AnalyticsData Success',
    props<{ analyticsData: Analytics[] }>()
);
export const loadAnalyticsDataFailure = createAction(
    '[AnalyticsData/API] Load AnalyticsData Failure',
    props<{ error: Error }>()
);

export const setLoading = createAction('[Analytics] Set Loading', props<{ loading: boolean }>());

export const addAnalyticsData = createAction(
    '[AnalyticsData/API] Add AnalyticsData',
    props<{ analyticsData: Analytics }>()
);

export const upsertAnalyticsData = createAction(
    '[AnalyticsData/API] Upsert AnalyticsData',
    props<{ analyticsData: Analytics }>()
);

export const addAnalyticsDatas = createAction(
    '[AnalyticsData/API] Add AnalyticsDatas',
    props<{ analyticsDatas: Analytics[] }>()
);

export const upsertAnalyticsDatas = createAction(
    '[AnalyticsData/API] Upsert AnalyticsDatas',
    props<{ analyticsDatas: Analytics[] }>()
);

export const updateAnalyticsData = createAction(
    '[AnalyticsData/API] Update AnalyticsData',
    props<{ analyticsData: Update<Analytics> }>()
);

export const updateAnalyticsDatas = createAction(
    '[AnalyticsData/API] Update AnalyticsDatas',
    props<{ analyticsDatas: Update<Analytics>[] }>()
);

export const deleteAnalyticsData = createAction('[AnalyticsData/API] Delete AnalyticsData', props<{ id: string }>());

export const deleteAnalyticsDatas = createAction(
    '[AnalyticsData/API] Delete AnalyticsDatas',
    props<{ ids: string[] }>()
);

export const clearAnalyticsDatas = createAction('[AnalyticsData/API] Clear AnalyticsDatas');
