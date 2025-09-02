import { createAction, props } from '@ngrx/store';
import { Audit } from 'app/shared/interfaces/auxilium/patient-center/patient-audit.interface';

const ResetState = createAction('[Patient Audit/API] Reset Patient Audit State');

const loadAudit = createAction('[Patient Audit/API] Load Audit', props<{ patientId: number }>());
const loadAuditSuccess = createAction('[Patient Audit/API] Load Audit Success', props<{ audits: Audit[] }>());
const loadAuditFailure = createAction('[Patient Audit/API] Load Audit Failure', props<{ error: Error }>());

const addAudit = createAction('[Patient Audit/API] Add Audit', props<{ audit: Audit }>());
const addAuditSuccess = createAction('[Patient Audit/API] Add Audit Success', props<{ audit: Audit[] }>());
const addAuditFailure = createAction('[Patient Audit/API] Add Audit Failure', props<{ error: Error }>());

const updateAudit = createAction('[Patient Audit/API] Update Audit', props<{ audit: Audit }>());
const updateAuditSuccess = createAction('[Patient Audit/API] Update Audit Success', props<{ audit: Audit[] }>());
const updateAuditFailure = createAction('[Patient Audit/API] Update Audit Failure', props<{ error: Error }>());

const refresh = createAction('[Patient Audit/API] Refresh');

const DeleteAudit = createAction('[Audit/API] Delete Patient Audit', props<{ audit: Audit }>());
const DeleteAuditSuccess = createAction('[Audit/API] Delete Patient Audit Success');
const DeleteAuditFailure = createAction('[Audit/API] Delete Patient Audit Failure', props<{ error: Error }>());

const LoadContactNotes = createAction(
    '[Patient Audit/API] Load Contact Notes',
    props<{ patientId: number; refId: number }>()
);
const LoadContactNotesSuccess = createAction(
    '[Patient Audit/API] Load Contact Notes Success',
    props<{ notes: any[] }>()
);
const LoadContactNotesFailure = createAction(
    '[Patient Audit/API] Load Contact Notes Failure',
    props<{ error: Error }>()
);

const AddContactNote = createAction('[Patient Audit/API] Add Contact Note', props<{ note: any }>());
const AddContactNoteSuccess = createAction('[Patient Audit/API] Add Contact Note Success', props<{ note: any }>());
const AddContactNoteFailure = createAction('[Patient Audit/API] Add Contact Note Failure', props<{ error: Error }>());

export const AuditActions = {
    loadAudit,
    loadAuditSuccess,
    loadAuditFailure,
    addAudit,
    addAuditSuccess,
    addAuditFailure,
    updateAudit,
    updateAuditSuccess,
    updateAuditFailure,
    DeleteAudit,
    DeleteAuditSuccess,
    DeleteAuditFailure,
    LoadContactNotes,
    LoadContactNotesSuccess,
    LoadContactNotesFailure,
    AddContactNote,
    AddContactNoteSuccess,
    AddContactNoteFailure,
    refresh,
    ResetState,
};
