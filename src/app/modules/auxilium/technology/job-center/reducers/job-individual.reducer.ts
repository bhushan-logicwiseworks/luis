import { createReducer, on } from '@ngrx/store';
import { JobHistoryDetailsDisplay } from 'app/shared/interfaces/auxilium/job-center/job-history-details.interface';
import { Job } from 'app/shared/interfaces/auxilium/job-center/job.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { JobIndividualActions } from '../actions/job-center-individual.actions';

export const featureKey = 'job-individual';

export interface State extends LoadingState {
    job: Job;
    JobHistoryData: JobHistoryDetailsDisplay[];
}

const initialState: State = {
    loading: false,
    error: null,
    job: null,
    JobHistoryData: null,
};

export const reducer = createReducer(
    initialState,
    on(JobIndividualActions.CreateJob, state => ({ ...state, loading: true, error: null, email: null })),
    on(JobIndividualActions.CreateJobSuccess, (state, { job }) => ({ ...state, loading: false, job })),
    on(JobIndividualActions.CreateJobFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(JobIndividualActions.LoadJobHistoryDetailsById, state => ({
        ...state,
        loading: true,
        error: null,
        email: null,
    })),
    on(JobIndividualActions.LoadJobHistoryDetailsByIdSuccess, (state, { JobHistoryData }) => ({
        ...state,
        loading: false,
        JobHistoryData,
    })),
    on(JobIndividualActions.LoadJobHistoryDetailsByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectJobHistoryDetailsById = (state: State) => state.JobHistoryData;
