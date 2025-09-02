import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AnalyticsDataEffects } from './effects/analytics-data.effects';
import * as fromAnalytics from './reducers';

export default [provideState(fromAnalytics.featureKey, fromAnalytics.reducers), provideEffects(AnalyticsDataEffects)];
