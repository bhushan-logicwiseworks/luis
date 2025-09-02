import { createAction, props } from '@ngrx/store';
import { PatientPayorsAdd } from 'app/shared/interfaces/auxilium/patient-center/patient-payors-add.interface';
import { PatientPayorsList } from 'app/shared/interfaces/auxilium/patient-center/patient-payors-list.interface';
import { PayorObject } from 'app/shared/interfaces/auxilium/patient-center/patient-payors-update-rank.interface';
import { PatientPayors } from 'app/shared/interfaces/auxilium/patient-center/patient-payors.interface';

const ResetState = createAction('[PatientCenter Details/API] Reset Patient Payors State');

const LoadPatientPayors = createAction('[PatientCenter Payors/API] Load Patient Payors ', props<{ id: number }>());
const LoadPatientPayorsSuccess = createAction(
    '[PatientCenter Payors/API] Load Patient Payors Success',
    props<{ payors: PatientPayors }>()
);
const LoadPatientPayorsFailure = createAction(
    '[PatientCenter Payors/API] Load Patient Payors Failure',
    props<{ error: Error }>()
);

const LoadPatientPayor = createAction('[PatientCenter Payor/API] Load Patient Payor ', props<{ id: number }>());
const LoadPatientPayorSuccess = createAction(
    '[PatientCenter Payor/API] Load Patient Payor Success',
    props<{ payor: PatientPayors }>()
);
const LoadPatientPayorFailure = createAction(
    '[PatientCenter Payor/API] Load Patient Payor Failure',
    props<{ error: Error }>()
);

const LoadPatientPayorsList = createAction('[PatientCenter Payors/API] Load Patient Payors List ');
const LoadPatientPayorsListSuccess = createAction(
    '[PatientCenter Payors/API] Load Patient Payors List Success',
    props<{ payorsList: PatientPayorsList }>()
);
const LoadPatientPayorsListFailure = createAction(
    '[PatientCenter Payors/API] Load Patient Payors List Failure',
    props<{ error: Error }>()
);

const AddPatientPayors = createAction('[Patient Notes/API] Add Patient Payors', props<{ payors: PatientPayorsAdd }>());
const AddPatientPayorsSuccess = createAction(
    '[Patient Notes/API] Add Patient Payors Success',
    props<{ payors: PatientPayorsAdd }>()
);
const AddPatientPayorsFailure = createAction(
    '[Patient Notes/API] Add Patient Payors Failure',
    props<{ error: Error }>()
);

const DeletePatientPayor = createAction(
    '[PatientCenter Payor/API] Delete Patient Payor',
    props<{ dto: PatientPayors }>()
);
const DeletePatientPayorSuccess = createAction('[PatientCenter Payor/API] Delete Patient Payor Success');
const DeletePatientPayorFailure = createAction(
    '[PatientCenter Payor/API] Delete Patient Payor Failure',
    props<{ error: Error }>()
);

const UpdatePatientPayors = createAction(
    '[PatientCenter Payor/API] Update Patient Payor',
    props<{ payors: PayorObject }>()
);
const UpdatePatientPayorsSuccess = createAction(
    '[PatientCenter Payor/API] Update Patient Payor Success',
    props<{ payors: PayorObject }>()
);
const UpdatePatientPayorsFailure = createAction(
    '[PatientCenter Payor/API] Update Patient Payor Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[PatientCenter Deatils/API] Refresh');

export const PatientCenterPayorsActions = {
    LoadPatientPayors,
    LoadPatientPayorsSuccess,
    LoadPatientPayorsFailure,
    LoadPatientPayorsList,
    LoadPatientPayorsListSuccess,
    LoadPatientPayorsListFailure,
    AddPatientPayors,
    AddPatientPayorsSuccess,
    AddPatientPayorsFailure,
    DeletePatientPayor,
    DeletePatientPayorSuccess,
    DeletePatientPayorFailure,
    LoadPatientPayor,
    LoadPatientPayorSuccess,
    LoadPatientPayorFailure,
    UpdatePatientPayors,
    UpdatePatientPayorsSuccess,
    UpdatePatientPayorsFailure,
    Refresh,
    ResetState,
};
