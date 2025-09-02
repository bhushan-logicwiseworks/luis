import { createAction, props } from '@ngrx/store';
import { PatientDiagnosisCodeAdd } from 'app/shared/interfaces/auxilium/patient-center/patient-diagnosiscode-add.interface';
import { GetDiagnosisCodesListResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-diagnosiscode-list.interface';
import { PatientDiagnosisCodes } from 'app/shared/interfaces/auxilium/patient-center/patient-diagnosiscodes.interface';

const ResetState = createAction('[PatientCenter Details/API] Reset Patient Diagnosiscode State');

const LoadPatientDiagnosiscode = createAction(
    '[PatientCenter Diagnosiscode/API] Load Patient Diagnosiscode ',
    props<{ id: number }>()
);
const LoadPatientDiagnosiscodeSuccess = createAction(
    '[PatientCenter Diagnosiscode/API] Load Patient Diagnosiscode Success',
    props<{ diagnosiscodes: PatientDiagnosisCodes }>()
);
const LoadPatientDiagnosiscodeFailure = createAction(
    '[PatientCenter Diagnosiscode/API] Load Patient Diagnosiscode Failure',
    props<{ error: Error }>()
);

const LoadPatientDiagnosisCodesList = createAction(
    '[PatientCenter Diagnosiscode/API] Load Patient Diagnosiscode List '
);
const LoadPatientDiagnosisCodesListSuccess = createAction(
    '[PatientCenter Diagnosiscode/API] Load Patient Diagnosiscode List Success',
    props<{ diagnosisCodesList: GetDiagnosisCodesListResponse }>()
);
const LoadPatientDiagnosisCodesListFailure = createAction(
    '[PatientCenter Diagnosiscode/API] Load Patient Diagnosiscode List Failure',
    props<{ error: Error }>()
);

const AddPatientDiagnosiscode = createAction(
    '[Patient Diagnosiscode/API] Add Patient Diagnosiscode',
    props<{ diagnosiscode: PatientDiagnosisCodeAdd }>()
);
const AddPatientDiagnosiscodeSuccess = createAction(
    '[Patient Diagnosiscode/API] Add Patient Diagnosiscode Success',
    props<{ diagnosiscode: PatientDiagnosisCodeAdd }>()
);
const AddPatientDiagnosiscodeFailure = createAction(
    '[Patient Diagnosiscode/API] Add Patient Diagnosiscode Failure',
    props<{ error: Error }>()
);

const DeletePatientDiagnosiscode = createAction(
    '[PatientCenter Diagnosiscode/API] Delete Patient Diagnosiscode',
    props<{ dto: PatientDiagnosisCodes }>()
);
const DeletePatientDiagnosiscodeSuccess = createAction(
    '[PatientCenter Diagnosiscode/API] Delete Patient Diagnosiscode Success'
);
const DeletePatientDiagnosiscodeFailure = createAction(
    '[PatientCenter Diagnosiscode/API] Delete Patient Diagnosiscode Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[PatientCenter Deatils/API] Refresh');

export const PatientCenterDiagnosiscodeActions = {
    LoadPatientDiagnosiscode,
    LoadPatientDiagnosiscodeSuccess,
    LoadPatientDiagnosiscodeFailure,

    AddPatientDiagnosiscode,
    AddPatientDiagnosiscodeSuccess,
    AddPatientDiagnosiscodeFailure,

    DeletePatientDiagnosiscode,
    DeletePatientDiagnosiscodeSuccess,
    DeletePatientDiagnosiscodeFailure,

    LoadPatientDiagnosisCodesList,
    LoadPatientDiagnosisCodesListSuccess,
    LoadPatientDiagnosisCodesListFailure,

    Refresh,
    ResetState,
};
