import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ProofOfDeliveryIndividualEffects } from './effects/proof-of-delivery-individualeffects';
import { ProofOfDeliveryTableEffects } from './effects/proof-of-delivery-table.effects';
import * as fromProofOfDeliveryCenter from './reducers';

export default [
    provideState(fromProofOfDeliveryCenter.featureKey, fromProofOfDeliveryCenter.reducers),
    provideEffects([ProofOfDeliveryTableEffects, ProofOfDeliveryIndividualEffects]),
];
