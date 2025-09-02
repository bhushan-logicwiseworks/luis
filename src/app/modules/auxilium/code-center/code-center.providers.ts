import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { CodeCenterIndividualEffects } from './effects/code-center-individualeffects';
import { CodeCenterTableEffects } from './effects/code-center-table.effects';
import * as fromCodeCenter from './reducers';

export default [
    provideState(fromCodeCenter.featureKey, fromCodeCenter.reducers),
    provideEffects([CodeCenterTableEffects, CodeCenterIndividualEffects]),
];
