import { createAction, props } from '@ngrx/store';
import { Email, GetOwnersResponse } from 'app/shared/interfaces/auxilium/comm-center/api-responses.interface';
import { Attachment } from 'app/shared/interfaces/auxilium/comm-center/attachment.interface';
import { Note } from 'app/shared/interfaces/auxilium/comm-center/note.interface';
import { EmailTag } from 'app/shared/interfaces/auxilium/comm-center/tag.interface';
import { UpdateLabelResponse } from 'app/shared/interfaces/auxilium/comm-center/update-label-response.interface';
import { UpdateOwnerResponse } from 'app/shared/interfaces/auxilium/comm-center/update-owner-response.interface';

const LoadEmail = createAction('[CommCenter Email/API] Load Email', props<{ emailId: Email['id'] }>());
const LoadEmailSuccess = createAction('[CommCenter Email/API] Load Email Success', props<{ email: Email }>());
const LoadEmailFailure = createAction('[CommCenter Email/API] Load Email Failure', props<{ error: Error }>());

const LoadOwners = createAction('[CommCenter Email/API] Load Owners');
const LoadOwnersSuccess = createAction(
    '[CommCenter Email/API] Load Owners Success',
    props<{ owners: GetOwnersResponse }>()
);
const LoadOwnersFailure = createAction('[CommCenter Email/API] Load Owners Failure', props<{ error: Error }>());

const LoadDocument = createAction(
    '[CommCenter Email/API] Load Document',
    props<{ attachmentId: Attachment['id']; isPreviewOnly?: boolean }>()
);
const LoadDocumentSuccess = createAction(
    '[CommCenter Email/API] Load Document Success',
    props<{ document: Blob; isPreviewOnly?: boolean }>()
);
const LoadDocumentFailure = createAction('[CommCenter Email/API] Load Document Failure', props<{ error: Error }>());

const LoadNotes = createAction('[CommCenter Email/API] Load Notes', props<{ emailId: Email['id'] }>());
const LoadNotesSuccess = createAction('[CommCenter Email/API] Load Notes Success', props<{ notes: Note[] }>());
const LoadNotesFailure = createAction('[CommCenter Email/API] Load Notes Failure', props<{ error: Error }>());

const UpdateLabel = createAction(
    '[CommCenter Email/API] Update Label',
    props<{ emailId: Email['id']; label: string }>()
);
const UpdateLabelSuccess = createAction(
    '[CommCenter Email/API] Update Label Success',
    props<{ update: UpdateLabelResponse }>()
);
const UpdateLabelFailure = createAction('[CommCenter Email/API] Update Label Failure', props<{ error: Error }>());

const UpdateOwner = createAction(
    '[CommCenter Email/API] Update Owner',
    props<{ emailId: Email['id']; owner: string }>()
);
const UpdateOwnerSuccess = createAction(
    '[CommCenter Email/API] Update Owner Success',
    props<{ update: UpdateOwnerResponse }>()
);
const UpdateOwnerFailure = createAction('[CommCenter Email/API] Update Owner Failure', props<{ error: Error }>());

const LoadAttachments = createAction('[CommCenter Email/API] Load Attachments', props<{ emailId: Email['id'] }>());
const LoadAttachmentsSuccess = createAction(
    '[CommCenter Email/API] Load Attachments Success',
    props<{ attachments: Attachment[] }>()
);
const LoadAttachmentsFailure = createAction(
    '[CommCenter Email/API] Load Attachments Failure',
    props<{ error: Error }>()
);

const LoadTags = createAction('[CommCenter Email/API] Load Tags', props<{ emailId: Email['id'] }>());
const LoadTagsSuccess = createAction('[CommCenter Email/API] Load Tags Success', props<{ tags: EmailTag[] }>());
const LoadTagsFailure = createAction('[CommCenter Email/API] Load Tags Failure', props<{ error: Error }>());

const AddTag = createAction('[CommCenter Email/API] Add Tag', props<{ emailId: Email['id']; tag: string }>());
const AddTagSuccess = createAction('[CommCenter Email/API] Add Tag Success');
const AddTagFailure = createAction('[CommCenter Email/API] Add Tag Failure', props<{ error: Error }>());

const DeleteTag = createAction('[CommCenter Email/API] Delete Tag', props<{ emailId: Email['id']; tag: string }>());
const DeleteTagSuccess = createAction('[CommCenter Email/API] Delete Tag Success');
const DeleteTagFailure = createAction('[CommCenter Email/API] Delete Tag Failure', props<{ error: Error }>());

const AddNote = createAction('[CommCenter Email/API] Add Note', props<{ note: Note }>());
const AddNoteSuccess = createAction('[CommCenter Email/API] Add Note Success', props<{ note: Note }>());
const AddNoteFailure = createAction('[CommCenter Email/API] Add Note Failure', props<{ error: Error }>());

const PlayAudioAttachment = createAction(
    '[CommCenter Attachment/API] Play Audio Attachment',
    props<{ attachmentId: number }>()
);
const PlayAudioAttachmentSuccess = createAction(
    '[CommCenter Attachment/API] Play Audio Attachment Success',
    props<{ data: any }>()
);
const PlayAudioAttachmentFailure = createAction(
    '[CommCenter Attachment/API] Play Audio Attachment Failure',
    props<{ error: Error }>()
);

const StopAudioAttachment = createAction('[CommCenter Attachment] Stop Audio');

const SetPreviewUrl = createAction('[CommCenter/API] Set Preview URL', props<{ url: string }>());

export const CommCenterEmailActions = {
    LoadEmail,
    LoadEmailSuccess,
    LoadEmailFailure,
    LoadOwners,
    LoadOwnersSuccess,
    LoadOwnersFailure,
    LoadDocument,
    LoadDocumentSuccess,
    LoadDocumentFailure,
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
};
