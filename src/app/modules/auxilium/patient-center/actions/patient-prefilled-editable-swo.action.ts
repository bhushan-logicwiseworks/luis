import { createAction, props } from '@ngrx/store';
import {
    PatientSWODetails,
    PatientSWOInfo,
} from 'app/shared/interfaces/auxilium/patient-center/patient-prefilled-editable-swo.interface';

const LoadPatientSWO = createAction('[Patient SWO/API] Load SWO', props<{ patientId: number }>());
const LoadPatientSWOSuccess = createAction(
    '[Patient SWO/API] Load SWO Success',
    props<{ patientSWOInfo: PatientSWOInfo }>()
);
const LoadPatientSWOFailure = createAction('[Patient SWO/API] Load SWO Failure', props<{ error: Error }>());

const UpdatePatientSWO = createAction(
    '[Patient SWO/API] Update SWO',
    props<{ patientSWODetails: PatientSWODetails }>()
);
const UpdatePatientSWOSuccess = createAction('[Patient SWO/API] Load SWO Success');
const UpdatePatientSWOFailure = createAction('[Patient SWO/API] Load SWO Failure', props<{ error: Error }>());

export const PatientSWOActions = {
    LoadPatientSWO,
    LoadPatientSWOSuccess,
    LoadPatientSWOFailure,
    UpdatePatientSWO,
    UpdatePatientSWOSuccess,
    UpdatePatientSWOFailure,
};
