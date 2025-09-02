import { createAction, props } from '@ngrx/store';
import { ContactNote } from 'app/shared/interfaces/auxilium/patient-center/patient-compliance-notes.interface';
import { Compliance } from 'app/shared/interfaces/auxilium/patient-center/patient-compliance.interface';

const ResetState = createAction('[Patient Compliancet/API] Reset Patient Compliance State');

const loadCompliance = createAction('[Patient Compliance/API] Load Compliance', props<{ patientId: number }>());
const loadComplianceSuccess = createAction(
    '[Patient Compliance/API] Load Compliance Success',
    props<{ compliances: Compliance[] }>()
);
const loadComplianceFailure = createAction(
    '[Patient Compliance/API] Load Compliance Failure',
    props<{ error: Error }>()
);

const addCompliance = createAction('[Patient Compliance/API] Add Compliance', props<{ compliance: Compliance }>());
const addComplianceSuccess = createAction(
    '[Patient Compliance/API] Add Compliance Success',
    props<{ compliance: Compliance[] }>()
);
const addComplianceFailure = createAction('[Patient Compliance/API] Add Compliance Failure', props<{ error: Error }>());

const updateCompliance = createAction(
    '[Patient Compliance/API] Update Compliance',
    props<{ compliance: Compliance }>()
);
const updateComplianceSuccess = createAction(
    '[Patient Compliance/API] Update Compliance Success',
    props<{ compliance: Compliance[] }>()
);
const updateComplianceFailure = createAction(
    '[Patient Compliance/API] Update Compliance Failure',
    props<{ error: Error }>()
);

const refresh = createAction('[Patient Compliance/API] Refresh');

const LoadContactNotes = createAction(
    '[ComplianceCenter Table/API] Load Contact Notes',
    props<{ patientId: number; refId: number }>()
);
const LoadContactNotesSuccess = createAction(
    '[ComplianceCenter Table/API] Load Contact Notes Success',
    props<{ notes: ContactNote[] }>()
);
const LoadContactNotesFailure = createAction(
    '[ComplianceCenter Table/API] Load Contact Notes Failure',
    props<{ error: Error }>()
);

const AddContactNote = createAction('[ComplianceCenter Table/API] Add Contact Note', props<{ note: ContactNote }>());
const AddContactNoteSuccess = createAction(
    '[ComplianceCenter Table/API] Add Contact Note Success',
    props<{ note: ContactNote }>()
);
const AddContactNoteFailure = createAction(
    '[ComplianceCenter Table/API] Add Contact Note Failure',
    props<{ error: Error }>()
);

const DeleteCompliance = createAction(
    '[Compliance/API] Delete Patient Compliance',
    props<{ compliance: Compliance }>()
);
const DeleteComplianceSuccess = createAction('[Compliance/API] Delete Patient Compliance Success');
const DeleteComplianceFailure = createAction(
    '[Compliance/API] Delete Patient Compliance Failure',
    props<{ error: Error }>()
);

export const ComplianceActions = {
    loadCompliance,
    loadComplianceSuccess,
    loadComplianceFailure,
    addCompliance,
    addComplianceSuccess,
    addComplianceFailure,
    updateCompliance,
    updateComplianceSuccess,
    updateComplianceFailure,
    DeleteCompliance,
    DeleteComplianceSuccess,
    DeleteComplianceFailure,
    refresh,
    ResetState,
    LoadContactNotes,
    LoadContactNotesSuccess,
    LoadContactNotesFailure,
    AddContactNote,
    AddContactNoteSuccess,
    AddContactNoteFailure,
};
