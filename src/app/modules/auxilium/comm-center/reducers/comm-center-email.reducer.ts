import { createReducer, on } from '@ngrx/store';
import { Email, GetOwnersResponse } from 'app/shared/interfaces/auxilium/comm-center/api-responses.interface';
import { Attachment } from 'app/shared/interfaces/auxilium/comm-center/attachment.interface';
import { Note } from 'app/shared/interfaces/auxilium/comm-center/note.interface';
import { EmailTag } from 'app/shared/interfaces/auxilium/comm-center/tag.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { GetPatientResponse } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { CommCenterEmailActions } from '../actions/comm-center-email.actions';

export const featureKey = 'comm-center-email';

export interface State extends LoadingState {
    email: Email;
    owners: GetOwnersResponse;
    loadingOwners: boolean;
    notes: Note[];
    loadingNotes: boolean;
    updatingNotes: boolean;
    attachments: Attachment[];
    loadingAttachments: boolean;
    updatingLabel: boolean;
    updatingOwner: boolean;
    tags: EmailTag[];
    loadingTags: boolean;
    updatingTags: number; // Incremental Loading Counter
    audioPlaying: boolean;
    audio: any;
    previewUrl: string;
    patient: GetPatientResponse | any;
}

const initialState: State = {
    loading: false,
    error: null,
    email: null,

    owners: [],
    loadingOwners: false,
    notes: [],
    loadingNotes: false,
    updatingNotes: false,
    attachments: [],
    loadingAttachments: false,

    updatingLabel: false,
    updatingOwner: false,

    tags: [],
    loadingTags: false,
    updatingTags: 0,
    audioPlaying: false,
    audio: null,
    previewUrl: null,
    patient: [],
};

export const reducer = createReducer(
    initialState,
    on(CommCenterEmailActions.ResetState, () => {
        return initialState;
    }),
    on(CommCenterEmailActions.LoadEmail, state => ({ ...state, loading: true, error: null, email: null })),
    on(CommCenterEmailActions.LoadEmailSuccess, (state, { email }) => ({ ...state, loading: false, email })),
    on(CommCenterEmailActions.LoadEmailFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterEmailActions.LoadOwners, state => ({ ...state, loadingOwners: true, error: null })),
    on(CommCenterEmailActions.LoadOwnersSuccess, (state, { owners }) => ({ ...state, loadingOwners: false, owners })),
    on(CommCenterEmailActions.LoadOwnersFailure, (state, { error }) => ({ ...state, loadingOwners: false, error })),

    on(CommCenterEmailActions.LoadCommDocument, state => ({ ...state, loading: true, error: null })),
    on(CommCenterEmailActions.LoadCommDocumentSuccess, state => ({ ...state, loading: false })),
    on(CommCenterEmailActions.LoadCommDocumentFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterEmailActions.LoadNotes, state => ({ ...state, loadingNotes: true, notes: [], error: null })),
    on(CommCenterEmailActions.LoadNotesSuccess, (state, { notes }) => ({ ...state, loadingNotes: false, notes })),
    on(CommCenterEmailActions.LoadNotesFailure, (state, { error }) => ({ ...state, loadingNotes: false, error })),

    on(CommCenterEmailActions.UpdateLabel, state => ({ ...state, updatingLabel: true, error: null })),
    on(CommCenterEmailActions.UpdateLabelSuccess, (state, {}) => ({ ...state, updatingLabel: false })),
    on(CommCenterEmailActions.UpdateLabelFailure, (state, { error }) => ({ ...state, updatingLabel: false, error })),

    on(CommCenterEmailActions.UpdateOwner, state => ({ ...state, updatingOwner: true, error: null })),
    on(CommCenterEmailActions.UpdateOwnerSuccess, (state, {}) => ({ ...state, updatingOwner: false })),
    on(CommCenterEmailActions.UpdateOwnerFailure, (state, { error }) => ({ ...state, updatingOwner: false, error })),

    on(CommCenterEmailActions.LoadAttachments, state => ({
        ...state,
        loadingAttachments: true,
        attachments: [],
        error: null,
    })),
    on(CommCenterEmailActions.LoadAttachmentsSuccess, (state, { attachments }) => ({
        ...state,
        loadingAttachments: false,
        attachments,
    })),
    on(CommCenterEmailActions.LoadAttachmentsFailure, (state, { error }) => ({
        ...state,
        loadingAttachments: false,
        error,
    })),

    on(CommCenterEmailActions.AddNote, state => ({ ...state, updatingNotes: true, error: null })),
    on(CommCenterEmailActions.AddNoteSuccess, (state, { note }) => ({
        ...state,
        updatingNotes: false,
        notes: [...state.notes, note],
    })),
    on(CommCenterEmailActions.AddNoteFailure, (state, { error }) => ({ ...state, updatingNotes: false, error })),

    on(CommCenterEmailActions.LoadTags, state => ({ ...state, loadingTags: true, tags: [], error: null })),
    on(CommCenterEmailActions.LoadTagsSuccess, (state, { tags }) => ({ ...state, loadingTags: false, tags })),
    on(CommCenterEmailActions.LoadTagsFailure, (state, { error }) => ({ ...state, loadingTags: false, error })),

    on(CommCenterEmailActions.AddTag, state => ({ ...state, updatingTags: state.updatingTags + 1, error: null })),
    on(CommCenterEmailActions.AddTagSuccess, (state, {}) => ({ ...state, updatingTags: state.updatingTags - 1 })),
    on(CommCenterEmailActions.AddTagFailure, (state, { error }) => ({
        ...state,
        updatingTags: state.updatingTags - 1,
        error,
    })),

    on(CommCenterEmailActions.DeleteTag, state => ({ ...state, updatingTags: state.updatingTags + 1, error: null })),
    on(CommCenterEmailActions.DeleteTagSuccess, (state, {}) => ({ ...state, updatingTags: state.updatingTags - 1 })),
    on(CommCenterEmailActions.DeleteTagFailure, (state, { error }) => ({
        ...state,
        updatingTags: state.updatingTags - 1,
        error,
    })),

    on(CommCenterEmailActions.PatientSearch, state => ({ ...state, loading: true, patient: null })),
    on(CommCenterEmailActions.PatientSearchSuccess, (state, { patient }) => ({ ...state, loading: false, patient })),
    on(CommCenterEmailActions.PatientSearchFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(CommCenterEmailActions.PatientFaxIntoPatientRecord, state => ({ ...state, loading: true, patient: null })),
    on(CommCenterEmailActions.PatientFaxIntoPatientRecordSuccess, (state, { patient }) => ({
        ...state,
        loading: false,
        patient,
    })),
    on(CommCenterEmailActions.PatientFaxIntoPatientRecordFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(CommCenterEmailActions.PlayAudioAttachmentSuccess, (state, { data }) => ({
        ...state,
        audio: data,
        audioPlaying: true,
    })),
    on(CommCenterEmailActions.StopAudioAttachment, state => ({ ...state, audio: null, audioPlaying: false })),

    on(CommCenterEmailActions.SetPreviewUrl, (state, { url }) => ({ ...state, previewUrl: url, loading: false }))
);

export const selectLoading = (state: State) => state.loading;
export const selectEmail = (state: State) => state.email;
export const selectLoadingOwners = (state: State) => state.loadingOwners;
export const selectLoadingNotes = (state: State) => state.loadingNotes;
export const selectLoadingAttachments = (state: State) => state.loadingAttachments;
export const selectUpdatingLabel = (state: State) => state.updatingLabel;
export const selectUpdatingOwner = (state: State) => state.updatingOwner;
export const selectError = (state: State) => state.error;
export const selectOwners = (state: State) => state.owners;
export const selectNotes = (state: State) => state.notes;
export const selectUpdatingNotes = (state: State) => state.updatingNotes;
export const selectAttachments = (state: State) => state.attachments;
export const selectTags = (state: State) => state.tags;
export const selectLoadingTags = (state: State) => state.loadingTags;
export const selectUpdatingTags = (state: State) => state.updatingTags > 0;
export const selectAudio = (state: State) => state.audio;
export const selectAudioPlaying = (state: State) => state.audioPlaying;
export const selectPreviewUrl = (state: State) => state.previewUrl;
export const selectPatients = (state: State) => state.patient;
