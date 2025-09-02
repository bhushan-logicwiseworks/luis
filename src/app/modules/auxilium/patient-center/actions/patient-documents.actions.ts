import { createAction, props } from '@ngrx/store';
import { PatientDocument } from 'app/shared/interfaces/auxilium/patient-center/patient-document.interface';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';

const LoadDocuments = createAction('[Patient Documents/API] Load Documents', props<{ patientId: Patient['id'] }>());
const LoadDocumentsSuccess = createAction(
    '[Patient Documents/API] Load Documents Success',
    props<{ documents: PatientDocument[] }>()
);
const LoadDocumentsFailure = createAction('[Patient Documents/API] Load Documents Failure', props<{ error: Error }>());

const LoadDocument = createAction('[Patient Documents/API] Load Document', props<{ id: PatientDocument['id'] }>());
const LoadDocumentSuccess = createAction('[Patient Documents/API] Load Document Success', props<{ document: any }>());
const LoadDocumentFailure = createAction('[Patient Documents/API] Load Document Failure', props<{ error: Error }>());

const AddDocument = createAction('[Patient Documents/API] Add Document', props<{ document: PatientDocument[] }>());
const AddDocumentSuccess = createAction(
    '[Patient Documents/API] Add Document Success',
    props<{ document: PatientDocument[] }>()
);
const AddDocumentFailure = createAction('[Patient Documents/API] Add Document Failure', props<{ error: Error }>());

const DocumentSave = createAction('[Patient Documents/API] Update Document', props<{ document: PatientDocument[] }>());
const DocumentSaveSuccess = createAction(
    '[Patient Documents/API] Update Document Success',
    props<{ document: PatientDocument[] }>()
);
const DocumentSaveFailure = createAction('[Patient Documents/API] Update Document Failure', props<{ error: Error }>());

const SetPreviewUrl = createAction('[Patient Documents/API] Set Preview URL', props<{ id: PatientDocument['id'] }>());
const SetPreviewUrlSuccess = createAction(
    '[Patient Documents/API] Set Preview URL Success',
    props<{ document: any }>()
);
const SetPreviewUrlFailure = createAction('[Patient Documents/API] Set Preview URL Failure', props<{ error: Error }>());

const DeletePatientDocument = createAction(
    '[Patient Documents/API] Delete Patient Document',
    props<{ id: PatientDocument }>()
);
const DeletePatientDocumentSuccess = createAction('[Patient Documents/API] Delete Patient Document Success');
const DeletePatientDocumentFailure = createAction(
    '[Patient Documents/API] Delete Patient Document Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[Patient Documents/API] Refresh');

export const PatientDocumentsActions = {
    LoadDocuments,
    LoadDocumentsSuccess,
    LoadDocumentsFailure,
    DocumentSave,
    DocumentSaveSuccess,
    DocumentSaveFailure,
    LoadDocument,
    LoadDocumentSuccess,
    LoadDocumentFailure,
    AddDocument,
    AddDocumentSuccess,
    AddDocumentFailure,
    SetPreviewUrl,
    SetPreviewUrlSuccess,
    SetPreviewUrlFailure,
    DeletePatientDocument,
    DeletePatientDocumentSuccess,
    DeletePatientDocumentFailure,
    Refresh,
};
