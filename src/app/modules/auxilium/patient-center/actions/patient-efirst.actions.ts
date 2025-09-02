import { createAction, props } from '@ngrx/store';
import { GetPatientEFirst } from 'app/shared/interfaces/auxilium/patient-center/patient-efirst.interface';

const LoadEFirst = createAction('[Patient EFirst/API] Load EFirsts', props<{ patientId: number }>());
const LoadEFirstSuccess = createAction(
    '[Patient EFirst/API] Load EFirsts Success',
    props<{ efirsts: GetPatientEFirst }>()
);
const LoadEFirstFailure = createAction('[Patient EFirst/API] Load EFirsts Failure', props<{ error: Error }>());

export const PatientEFirstActions = {
    LoadEFirst,
    LoadEFirstSuccess,
    LoadEFirstFailure,
};
