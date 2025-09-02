import { createReducer, on } from '@ngrx/store';

import { PatientDocumentsActions } from '../actions/patient-documents.actions';

import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientDocument } from 'app/shared/interfaces/auxilium/patient-center/patient-document.interface';

export const patientsFeatureKey = 'patient-documents';

export interface State extends LoadingState {
    documents: PatientDocument[];
    document: Blob;
    previewUrl: Blob;
}

const initialState: State = {
    loading: false,
    error: null,
    documents: [],
    document: null,
    previewUrl: null,
};

export const reducer = createReducer(
    initialState,
    on(PatientDocumentsActions.LoadDocuments, state => ({ ...state, loading: true })),
    on(PatientDocumentsActions.LoadDocumentsSuccess, (state, { documents }) => ({
        ...state,
        loading: false,
        documents,
    })),
    on(PatientDocumentsActions.LoadDocumentsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientDocumentsActions.LoadDocument, state => ({ ...state, loading: true })),
    on(PatientDocumentsActions.LoadDocumentSuccess, (state, { document }) => ({ ...state, loading: false, document })),
    on(PatientDocumentsActions.LoadDocumentFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientDocumentsActions.SetPreviewUrl, state => ({ ...state, loading: true })),
    on(PatientDocumentsActions.SetPreviewUrlSuccess, (state, { document }) => ({ ...state, loading: false, document })),
    on(PatientDocumentsActions.SetPreviewUrlFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectDocuments = (state: State) => state.documents;
export const selectDocument = (state: State) => state.document;
export const selectPreviewUrl = (state: State) => state.previewUrl;
