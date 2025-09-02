import { createAction, props } from '@ngrx/store';

const LoadPatientSensor = createAction('[PatientCenter Sensor/API] Load Patient Sensor ', props<{ id: number }>());
const LoadPatientSensorSuccess = createAction(
    '[PatientCenter Sensor/API] Load Patient Sensor Success',
    props<{ sensor: string }>()
);
const LoadPatientSensorFailure = createAction(
    '[PatientCenter Sensor/API] Load Patient Sensor Failure',
    props<{ error: Error }>()
);

export const PatientCenterSensorActions = {
    LoadPatientSensor,
    LoadPatientSensorSuccess,
    LoadPatientSensorFailure,
};
