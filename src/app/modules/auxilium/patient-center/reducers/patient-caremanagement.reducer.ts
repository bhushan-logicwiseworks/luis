import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientCareManagement } from 'app/shared/interfaces/auxilium/patient-center/patient-caremanagement.interface';
import { ContactNote } from 'app/shared/interfaces/auxilium/patient-center/patient-compliance-notes.interface';
import { GetOwnersResponse } from '../../../../shared/interfaces/auxilium/comm-center/api-responses.interface';
import { InsuranceInfo } from '../../../../shared/interfaces/auxilium/patient-center/insurance-info.interface';
import { PatientCareManagementActions } from '../actions/patient-caremanagement.action';

export const featureKey = 'patient-caremanagement';

export interface State extends LoadingState {
    records: PatientCareManagement[];
    contactNotes: ContactNote[];
    owners: GetOwnersResponse[];
    loadingOwners: boolean;
    payorRank1: InsuranceInfo[];
}

const initialState: State = {
    loading: false,
    loadingOwners: false,
    error: null,
    records: [],
    contactNotes: [],
    owners: [],
    payorRank1: [],
};

export const reducer = createReducer(
    initialState,
    on(PatientCareManagementActions.LoadPatientCareManagement, state => ({ ...state, loading: true, records: [] })),
    on(PatientCareManagementActions.LoadPatientCareManagementSuccess, (state, { records }) => ({
        ...state,
        loading: false,
        records,
    })),
    on(PatientCareManagementActions.LoadPatientCareManagementFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCareManagementActions.AddPatientCareManagement, state => ({ ...state, loading: true })),
    on(PatientCareManagementActions.AddPatientCareManagementSuccess, state => ({ ...state, loading: false })), // Refresh reloads
    on(PatientCareManagementActions.AddPatientCareManagementFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCareManagementActions.DeletePatientCareManagement, state => ({ ...state, loading: true })),
    on(PatientCareManagementActions.DeletePatientCareManagementSuccess, state => ({ ...state, loading: false })),
    on(PatientCareManagementActions.DeletePatientCareManagementFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCareManagementActions.LoadContactNotes, state => ({ ...state, contactNotes: [], loading: true })),
    on(PatientCareManagementActions.LoadContactNotesSuccess, (state, { notes }) => ({
        ...state,
        contactNotes: notes,
        loading: false,
    })),
    on(PatientCareManagementActions.LoadContactNotesFailure, (state, { error }) => ({
        ...state,
        contactNotes: [],
        loading: false,
        error,
    })),

    on(PatientCareManagementActions.AddContactNote, state => ({ ...state, loading: true })),
    on(PatientCareManagementActions.AddContactNoteSuccess, (state, { note }) => ({
        ...state,
        loading: false,
        contactNotes: [...state.contactNotes, note],
    })),
    on(PatientCareManagementActions.AddContactNoteFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // LoadOwners reducers
    on(PatientCareManagementActions.LoadOwners, state => ({ ...state, loadingOwners: true })),
    on(PatientCareManagementActions.LoadOwnersSuccess, (state, { owners }) => ({
        ...state,
        loadingOwners: false,
        owners,
    })),
    on(PatientCareManagementActions.LoadOwnersFailure, (state, { error }) => ({
        ...state,
        loadingOwners: false,
        error,
    })),

    on(PatientCareManagementActions.LoadPayorRank1, state => ({ ...state, loading: true, payorRank1: [] })),
    on(PatientCareManagementActions.LoadPayorRank1Success, (state, { payorRank1 }) => ({
        ...state,
        loading: false,
        payorRank1,
    })),
    on(PatientCareManagementActions.LoadPayorRank1Failure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCareManagementActions.ResetState, () => initialState)
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectRecords = (state: State) => state.records;
export const selectContactNotes = (state: State) => state.contactNotes;
export const selectOwners = (state: State) => state.owners;
export const selectOwnersLoading = (state: State) => state.loadingOwners;
export const selectPayorRank1 = (state: State) => state.payorRank1;
