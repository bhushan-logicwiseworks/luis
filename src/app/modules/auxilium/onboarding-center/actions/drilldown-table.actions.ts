import { createAction, props } from '@ngrx/store';
import { GetPatientListResponse } from 'app/shared/interfaces/user/onboardingCenter.interface';

const LoadPatients = createAction('[Patient List/API] Load Patient List', props<{ filter: string }>());
const LoadPatientsSuccess = createAction(
    '[Patient List/API] Load Patient List Success',
    props<{ patientlist: GetPatientListResponse }>()
);
const LoadPatientsFailure = createAction('[Patient List/API] Load Patient List Failure', props<{ error: Error }>());

export const DrillDownTableActions = {
    LoadPatients,
    LoadPatientsSuccess,
    LoadPatientsFailure,
};
