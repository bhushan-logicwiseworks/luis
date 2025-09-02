import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ValidationCenterIndividualEffects } from './effects/validation-center-individualeffects';
import { ValidationCenterTableEffects } from './effects/validation-center-table.effects';
import * as fromValidationCenter from './reducers';

export default [
    provideState(fromValidationCenter.featureKey, fromValidationCenter.reducers),
    provideEffects([ValidationCenterTableEffects, ValidationCenterIndividualEffects]),
];
