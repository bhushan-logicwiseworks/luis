import { createAction, props } from '@ngrx/store';
import { PatientPhysicianList } from 'app/shared/interfaces/auxilium/patient-center/patient-physician-list.interface';
import { PatientPhysicianAdd } from 'app/shared/interfaces/auxilium/patient-center/patient-physicians-add.interface';
import { PatientPhysicians } from 'app/shared/interfaces/auxilium/patient-center/patient-physicians.interface';

const ResetState = createAction('[PatientCenter Details/API] Reset Patient Physicians State');

const LoadPatientPhysicians = createAction(
    '[PatientCenter Physicians/API] Load Patient Physicians ',
    props<{ id: number }>()
);
const LoadPatientPhysiciansSuccess = createAction(
    '[PatientCenter Physicians/API] Load Patient Physicians Success',
    props<{ physicians: PatientPhysicians }>()
);
const LoadPatientPhysiciansFailure = createAction(
    '[PatientCenter Physicians/API] Load Patient Physicians Failure',
    props<{ error: Error }>()
);

const AddPatientPhysicians = createAction(
    '[Patient Physicians/API] Add Patient Physicians',
    props<{ physicians: PatientPhysicianAdd }>()
);
const AddPatientPhysiciansSuccess = createAction(
    '[Patient Physicians/API] Add Patient Physicians Success',
    props<{ physicians: PatientPhysicianAdd }>()
);
const AddPatientPhysiciansFailure = createAction(
    '[Patient Physicians/API] Add Patient Physicians Failure',
    props<{ error: Error }>()
);

const DeletePatientPhysicians = createAction(
    '[PatientCenter Physicians/API] Delete Patient Physicians',
    props<{ dto: { id: number } }>()
);
const DeletePatientPhysiciansSuccess = createAction('[PatientCenter Physicians/API] Delete Patient Physicians Success');
const DeletePatientPhysiciansFailure = createAction(
    '[PatientCenter Physicians/API] Delete Patient Physicians Failure',
    props<{ error: Error }>()
);

const LoadPatientPhysiciansList = createAction('[PatientCenter Physicians/API] Load Patient Physicians List ');
const LoadPatientPhysiciansListSuccess = createAction(
    '[PatientCenter Physicians/API] Load Patient Physicians List Success',
    props<{ physiciansList: PatientPhysicianList }>()
);
const LoadPatientPhysiciansListFailure = createAction(
    '[PatientCenter Payors/API] Load Patient Physicians List Failure',
    props<{ error: Error }>()
);

const UpdatePatientPhysicians = createAction(
    '[Patient Physicians/API] Update Patient Physicians',
    props<{ physicians: PatientPhysicianAdd[] }>()
);
const UpdatePatientPhysiciansSuccess = createAction(
    '[Patient Physicians/API] Update Patient Physicians Success',
    props<{ physicians: PatientPhysicianAdd[] }>()
);
const UpdatePatientPhysiciansFailure = createAction(
    '[Patient Physicians/API] Update Patient Physicians Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[PatientCenter Deatils/API] Refresh');

export const PatientCenterPhysiciansActions = {
    LoadPatientPhysicians,
    LoadPatientPhysiciansSuccess,
    LoadPatientPhysiciansFailure,

    AddPatientPhysicians,
    AddPatientPhysiciansSuccess,
    AddPatientPhysiciansFailure,

    LoadPatientPhysiciansList,
    LoadPatientPhysiciansListSuccess,
    LoadPatientPhysiciansListFailure,

    DeletePatientPhysicians,
    DeletePatientPhysiciansSuccess,
    DeletePatientPhysiciansFailure,

    UpdatePatientPhysicians,
    UpdatePatientPhysiciansSuccess,
    UpdatePatientPhysiciansFailure,

    Refresh,
    ResetState,
};
