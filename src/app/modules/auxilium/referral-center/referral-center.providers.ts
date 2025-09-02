import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ReferralCenterEmailEffects } from './effects/referral-center-individual.effects';
import { ReferralCenterTableEffects } from './effects/referral-center-table.effects';
import * as fromReferralCenter from './reducers';

export default [
    provideState(fromReferralCenter.featureKey, fromReferralCenter.reducers),
    provideEffects([ReferralCenterTableEffects, ReferralCenterEmailEffects]),
];
