import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { HotKeysCenterIndividualEffects } from './effects/hotKeys-center-individualeffects';
import { HotKeysCenterTableEffects } from './effects/hotKeys-center-table.effects';
import * as fromHotKeysCenter from './reducers';

export default [
    provideState(fromHotKeysCenter.featureKey, fromHotKeysCenter.reducers),
    provideEffects([HotKeysCenterTableEffects, HotKeysCenterIndividualEffects]),
];
