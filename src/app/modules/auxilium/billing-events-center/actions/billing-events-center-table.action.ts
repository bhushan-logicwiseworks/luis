import { createAction, props } from '@ngrx/store';
import { BillingEventsCenterResponse } from '../../../../shared/interfaces/auxilium/billing-events-center/billing-events-center.interfface';

const resetState = createAction('[Feature] Reset State');

const LoadBillingEvents = createAction('[IntakeCenter Table/API] Load Billing Events', props<{ filter: string }>());
const LoadBillingEventsSuccess = createAction(
    '[IntakeCenter Table/API] Load Billing Events Success',
    props<{ BillingEvents: BillingEventsCenterResponse }>()
);
const LoadBillingEventsFailure = createAction(
    '[IntakeCenter Table/API] Load Billing Events Failure',
    props<{ error: Error }>()
);

const LoadAllBillingEvents = createAction('[BillingEventsCenter Table/API] Load All Events');
const LoadAllBillingEventsSuccess = createAction(
    '[BillingEventsCenter Table/API] Load All Events Success',
    props<{ BillingEvents: BillingEventsCenterResponse }>()
);
const LoadAllBillingEventsFailure = createAction(
    '[BillingEventsCenter Table/API] Load All Events Failure',
    props<{ error: Error }>()
);

export const BillingEventsCenterTableActions = {
    resetState,
    LoadBillingEvents,
    LoadBillingEventsSuccess,
    LoadBillingEventsFailure,
    LoadAllBillingEvents,
    LoadAllBillingEventsSuccess,
    LoadAllBillingEventsFailure,
};
