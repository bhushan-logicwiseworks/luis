import { createAction, props } from '@ngrx/store';
import { SaveProofOfDelivery } from 'app/shared/interfaces/auxilium/proof-of-delivery-center/save-proof-of-delivery.interface';

const saveProofOfDelivery = createAction(
    '[ProofOfDelivery Table/API] Save Proof Of Delivery',
    props<{ saveProofOfDelivery: SaveProofOfDelivery }>()
);
const saveProofOfDeliverySuccess = createAction(
    '[PatientPortal Table/API] Save Proof Of Delivery Success',
    props<{ saveProofOfDelivery: SaveProofOfDelivery }>()
);
const saveProofOfDeliveryFailure = createAction(
    '[PatientPortal Table/API] Save Proof Of Delivery Failure',
    props<{ error: Error }>()
);

export const ProofOfDeliveryIndividualActions = {
    saveProofOfDelivery,
    saveProofOfDeliverySuccess,
    saveProofOfDeliveryFailure,
};
