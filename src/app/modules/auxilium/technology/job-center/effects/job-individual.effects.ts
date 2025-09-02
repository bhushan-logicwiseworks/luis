import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { JobIndividualActions } from '../actions/job-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class JobIndividualEffects {
    createJob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobIndividualActions.CreateJob),
            switchMap(action =>
                this.apiService.postJob(action.job).pipe(
                    map(job => JobIndividualActions.CreateJobSuccess({ job })),
                    catchError(error => of(JobIndividualActions.CreateJobFailure({ error: error.error })))
                )
            )
        )
    );

    jobHistoryDetailsById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobIndividualActions.LoadJobHistoryDetailsById),
            switchMap(action =>
                this.apiService.getJobHistoryDetailsById(action.historyId).pipe(
                    map(JobHistoryData => JobIndividualActions.LoadJobHistoryDetailsByIdSuccess({ JobHistoryData })),
                    catchError(error =>
                        of(JobIndividualActions.LoadJobHistoryDetailsByIdFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store: Store
    ) {}
}
