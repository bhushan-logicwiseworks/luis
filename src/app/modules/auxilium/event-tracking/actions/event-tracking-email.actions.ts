import { createAction, props } from '@ngrx/store';
import { Email, GetOwnersResponse } from 'app/shared/interfaces/auxilium/comm-center/api-responses.interface';
import { Attachment } from 'app/shared/interfaces/auxilium/comm-center/attachment.interface';
import { Note } from 'app/shared/interfaces/auxilium/comm-center/note.interface';
import { EmailTag } from 'app/shared/interfaces/auxilium/comm-center/tag.interface';
import { UpdateLabelResponse } from 'app/shared/interfaces/auxilium/comm-center/update-label-response.interface';
import { UpdateOwnerResponse } from 'app/shared/interfaces/auxilium/comm-center/update-owner-response.interface';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';

const ResetState = createAction('[EventTracking Email/API] Reset email State');

const LoadEmail = createAction('[EventTracking Email/API] Load Email', props<{ emailId: Email['id'] }>());
const LoadEmailSuccess = createAction('[EventTracking Email/API] Load Email Success', props<{ email: Email }>());
const LoadEmailFailure = createAction('[EventTracking Email/API] Load Email Failure', props<{ error: Error }>());

const LoadOwners = createAction('[EventTracking Email/API] Load Owners');
const LoadOwnersSuccess = createAction(
    '[EventTracking Email/API] Load Owners Success',
    props<{ owners: GetOwnersResponse }>()
);
const LoadOwnersFailure = createAction('[EventTracking Email/API] Load Owners Failure', props<{ error: Error }>());

const LoadCommDocument = createAction(
    '[EventTracking Email/API] Load Comm Document',
    props<{ attachmentId: Attachment['id']; isPreviewOnly?: boolean; attachMentName?: string }>()
);
const LoadCommDocumentSuccess = createAction(
    '[EventTracking Email/API] Load Comm Document Success',
    props<{ document: Blob; isPreviewOnly?: boolean; attachMentName?: string }>()
);
const LoadCommDocumentFailure = createAction(
    '[EventTracking Email/API] Load Comm Document Failure',
    props<{ error: Error }>()
);

const LoadNotes = createAction('[EventTracking Email/API] Load Notes', props<{ emailId: Email['id'] }>());
const LoadNotesSuccess = createAction('[EventTracking Email/API] Load Notes Success', props<{ notes: Note[] }>());
const LoadNotesFailure = createAction('[EventTracking Email/API] Load Notes Failure', props<{ error: Error }>());

const UpdateLabel = createAction(
    '[EventTracking Email/API] Update Label',
    props<{ emailId: Email['id']; label: string }>()
);
const UpdateLabelSuccess = createAction(
    '[EventTracking Email/API] Update Label Success',
    props<{ update: UpdateLabelResponse }>()
);
const UpdateLabelFailure = createAction('[EventTracking Email/API] Update Label Failure', props<{ error: Error }>());

const UpdateOwner = createAction(
    '[EventTracking Email/API] Update Owner',
    props<{ emailId: Email['id']; owner: string }>()
);
const UpdateOwnerSuccess = createAction(
    '[EventTracking Email/API] Update Owner Success',
    props<{ update: UpdateOwnerResponse }>()
);
const UpdateOwnerFailure = createAction('[EventTracking Email/API] Update Owner Failure', props<{ error: Error }>());

const LoadAttachments = createAction('[EventTracking Email/API] Load Attachments', props<{ emailId: Email['id'] }>());
const LoadAttachmentsSuccess = createAction(
    '[EventTracking Email/API] Load Attachments Success',
    props<{ attachments: Attachment[] }>()
);
const LoadAttachmentsFailure = createAction(
    '[EventTracking Email/API] Load Attachments Failure',
    props<{ error: Error }>()
);

const LoadTags = createAction('[EventTracking Email/API] Load Tags', props<{ emailId: Email['id'] }>());
const LoadTagsSuccess = createAction('[EventTracking Email/API] Load Tags Success', props<{ tags: EmailTag[] }>());
const LoadTagsFailure = createAction('[EventTracking Email/API] Load Tags Failure', props<{ error: Error }>());

const AddTag = createAction('[EventTracking Email/API] Add Tag', props<{ emailId: Email['id']; tag: string }>());
const AddTagSuccess = createAction('[EventTracking Email/API] Add Tag Success');
const AddTagFailure = createAction('[EventTracking Email/API] Add Tag Failure', props<{ error: Error }>());

const DeleteTag = createAction('[EventTracking Email/API] Delete Tag', props<{ emailId: Email['id']; tag: string }>());
const DeleteTagSuccess = createAction('[EventTracking Email/API] Delete Tag Success');
const DeleteTagFailure = createAction('[EventTracking Email/API] Delete Tag Failure', props<{ error: Error }>());

const AddNote = createAction('[EventTracking Email/API] Add Note', props<{ note: Note }>());
const AddNoteSuccess = createAction('[EventTracking Email/API] Add Note Success', props<{ note: Note }>());
const AddNoteFailure = createAction('[EventTracking Email/API] Add Note Failure', props<{ error: Error }>());

const PlayAudioAttachment = createAction(
    '[EventTracking Attachment/API] Play Audio Attachment',
    props<{ attachmentId: number }>()
);
const PlayAudioAttachmentSuccess = createAction(
    '[EventTracking Attachment/API] Play Audio Attachment Success',
    props<{ data: any }>()
);
const PlayAudioAttachmentFailure = createAction(
    '[EventTracking Attachment/API] Play Audio Attachment Failure',
    props<{ error: Error }>()
);

const PatientSearch = createAction(
    '[EventTracking Patient Search/API] Link Patient Search',
    props<{ patientSearch: Patient }>()
);
const PatientSearchSuccess = createAction(
    '[EventTracking Patient Search/API] Link Patient Search Success',
    props<{ patient: Patient }>()
);
const PatientSearchFailure = createAction(
    '[EventTracking Patient Search/API] Link Patient Search Failure',
    props<{ error: Error }>()
);

const PatientFaxIntoPatientRecord = createAction(
    '[EventTracking Patient Search/API] Fax Link Patient Search',
    props<{ contactInfo: any }>()
);
const PatientFaxIntoPatientRecordSuccess = createAction(
    '[EventTracking Patient Search/API] Fax Link Patient Search Success',
    props<{ patient: Patient }>()
);
const PatientFaxIntoPatientRecordFailure = createAction(
    '[EventTracking Patient Search/API] Fax Link Patient Search Failure',
    props<{ error: Error }>()
);

const StopAudioAttachment = createAction('[EventTracking Attachment] Stop Audio');

const SetPreviewUrl = createAction('[EventTracking/API] Set Preview URL', props<{ url: string }>());

export const EventTrackingEmailActions = {
    LoadEmail,
    LoadEmailSuccess,
    LoadEmailFailure,
    LoadOwners,
    LoadOwnersSuccess,
    LoadOwnersFailure,
    LoadCommDocument,
    LoadCommDocumentSuccess,
    LoadCommDocumentFailure,
    LoadNotes,
    LoadNotesSuccess,
    LoadNotesFailure,
    UpdateLabel,
    UpdateLabelSuccess,
    UpdateLabelFailure,
    UpdateOwner,
    UpdateOwnerSuccess,
    UpdateOwnerFailure,
    LoadAttachments,
    LoadAttachmentsSuccess,
    LoadAttachmentsFailure,
    LoadTags,
    LoadTagsSuccess,
    LoadTagsFailure,
    AddTag,
    AddTagSuccess,
    AddTagFailure,
    DeleteTag,
    DeleteTagSuccess,
    DeleteTagFailure,
    AddNote,
    AddNoteSuccess,
    AddNoteFailure,
    PlayAudioAttachment,
    PlayAudioAttachmentSuccess,
    PlayAudioAttachmentFailure,
    StopAudioAttachment,
    SetPreviewUrl,
    PatientSearch,
    PatientSearchSuccess,
    PatientSearchFailure,
    PatientFaxIntoPatientRecord,
    PatientFaxIntoPatientRecordSuccess,
    PatientFaxIntoPatientRecordFailure,
    ResetState,
};
