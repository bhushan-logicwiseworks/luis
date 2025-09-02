import { createAction, props } from '@ngrx/store';
import { ContactTypeList } from 'app/shared/interfaces/auxilium/patient-center/contact-type-list.interface';
import { PatientNote } from 'app/shared/interfaces/auxilium/patient-center/patient-note.interface';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';

const LoadPatientNotes = createAction('[Patient Notes/API] Load Patient Notes', props<{ patientId: Patient['id'] }>());
const LoadPatientNotesSuccess = createAction(
    '[Patient Notes/API] Load Patient Notes Success',
    props<{ notes: PatientNote[] }>()
);
const LoadPatientNotesFailure = createAction(
    '[Patient Notes/API] Load Patient Notes Failure',
    props<{ error: Error }>()
);

const AddPatientNote = createAction('[Patient Notes/API] Add Patient Note', props<{ note: PatientNote }>());
const AddPatientNoteSuccess = createAction(
    '[Patient Notes/API] Add Patient Note Success',
    props<{ note: PatientNote[] }>()
);
const AddPatientNoteFailure = createAction('[Patient Notes/API] Add Patient Note Failure', props<{ error: Error }>());

const LoadContactType = createAction('[Patient ContactType/API] Load Contact Type');
const LoadContactTypeSuccess = createAction(
    '[Patient ContactType/API] Load Contact Type Success',
    props<{ contactType: Patient[] }>()
);
const LoadContactTypeFailure = createAction(
    '[Patient ContactType/API] Load Contact Type Failure',
    props<{ error: Error }>()
);

const LoadContactList = createAction('[Patient ContactType/API] Load Contact List Type');
const LoadContactListSuccess = createAction(
    '[Patient ContactType/API] Load Contact List Type Success',
    props<{ contactList: ContactTypeList[] }>()
);
const LoadContactListFailure = createAction(
    '[Patient ContactType/API] Load Contact List Type Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[Patient ContactType/API] Refresh');

export const PatientNotesActions = {
    LoadPatientNotes,
    LoadPatientNotesSuccess,
    LoadPatientNotesFailure,
    LoadContactType,
    LoadContactTypeSuccess,
    LoadContactTypeFailure,
    LoadContactList,
    LoadContactListSuccess,
    LoadContactListFailure,
    AddPatientNote,
    AddPatientNoteSuccess,
    AddPatientNoteFailure,
    Refresh,
};
