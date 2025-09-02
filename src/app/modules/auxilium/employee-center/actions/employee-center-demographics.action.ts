import { createAction, props } from '@ngrx/store';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';

const AddEmployeeDemographics = createAction(
    '[Employee Demographics/API] Add Employee Demographics',
    props<{ patient: PatientEntity }>()
);
const AddEmployeeDemographicsSuccess = createAction(
    '[Employee Demographics/API] Add Employee Demographics Success',
    props<{ demographics: PatientEntity }>()
);
const AddEmployeeDemographicsFailure = createAction(
    '[Employee Demographics/API] Add Employee Demographics Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[Employee ContactType/API] Refresh');

export const EmployeeDemographicsActions = {
    AddEmployeeDemographics,
    AddEmployeeDemographicsSuccess,
    AddEmployeeDemographicsFailure,

    Refresh,
};
