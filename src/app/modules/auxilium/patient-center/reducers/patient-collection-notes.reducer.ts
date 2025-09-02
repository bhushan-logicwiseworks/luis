import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ContactTypeList } from 'app/shared/interfaces/auxilium/patient-center/contact-type-list.interface';
import { PatientNote } from 'app/shared/interfaces/auxilium/patient-center/patient-note.interface';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { PatientCollectionNotesActions } from '../actions/patient-collection-notes.actions';

export const patientsFeatureKey = 'patient-collection-notes';

export interface State extends LoadingState {
    notes: PatientNote[];
    contactType: Patient[];
    contactList: ContactTypeList[];
}

const initialState: State = {
    loading: false,
    error: null,
    notes: [],
    contactType: [],
    contactList: [],
};

export const reducer = createReducer(
    initialState,
    on(PatientCollectionNotesActions.LoadPatientCollectionNotes, state => ({ ...state, loading: true })),
    on(PatientCollectionNotesActions.LoadPatientCollectionNotesSuccess, (state, { notes }) => ({
        ...state,
        loading: false,
        notes,
    })),
    on(PatientCollectionNotesActions.LoadPatientCollectionNotesFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCollectionNotesActions.AddPatientCollectionNote, state => ({ ...state, loading: true })),
    on(PatientCollectionNotesActions.AddPatientCollectionNoteSuccess, state => ({ ...state, loading: false })),
    on(PatientCollectionNotesActions.AddPatientCollectionNoteFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCollectionNotesActions.LoadContactType, state => ({ ...state, loading: true })),
    on(PatientCollectionNotesActions.LoadContactTypeSuccess, (state, { contactType }) => ({
        ...state,
        loading: false,
        contactType,
    })),
    on(PatientCollectionNotesActions.LoadContactTypeFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCollectionNotesActions.LoadContactList, state => ({ ...state, loading: true })),
    on(PatientCollectionNotesActions.LoadContactListSuccess, (state, { contactList }) => ({
        ...state,
        loading: false,
        contactList,
    })),
    on(PatientCollectionNotesActions.LoadContactListFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectNotes = (state: State) => state.notes;
export const contactType = (state: State) => state.contactType;
export const contactList = (state: State) => state.contactList;
