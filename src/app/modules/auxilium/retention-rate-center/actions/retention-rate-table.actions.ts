import { createAction, props } from '@ngrx/store';
import {
    GetRetentionRateResponse,
    RetentionRate,
} from 'app/shared/interfaces/auxilium/retention-rate-center/retention-rate.interface';

const LoadRetentions = createAction('[RetentionRate Table/API] Load Retentions');
const LoadRetentionsSuccess = createAction(
    '[RetentionRate Table/API] Load Retentions Success',
    props<{ retentions: GetRetentionRateResponse }>()
);
const LoadRetentionsFailure = createAction(
    '[RetentionRate Table/API] Load Retentions Failure',
    props<{ error: Error }>()
);

const AddRetention = createAction('[RetentionRate Table/API] Add Retention', props<{ retention: RetentionRate }>());
const AddRetentionSuccess = createAction('[RetentionRate Table/API] Add Retention Success');
const AddRetentionsFailure = createAction('[RetentionRate Table/API] Add Retention Failure', props<{ error: Error }>());

const DeleteRetentions = createAction(
    '[RetentionRate Table/API] Delete Retentions',
    props<{ retentionRate: RetentionRate }>()
);
const DeleteRetentionsSuccess = createAction('[RetentionRate Table/API] Delete Retentions Success');
const DeleteRetentionsFailure = createAction(
    '[RetentionRate Table/API] Delete Retentions Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[RetentionRate Table/API] Refresh');
const ResetState = createAction('[RetentionRate Table/API] Reset Retentions Rate State');

export const RetentionRateTableActions = {
    LoadRetentions,
    LoadRetentionsSuccess,
    LoadRetentionsFailure,
    AddRetention,
    AddRetentionSuccess,
    AddRetentionsFailure,
    DeleteRetentions,
    DeleteRetentionsSuccess,
    DeleteRetentionsFailure,
    Refresh,
    ResetState,
};
