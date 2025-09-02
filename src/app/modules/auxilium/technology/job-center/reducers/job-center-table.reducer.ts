import { createReducer, on } from '@ngrx/store';
import { JobDisplay } from 'app/shared/interfaces/auxilium/job-center/job-display.interface';
import { JobHistory } from 'app/shared/interfaces/auxilium/job-center/job-history.interface';
import { Job } from 'app/shared/interfaces/auxilium/job-center/job.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { JobCenterTableActions } from '../actions/job-center-table.actions';
export const featureKey = 'job-center-table';

export interface State extends LoadingState {
    jobs: JobDisplay[];
    activeJob: Job;
    jobHistory: JobHistory[];
    filterStatuses: string[];
    filterTypes: string[];
}

interface IdEntity {
    id: number;
}

const initialState: State = {
    loading: false,
    error: null,
    jobs: [],
    activeJob: null,
    jobHistory: null,
    filterStatuses: [],
    filterTypes: [],
};

export const reducer = createReducer(
    initialState,
    on(JobCenterTableActions.LoadJobs, state => ({ ...state, loading: true })),
    on(JobCenterTableActions.LoadJobsSuccess, (state, { jobs }) => ({ ...state, loading: false, jobs })),
    on(JobCenterTableActions.LoadJobsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(JobCenterTableActions.FilterStatusesChange, (state, { statuses }) => ({ ...state, filterStatuses: statuses })),
    on(JobCenterTableActions.FilterTypesChange, (state, { types }) => ({ ...state, filterTypes: types })),

    on(JobCenterTableActions.DeleteJob, state => ({ ...state, loading: true })),
    on(JobCenterTableActions.DeleteJobSuccess, state => ({ ...state, loading: false })),
    on(JobCenterTableActions.DeleteJobFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(JobCenterTableActions.updateJob, state => ({ ...state, loading: true })),
    on(JobCenterTableActions.updateJobSuccess, state => ({ ...state, loading: false })),
    on(JobCenterTableActions.updateJobFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(JobCenterTableActions.GetJob, state => ({ ...state, loading: true })),
    on(JobCenterTableActions.GetJobSuccess, (state, { activeJob }) => ({ ...state, loading: false, activeJob })),
    on(JobCenterTableActions.GetJobFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(JobCenterTableActions.GetJobHistory, state => ({ ...state, loading: true })),
    on(JobCenterTableActions.GetJobHistorySuccess, (state, { jobHistory }) => ({
        ...state,
        loading: false,
        jobHistory,
    })),
    on(JobCenterTableActions.GetJobHistoryFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectJobs = (state: State) => state.jobs;
export const selectActiveJob = (state: State) => state.activeJob;
export const selectFilterStatuses = (state: State) => state.filterStatuses;
export const selectFilterTypes = (state: State) => state.filterTypes;
export const selectJobHistory = (state: State) => state.jobHistory;
