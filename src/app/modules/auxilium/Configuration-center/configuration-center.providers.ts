import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ConfigurationCenterIndividualEffects } from './effects/configuration-center-individualeffects';
import { ConfigurationCenterTableEffects } from './effects/configuration-center-table.effects';
import * as fromConfigurationCenter from './reducer';

export default [
    provideState(fromConfigurationCenter.featureKey, fromConfigurationCenter.reducers),
    provideEffects([ConfigurationCenterTableEffects, ConfigurationCenterIndividualEffects]),
];
