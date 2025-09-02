import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { ContactTypeList } from 'app/shared/interfaces/auxilium/patient-center/contact-type-list.interface';
import { PatientNote } from 'app/shared/interfaces/auxilium/patient-center/patient-note.interface';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { PatientNotesActions } from '../actions/patient-notes.actions';

export const patientsFeatureKey = 'patient-notes';

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
    on(PatientNotesActions.LoadPatientNotes, state => ({ ...state, loading: true })),
    on(PatientNotesActions.LoadPatientNotesSuccess, (state, { notes }) => ({ ...state, loading: false, notes })),
    on(PatientNotesActions.LoadPatientNotesFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientNotesActions.AddPatientNote, state => ({ ...state, loading: true })),
    on(PatientNotesActions.AddPatientNoteSuccess, state => ({ ...state, loading: false })),
    on(PatientNotesActions.AddPatientNoteFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientNotesActions.LoadContactType, state => ({ ...state, loading: true })),
    on(PatientNotesActions.LoadContactTypeSuccess, (state, { contactType }) => ({
        ...state,
        loading: false,
        contactType,
    })),
    on(PatientNotesActions.LoadContactTypeFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(PatientNotesActions.LoadContactList, state => ({ ...state, loading: true })),
    on(PatientNotesActions.LoadContactListSuccess, (state, { contactList }) => ({
        ...state,
        loading: false,
        contactList,
    })),
    on(PatientNotesActions.LoadContactListFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectNotes = (state: State) => state.notes;
export const contactType = (state: State) => state.contactType;
export const contactList = (state: State) => state.contactList;
