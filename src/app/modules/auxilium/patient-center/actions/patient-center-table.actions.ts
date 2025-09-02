import { createAction, props } from '@ngrx/store';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { PatientBalance } from 'app/shared/interfaces/auxilium/patient-center/patientbalances.interdace';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';

const ResetState = createAction('[PatientCenter Table/API] Reset Patients State');

const LoadPatients = createAction('[PatientCenter Table/API] Load Patients', props<{ filter: string }>());
const LoadPatientsSuccess = createAction(
    '[PatientCenter Table/API] Load Patients Success',
    props<{ patient: Patient }>()
);
const LoadPatientsFailure = createAction('[PatientCenter Table/API] Load Patients Failure', props<{ error: Error }>());

const AddPatientQuickSave = createAction(
    '[PatientCenter Table/API] Add Patient QuickSave',
    props<{ patient: Patient }>()
);
const AddPatientQuickSaveSuccess = createAction(
    '[PatientCenter Table/API] Add Patient QuickSave Success',
    props<{ id: Patient['id'] }>()
);
const AddPatientQuickSaveFailure = createAction(
    '[PatientCenter Table/API] Add Patient QuickSave Failure',
    props<{ error: Error }>()
);

const PatientSearch = createAction('[PatientCenter Table/API] Patient Search', props<{ patientSearch: Patient }>());
const PatientSearchSuccess = createAction(
    '[PatientCenter Table/API] Patient Search Success',
    props<{ patient: Patient }>()
);
const PatientSearchFailure = createAction(
    '[PatientCenter Table/API] Patient Search Failure',
    props<{ error: Error }>()
);

const DeletePatient = createAction('[PatientCenter Delete/API] Delete Patient', props<{ dto: PatientEntity }>());
const DeletePatientSuccess = createAction('[PatientCenter Delete/API] Delete Patient Success');
const DeletePatientFailure = createAction(
    '[PatientCenter Delete/API] Delete Patient Failure',
    props<{ error: Error }>()
);

const isShortCut = createAction('[PatientCenter Table/API] Is Shortcut', props<{ shortCut: boolean }>());

const LoadPatientBalance = createAction(
    '[PatientCenter PatientBalance/API] Load Patient Balance',
    props<{ id: number }>()
);
const LoadPatientBalanceSuccess = createAction(
    '[PatientCenter PatientBalance/API] Load Patient Balance Success',
    props<{ patientBalances: PatientBalance }>()
);
const LoadPatientBalanceFailure = createAction(
    '[PatientCenter PatientBalance/API] Load Patient Balance Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[PatientCenter Table/API] Refresh');

const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());
const RedirectPatientCenter = createAction('[Router] Redirect PatientCenter');

export const PatientCenterTableActions = {
    LoadPatients,
    LoadPatientsSuccess,
    LoadPatientsFailure,
    AddPatientQuickSave,
    AddPatientQuickSaveSuccess,
    AddPatientQuickSaveFailure,
    PatientSearch,
    PatientSearchSuccess,
    isShortCut,
    PatientSearchFailure,
    DeletePatient,
    DeletePatientSuccess,
    DeletePatientFailure,
    LoadPatientBalance,
    LoadPatientBalanceSuccess,
    LoadPatientBalanceFailure,
    Refresh,
    ResetState,
    Navigate,
    RedirectPatientCenter,
};
