import { createAction, props } from '@ngrx/store';
import {
    GetEmailsResponse,
    GetOwnersResponse,
} from 'app/shared/interfaces/auxilium/comm-center/api-responses.interface';

const LoadOwners = createAction('[EventTracking Table/API] Load Owners');
const LoadOwnersSuccess = createAction(
    '[EventTracking Table/API] Load Owners Success',
    props<{ owners: GetOwnersResponse }>()
);
const LoadOwnersFailure = createAction('[EventTracking Table/API] Load Owners Failure', props<{ error: Error }>());

const LoadEventInformation = createAction(
    '[EventTracking Table/API] Load Event Information',
    props<{ status: string; dateRangeOption: string }>()
);
const LoadEventInformationSuccess = createAction(
    '[EventTracking Table/API] Load Event Information Success',
    props<{ StatusInformation: GetEmailsResponse }>()
);
const LoadEventInformationFailure = createAction(
    '[EventTracking Table/API] Load Event Information Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[EventTracking Table/API] Refresh');

export const EventTrackingTableActions = {
    LoadOwners,
    LoadOwnersSuccess,
    LoadOwnersFailure,
    LoadEventInformation,
    LoadEventInformationSuccess,
    LoadEventInformationFailure,
    Refresh,
};
