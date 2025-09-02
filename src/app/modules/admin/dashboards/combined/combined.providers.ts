import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { LoadDashboardDetialsGuard } from './actions/guards/load-dashboard-details.guard';
import { DashboardDetailsEffects } from './effects/dashboard-details.effects';
import * as fromDashboard from './reducers';

export default [
    provideState(fromDashboard.featureKey, fromDashboard.reducers),
    provideEffects(DashboardDetailsEffects),
    LoadDashboardDetialsGuard,
];
