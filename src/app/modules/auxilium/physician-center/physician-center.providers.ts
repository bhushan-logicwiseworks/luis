import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { PhysicianCenterIndividualEffects } from './effects/physician-center-individualeffects';

import { SalesCenterTableEffects } from './effects/physician-center-table.effects';
import * as fromPhysicianCenter from './reducers';

export default [
    provideState(fromPhysicianCenter.featureKey, fromPhysicianCenter.reducers),
    provideEffects([SalesCenterTableEffects, PhysicianCenterIndividualEffects]),
];
