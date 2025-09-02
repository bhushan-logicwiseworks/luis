import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import * as fromDashboard from '../../admin/dashboards/combined/reducers';

export default [provideState(fromDashboard.featureKey, fromDashboard.reducers), provideEffects([])];
