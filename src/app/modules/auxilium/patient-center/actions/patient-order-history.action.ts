import { createAction, props } from '@ngrx/store';
import { PatientOrder } from 'app/shared/interfaces/auxilium/patient-center/patient-order.interface';

const loadOrder = createAction('[Patient Orders/API] Load Orders', props<{ patientId: number }>());
const loadOrdersSuccess = createAction('[Patient Orders/API] Load Orders Success', props<{ orders: PatientOrder[] }>());
const loadOrdersFailure = createAction('[Patient Orders/API] Load Orders Failure', props<{ error: Error }>());

export const PatientOrderActions = {
    loadOrder,
    loadOrdersSuccess,
    loadOrdersFailure,
};
