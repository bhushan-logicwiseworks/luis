import { createAction, props } from '@ngrx/store';
import { ContactTypeList } from 'app/shared/interfaces/auxilium/patient-center/contact-type-list.interface';
import { PatientNote } from 'app/shared/interfaces/auxilium/patient-center/patient-note.interface';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';

const LoadPatientCollectionNotes = createAction(
    '[Patient Collection Notes/API] Load Patient Collection Notes',
    props<{ patientId: Patient['id'] }>()
);
const LoadPatientCollectionNotesSuccess = createAction(
    '[Patient Collection Notes/API] Load Patient Collection Notes Success',
    props<{ notes: PatientNote[] }>()
);
const LoadPatientCollectionNotesFailure = createAction(
    '[Patient Collection Notes/API] Load Patient Collection Notes Failure',
    props<{ error: Error }>()
);

const AddPatientCollectionNote = createAction(
    '[Patient Collection Notes/API] Add Patient Collection Note',
    props<{ note: PatientNote }>()
);
const AddPatientCollectionNoteSuccess = createAction(
    '[Patient Collection Notes/API] Add Patient Collection Note Success',
    props<{ note: PatientNote[] }>()
);
const AddPatientCollectionNoteFailure = createAction(
    '[Patient Collection Notes/API] Add Patient Collection Note Failure',
    props<{ error: Error }>()
);

const LoadContactType = createAction('[Patient Collection ContactType/API] Load Collection Contact Type');
const LoadContactTypeSuccess = createAction(
    '[Patient Collection ContactType/API] Load Collection Contact Type Success',
    props<{ contactType: Patient[] }>()
);
const LoadContactTypeFailure = createAction(
    '[Patient Collection ContactType/API] Load Collection Contact Type Failure',
    props<{ error: Error }>()
);

const LoadContactList = createAction('[Patient Collection ContactType/API] Load Collection Contact List Type');
const LoadContactListSuccess = createAction(
    '[Patient Collection ContactType/API] Load Collection Contact List Type Success',
    props<{ contactList: ContactTypeList[] }>()
);
const LoadContactListFailure = createAction(
    '[Patient Collection ContactType/API] Load Collection Contact List Type Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[Patient Collection ContactType/API] Refresh');

export const PatientCollectionNotesActions = {
    LoadPatientCollectionNotes,
    LoadPatientCollectionNotesSuccess,
    LoadPatientCollectionNotesFailure,
    LoadContactType,
    LoadContactTypeSuccess,
    LoadContactTypeFailure,
    LoadContactList,
    LoadContactListSuccess,
    LoadContactListFailure,
    AddPatientCollectionNote,
    AddPatientCollectionNoteSuccess,
    AddPatientCollectionNoteFailure,
    Refresh,
};
