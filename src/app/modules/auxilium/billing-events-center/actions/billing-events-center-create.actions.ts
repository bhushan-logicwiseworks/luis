import { createAction, props } from '@ngrx/store';
import {
    BillingEventsCenterDisplay,
    BillingEventsCenterResponse,
} from '../../../../shared/interfaces/auxilium/billing-events-center/billing-events-center.interfface';
import { GetOwnersResponse } from '../../../../shared/interfaces/auxilium/comm-center/api-responses.interface';

const SaveBillingEvent = createAction(
    '[BillingEventsCenter Table/API] Save Billing Event',
    props<{ data: BillingEventsCenterDisplay; filter: string }>()
);

const SaveBillingEventSuccess = createAction(
    '[BillingEventsCenter Table/API] Save Billing Event Success',
    props<{ response: BillingEventsCenterResponse }>()
);

const SaveBillingEventFailure = createAction(
    '[BillingEventsCenter Table/API] Save Billing Event Failure',
    props<{ error: Error }>()
);

const LoadOwners = createAction('[BillingEventsCenter Create/API] Load Owners');
const LoadOwnersSuccess = createAction(
    '[BillingEventsCenter Create/API] Load Owners Success',
    props<{ owners: GetOwnersResponse }>()
);
const LoadOwnersFailure = createAction(
    '[BillingEventsCenter Create/API] Load Owners Failure',
    props<{ error: Error }>()
);

export const BillingEventsCenterCreateActions = {
    SaveBillingEvent,
    SaveBillingEventSuccess,
    SaveBillingEventFailure,
    LoadOwners,
    LoadOwnersSuccess,
    LoadOwnersFailure,
};
