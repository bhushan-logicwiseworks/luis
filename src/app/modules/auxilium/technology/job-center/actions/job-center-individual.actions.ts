import { createAction, props } from '@ngrx/store';
import { JobHistoryDetailsDisplay } from 'app/shared/interfaces/auxilium/job-center/job-history-details.interface';
import { Job } from 'app/shared/interfaces/auxilium/job-center/job.interface';

const CreateJob = createAction('[Job Create/API] Create Job', props<{ job: Job }>());
const CreateJobSuccess = createAction('[Job Create/API] Create Job Success', props<{ job: Job }>());
const CreateJobFailure = createAction('[Job Create/API] Create Job Failure', props<{ error: Error }>());

const LoadJobHistoryDetailsById = createAction(
    '[Job Details/API] Load Job History Details By Id',
    props<{ historyId: number }>()
);
const LoadJobHistoryDetailsByIdSuccess = createAction(
    '[Job Details/API] Load Job History Details By Id Success',
    props<{ JobHistoryData: JobHistoryDetailsDisplay[] }>()
);
const LoadJobHistoryDetailsByIdFailure = createAction(
    '[Job Details/API] Load Job History Details By Id Failure',
    props<{ error: Error }>()
);

export const JobIndividualActions = {
    CreateJob,
    CreateJobSuccess,
    CreateJobFailure,
    LoadJobHistoryDetailsById,
    LoadJobHistoryDetailsByIdSuccess,
    LoadJobHistoryDetailsByIdFailure,
};
