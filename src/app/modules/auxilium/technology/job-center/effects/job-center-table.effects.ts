import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { JobIndividualActions } from '../actions/job-center-individual.actions';
import { JobCenterTableActions } from '../actions/job-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class JobCenterTableEffects {
    loadJobList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobCenterTableActions.LoadJobs),
            switchMap(action =>
                this.apiService.getJobs(action.types, action.statuses).pipe(
                    map(jobs => JobCenterTableActions.LoadJobsSuccess({ jobs: jobs })),
                    catchError(error => of(JobCenterTableActions.LoadJobsFailure({ error: error.error })))
                )
            )
        )
    );

    getJob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobCenterTableActions.GetJob),
            switchMap(action =>
                this.apiService.getJob(action.jobId).pipe(
                    map(activeJob => JobCenterTableActions.GetJobSuccess({ activeJob })),
                    catchError(error => of(JobCenterTableActions.GetJobFailure({ error: error.error })))
                )
            )
        )
    );

    deleteJob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobCenterTableActions.DeleteJob),
            switchMap(action =>
                this.apiService.deleteJob(action.jobId).pipe(
                    map(job => JobCenterTableActions.DeleteJobSuccess()),
                    catchError(error => of(JobCenterTableActions.DeleteJobFailure({ error: error.error })))
                )
            )
        )
    );

    jobHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobCenterTableActions.GetJobHistory),
            switchMap(action =>
                this.apiService.getJobHistory(action.jobId).pipe(
                    map(jobHistory => JobCenterTableActions.GetJobHistorySuccess({ jobHistory })),
                    catchError(error => of(JobCenterTableActions.GetJobHistoryFailure({ error: error.error })))
                )
            )
        )
    );

    updateJob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobCenterTableActions.updateJob),
            switchMap(action =>
                this.apiService.updateJob(action.job).pipe(
                    map(job => JobCenterTableActions.updateJobSuccess()),
                    catchError(error => of(JobCenterTableActions.updateJobFailure({ error: error.error })))
                )
            )
        )
    );

    runNow$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobCenterTableActions.runNow),
            switchMap(action =>
                this.apiService.runNow(action.jobId).pipe(
                    map(runNow => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your job is in the queue',
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        return JobCenterTableActions.runNowSuccess({ runNow });
                    }),
                    catchError(error => of(JobCenterTableActions.runNowFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                JobIndividualActions.CreateJobSuccess,
                JobCenterTableActions.updateJobSuccess,
                JobCenterTableActions.DeleteJobSuccess
            ),
            map(() => JobCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
