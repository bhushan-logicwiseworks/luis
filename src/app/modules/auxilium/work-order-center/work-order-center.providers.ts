import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { WorkCenterIndividualEffects } from './effects/work-order-center-individualeffects';
import { WorkCenterTableEffects } from './effects/work-order-center-table.effects';
import * as fromWorkOrderCenter from './reducers';

export default [
    provideState(fromWorkOrderCenter.featureKey, fromWorkOrderCenter.reducers),
    provideEffects([WorkCenterTableEffects, WorkCenterIndividualEffects]),
];
