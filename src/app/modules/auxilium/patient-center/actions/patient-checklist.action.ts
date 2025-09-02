import { createAction, props } from '@ngrx/store';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';

const AddPatientChecklist = createAction(
    '[Patient Checklist/API] Add Patient Checklist',
    props<{ patient: PatientEntity }>()
);
const AddPatientChecklistSuccess = createAction(
    '[Patient Checklist/API] Add Patient Checklist Success',
    props<{ checklist: PatientEntity }>()
);
const AddPatientChecklistFailure = createAction(
    '[Patient Checklist/API] Add Patient Checklist Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[Patient ContactType/API] Refresh');

export const PatientChecklistActions = {
    AddPatientChecklist,
    AddPatientChecklistSuccess,
    AddPatientChecklistFailure,

    Refresh,
};
