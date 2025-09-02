import { createAction, props } from '@ngrx/store';
import { GetChargeResponse } from 'app/shared/interfaces/auxilium/charge-center/charge.interface';

const ResetState = createAction('[ChargesCenter Table/API] Reset Charge State');

const LoadCharges = createAction('[ChargesCenter Table/API] Load Charge');
const LoadChargesSuccess = createAction(
    '[ChargesCenter Table/API] Load Charge Success',
    props<{ charges: GetChargeResponse }>()
);
const LoadChargesFailure = createAction('[ChargesCenter Table/API] Load Charge Failure', props<{ error: Error }>());

const PostConfirmedWorkOrder = createAction(
    '[ChargesCenter Table/API] Post ConfirmedWorkOrder',
    props<{ patientData: any }>()
);
const PostConfirmedWorkOrderSuccess = createAction('[ChargesCenter Table/API] Post ConfirmedWorkOrder Success');
const PostConfirmedWorkOrderFailure = createAction(
    '[ChargesCenter Table/API] Post ConfirmedWorkOrder Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[ChargesCenter Table/API] Refresh');

export const ChargesCenterTableActions = {
    LoadCharges,
    LoadChargesSuccess,
    LoadChargesFailure,
    PostConfirmedWorkOrder,
    PostConfirmedWorkOrderSuccess,
    PostConfirmedWorkOrderFailure,
    Refresh,
    ResetState,
};
