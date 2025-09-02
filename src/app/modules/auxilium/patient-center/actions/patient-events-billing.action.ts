import { createAction, props } from '@ngrx/store';
import { ContactNote } from '../../../../shared/interfaces/auxilium/patient-center/patient-compliance-notes.interface';
import { PatientEventsBilling } from '../../../../shared/interfaces/auxilium/patient-center/patient-events-billing.interface';

const ResetState = createAction('[PatientEventsBilling/API] Reset Patient Events Billing State');

const LoadPatientBillingEvents = createAction(
    '[PatientBillingEvents/API] Load Billing Events',
    props<{ patientId: number; eventType: string }>()
);
const LoadPatientBillingEventsSuccess = createAction(
    '[PatientBillingEvents/API] Load Billing Events Success',
    props<{ BillingEvents: PatientEventsBilling[] }>()
);
const LoadPatientBillingEventsFailure = createAction(
    '[PatientBillingEvents/API] Load Billing Events Failure',
    props<{ error: Error }>()
);

const LoadContactNotes = createAction(
    '[PatientBillingEvents Table/API] Load Contact Notes',
    props<{ patientId: number; refId: number }>()
);
const LoadContactNotesSuccess = createAction(
    '[PatientBillingEvents Table/API] Load Contact Notes Success',
    props<{ notes: ContactNote[] }>()
);
const LoadContactNotesFailure = createAction(
    '[PatientBillingEvents Table/API] Load Contact Notes Failure',
    props<{ error: Error }>()
);

const AddContactNote = createAction(
    '[PatientBillingEvents Table/API] Add Contact Note',
    props<{ note: ContactNote }>()
);
const AddContactNoteSuccess = createAction(
    '[PatientBillingEvents Table/API] Add Contact Note Success',
    props<{ note: ContactNote }>()
);
const AddContactNoteFailure = createAction(
    '[PatientBillingEvents Table/API] Add Contact Note Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[PatientEventsBilling/API] Refresh');

export const PatientEventsBillingActions = {
    LoadPatientBillingEvents,
    LoadPatientBillingEventsSuccess,
    LoadPatientBillingEventsFailure,
    LoadContactNotes,
    LoadContactNotesSuccess,
    LoadContactNotesFailure,
    AddContactNote,
    AddContactNoteSuccess,
    AddContactNoteFailure,
    Refresh,
    ResetState,
};
