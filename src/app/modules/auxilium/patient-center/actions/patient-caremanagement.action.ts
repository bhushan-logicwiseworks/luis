import { createAction, props } from '@ngrx/store';
import { PatientCareManagement } from 'app/shared/interfaces/auxilium/patient-center/patient-caremanagement.interface';
import { ContactNote } from 'app/shared/interfaces/auxilium/patient-center/patient-compliance-notes.interface';
import { InsuranceInfoList } from '../../../../shared/interfaces/auxilium/patient-center/insurance-info.interface';

const ResetState = createAction('[PatientCareManagement/API] Reset Patient Care Management State');

// Load Owners actions
const LoadOwners = createAction('[PatientCareManagement/API] Load Owners');
const LoadOwnersSuccess = createAction('[PatientCareManagement/API] Load Owners Success', props<{ owners: any[] }>());
const LoadOwnersFailure = createAction('[PatientCareManagement/API] Load Owners Failure', props<{ error: Error }>());

const LoadPatientCareManagement = createAction(
    '[PatientCareManagement/API] Load Patient Care Management',
    props<{ patientId: number }>()
);
const LoadPatientCareManagementSuccess = createAction(
    '[PatientCareManagement/API] Load Patient Care Management Success',
    props<{ records: PatientCareManagement[] }>()
);
const LoadPatientCareManagementFailure = createAction(
    '[PatientCareManagement/API] Load Patient Care Management Failure',
    props<{ error: Error }>()
);

const AddPatientCareManagement = createAction(
    '[PatientCareManagement/API] Add Patient Care Management',
    props<{ record: PatientCareManagement }>()
);
const AddPatientCareManagementSuccess = createAction(
    '[PatientCareManagement/API] Add Patient Care Management Success',
    props<{ record: PatientCareManagement }>()
);
const AddPatientCareManagementFailure = createAction(
    '[PatientCareManagement/API] Add Patient Care Management Failure',
    props<{ error: Error }>()
);

const DeletePatientCareManagement = createAction(
    '[PatientCareManagement/API] Delete Patient Care Management',
    props<{ record: PatientCareManagement }>()
);
const DeletePatientCareManagementSuccess = createAction(
    '[PatientCareManagement/API] Delete Patient Care Management Success'
);
const DeletePatientCareManagementFailure = createAction(
    '[PatientCareManagement/API] Delete Patient Care Management Failure',
    props<{ error: Error }>()
);

const LoadContactNotes = createAction(
    '[PatientCareManagement Table/API] Load Contact Notes',
    props<{ patientId: number; refId: number }>()
);
const LoadContactNotesSuccess = createAction(
    '[PatientCareManagement Table/API] Load Contact Notes Success',
    props<{ notes: ContactNote[] }>()
);
const LoadContactNotesFailure = createAction(
    '[PatientCareManagement Table/API] Load Contact Notes Failure',
    props<{ error: Error }>()
);

const AddContactNote = createAction(
    '[PatientCareManagement Table/API] Add Contact Note',
    props<{ note: ContactNote }>()
);
const AddContactNoteSuccess = createAction(
    '[PatientCareManagement Table/API] Add Contact Note Success',
    props<{ note: ContactNote }>()
);
const AddContactNoteFailure = createAction(
    '[PatientCareManagement Table/API] Add Contact Note Failure',
    props<{ error: Error }>()
);

const LoadPayorRank1 = createAction('[PatientCareManagement/API] Load Payor Rank1', props<{ patientId: number }>());

const LoadPayorRank1Success = createAction(
    '[PatientCareManagement/API] Load Payor Rank1 Success',
    props<{ payorRank1: InsuranceInfoList }>()
);

const LoadPayorRank1Failure = createAction(
    '[PatientCareManagement/API] Load Payor Rank1 Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[PatientCareManagement/API] Refresh');

export const PatientCareManagementActions = {
    LoadPatientCareManagement,
    LoadPatientCareManagementSuccess,
    LoadPatientCareManagementFailure,
    AddPatientCareManagement,
    AddPatientCareManagementSuccess,
    AddPatientCareManagementFailure,
    DeletePatientCareManagement,
    DeletePatientCareManagementSuccess,
    DeletePatientCareManagementFailure,
    Refresh,
    ResetState,
    LoadContactNotes,
    LoadContactNotesSuccess,
    LoadContactNotesFailure,
    AddContactNote,
    AddContactNoteSuccess,
    AddContactNoteFailure,
    LoadOwners,
    LoadOwnersSuccess,
    LoadOwnersFailure,
    LoadPayorRank1,
    LoadPayorRank1Success,
    LoadPayorRank1Failure,
};
