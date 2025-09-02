import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AccessCenterIndividualEffects } from './effects/access-center-individualeffects';
import { AccessCenterTableEffects } from './effects/access-center-table.effects';
import * as fromAccessCenter from './reducers';

export default [
    provideState(fromAccessCenter.featureKey, fromAccessCenter.reducers),
    provideEffects(AccessCenterTableEffects, AccessCenterIndividualEffects),
];
