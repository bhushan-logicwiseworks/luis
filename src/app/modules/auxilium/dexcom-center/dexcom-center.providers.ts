import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DexcomCenterIndividualEffects } from './effects/dexcom-center-individualeffects';
import { DexcomCenterTableEffects } from './effects/dexcom-center-table.effects';
import * as fromDexcomCenter from './reducers';

export default [
    provideState(fromDexcomCenter.featureKey, fromDexcomCenter.reducers),
    provideEffects([DexcomCenterTableEffects, DexcomCenterIndividualEffects]),
];
