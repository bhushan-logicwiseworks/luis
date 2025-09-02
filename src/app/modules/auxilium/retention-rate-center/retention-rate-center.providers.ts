import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { RetentionRateTableEffects } from './effects/retention-rate-table.effects';
import * as fromRetentionRateCenter from './reducers';

export default [
    provideState(fromRetentionRateCenter.featureKey, fromRetentionRateCenter.reducers),
    provideEffects([RetentionRateTableEffects]),
];
