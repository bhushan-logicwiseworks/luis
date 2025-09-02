import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { IntakeCenterTableEffects } from './effects/intake-center-table.effects';
import * as fromIntakeCenter from './reducers';

export default [
    provideState(fromIntakeCenter.featureKey, fromIntakeCenter.reducers),
    provideEffects([IntakeCenterTableEffects]),
];
