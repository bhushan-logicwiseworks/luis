import { createAction, props } from '@ngrx/store';
import {
    PODSearchDetail,
    ProofOfDeliveryDetail,
} from 'app/shared/interfaces/auxilium/proof-of-delivery-center/proof-of-delivery.interface';

const LoadProofOfDelivery = createAction('[ProofOfDelivery Table/API] Load all details');
const LoadProofOfDeliverySuccess = createAction(
    '[ProofOfDelivery Table/API] Load all details Success',
    props<{ getall: ProofOfDeliveryDetail[] }>()
);
const LoadProofOfDeliveryFailure = createAction(
    '[ProofOfDelivery Table/API] Load all details Failure',
    props<{ error: Error }>()
);

const ProofOfDeliverySearch = createAction(
    '[EmployeeCenter Table/API] Proof Of Delivery Search',
    props<{ searchPOd: PODSearchDetail }>()
);
const ProofOfDeliverySearchSuccess = createAction(
    '[EmployeeCenter Table/API] Proof Of Delivery Search Success',
    props<{ getall: ProofOfDeliveryDetail[] }>()
);
const ProofOfDeliverySearchFailure = createAction(
    '[EmployeeCenter Table/API] Proof Of Delivery Search Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[ProofOfDelivery Table/API] Refresh');
const ResetState = createAction('[ProofOfDelivery Table/API] Reset all details State');

export const ProofOfDeliveryTableActions = {
    LoadProofOfDelivery,
    LoadProofOfDeliverySuccess,
    LoadProofOfDeliveryFailure,
    ProofOfDeliverySearch,
    ProofOfDeliverySearchSuccess,
    ProofOfDeliverySearchFailure,
    Refresh,
    ResetState,
};
