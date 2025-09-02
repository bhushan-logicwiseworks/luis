import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { CareManagementCenterTableEffects } from './effects/caremanagement-center-table.effects';
import * as fromCareManagement from './reducers';

export default [
    provideState(fromCareManagement.featureKey, fromCareManagement.reducers),
    provideEffects(CareManagementCenterTableEffects),
];
