import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { ICDCodeCenterIndividualEffects } from './effects/icdcode-center-individualeffects';
import { ICDCodeCenterTableEffects } from './effects/icdcode-center-table.effects';
import * as fromIcdCodeCenter from './reducers';

export default [
    provideState(fromIcdCodeCenter.featureKey, fromIcdCodeCenter.reducers),
    provideEffects([ICDCodeCenterTableEffects, ICDCodeCenterIndividualEffects]),
];
