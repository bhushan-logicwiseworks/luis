import { createAction, props } from '@ngrx/store';
import { JobDisplay } from 'app/shared/interfaces/auxilium/job-center/job-display.interface';
import { JobHistory } from 'app/shared/interfaces/auxilium/job-center/job-history.interface';
import { Job } from 'app/shared/interfaces/auxilium/job-center/job.interface';

const LoadJobs = createAction('[Jobs] Load Jobs', props<{ types?: string[]; statuses?: string[] }>());
const LoadJobsSuccess = createAction('[Jobs/API] Load Jobs Success', props<{ jobs: JobDisplay[] }>());
const LoadJobsFailure = createAction('[Jobs/API] Load Jobs Failure', props<{ error: Error }>());

const DeleteJob = createAction('[Jobs/API] Delete Job', props<{ jobId: number }>());
const DeleteJobSuccess = createAction('[Job List Table/API] Delete Job Success');
const DeleteJobFailure = createAction('[Job List Table/API] Delete Job Failure', props<{ error: Error }>());

const updateJob = createAction('[Jobs/API] Put Job', props<{ job: Job }>());
const updateJobSuccess = createAction('[Job List Table/API] Put Job Success');
const updateJobFailure = createAction('[Job List Table/API] Put Job Failure', props<{ error: Error }>());

const GetJob = createAction('[Jobs/API] Get Job', props<{ jobId: number }>());
const GetJobSuccess = createAction('[Job List Table/API] Get Job Success', props<{ activeJob: Job }>());
const GetJobFailure = createAction('[Job List Table/API] Get Job Failure', props<{ error: Error }>());

const GetJobHistory = createAction('[Jobs/API] Job History', props<{ jobId: number }>());
const GetJobHistorySuccess = createAction(
    '[Job List Table/API] Job History Success',
    props<{ jobHistory: JobHistory[] }>()
);
const GetJobHistoryFailure = createAction('[Job List Table/API] Job History Failure', props<{ error: Error }>());

const FilterTypesChange = createAction('[Jobs/Filter] Change Types', props<{ types: string[] }>());
const FilterStatusesChange = createAction('[Jobs/Filter] Change Statuses', props<{ statuses: string[] }>());

const runNow = createAction('[Job Table/API] Load runNow', props<{ jobId: number }>());
const runNowSuccess = createAction('[Job Details/API] runNow Success', props<{ runNow: any }>());
const runNowFailure = createAction('[Job Details/API] runNow Failure', props<{ error: Error }>());

const Refresh = createAction('[Jobs List/API] Refresh');

export const JobCenterTableActions = {
    LoadJobs,
    LoadJobsSuccess,
    LoadJobsFailure,
    DeleteJob,
    DeleteJobSuccess,
    DeleteJobFailure,
    FilterTypesChange,
    FilterStatusesChange,
    updateJob,
    updateJobSuccess,
    updateJobFailure,
    GetJobHistory,
    GetJobHistorySuccess,
    GetJobHistoryFailure,
    GetJob,
    GetJobSuccess,
    GetJobFailure,
    runNow,
    runNowSuccess,
    runNowFailure,
    Refresh,
};
