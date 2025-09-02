import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ShortcutCenterTableEffects } from './effects/shortcut-center-table.effects';
import * as fromShortcutCenter from './reducer';

export default [
    provideState(fromShortcutCenter.featureKey, fromShortcutCenter.reducers),
    provideEffects(ShortcutCenterTableEffects),
];
