import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { LoginEffects } from './effects/login.effects';
import * as fromLogin from './reducers';

export default [provideState(fromLogin.featureKey, fromLogin.reducers), provideEffects(LoginEffects)];
