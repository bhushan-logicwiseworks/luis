import { createAction, props } from '@ngrx/store';
import { Email, GetOwnersResponse } from 'app/shared/interfaces/auxilium/comm-center/api-responses.interface';
import { CreateEmailDto } from 'app/shared/interfaces/auxilium/comm-center/create-email.dto';

const CreateEmail = createAction('[CommCenter Create/API] Create Email', props<{ dto: CreateEmailDto }>());
const CreateEmailSuccess = createAction('[CommCenter Create/API] Create Email Success', props<{ email: Email }>());
const CreateEmailFailure = createAction('[CommCenter Create/API] Create Email Failure', props<{ error: Error }>());

const LoadOwners = createAction('[CommCenter Create/API] Load Owners');
const LoadOwnersSuccess = createAction(
    '[CommCenter Create/API] Load Owners Success',
    props<{ owners: GetOwnersResponse }>()
);
const LoadOwnersFailure = createAction('[CommCenter Create/API] Load Owners Failure', props<{ error: Error }>());

export const CommCenterCreateActions = {
    CreateEmail,
    CreateEmailSuccess,
    CreateEmailFailure,
    LoadOwners,
    LoadOwnersSuccess,
    LoadOwnersFailure,
};
