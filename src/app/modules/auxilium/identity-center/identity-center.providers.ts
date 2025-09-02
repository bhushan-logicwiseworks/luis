import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { IdentityCenterIndividualEffects } from './effects/identity-center-individualeffects';
import { IdentityCenterTableEffects } from './effects/identity-center-table.effects';
import * as fromIdentityCenter from './reducers';

export default [
    provideState(fromIdentityCenter.featureKey, fromIdentityCenter.reducers),
    provideEffects([IdentityCenterTableEffects, IdentityCenterIndividualEffects]),
];
