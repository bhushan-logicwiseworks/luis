import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RetentionRateTableActions } from '../actions/retention-rate-table.actions';

@Injectable({
    providedIn: 'root',
})
export class RetentionRateTableEffects {
    loadRetentionRate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RetentionRateTableActions.LoadRetentions),
            switchMap(action =>
                this.apiService.getAllRetentionRate().pipe(
                    map(retentions => RetentionRateTableActions.LoadRetentionsSuccess({ retentions })),
                    catchError(error => of(RetentionRateTableActions.LoadRetentionsFailure({ error: error.error })))
                )
            )
        )
    );

    addRetentionRate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RetentionRateTableActions.AddRetention),
            switchMap(action =>
                this.apiService.addRetentionRate(action.retention).pipe(
                    map(retention => RetentionRateTableActions.AddRetentionSuccess()),
                    catchError(error => of(RetentionRateTableActions.AddRetentionsFailure({ error: error.error })))
                )
            )
        )
    );

    deleteRetentionRate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RetentionRateTableActions.DeleteRetentions),
            switchMap(action =>
                this.apiService.deleteRetentionRate(action.retentionRate).pipe(
                    map(action => RetentionRateTableActions.DeleteRetentionsSuccess()),
                    catchError(error => of(RetentionRateTableActions.LoadRetentionsFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RetentionRateTableActions.AddRetentionSuccess, RetentionRateTableActions.DeleteRetentionsSuccess),
            map(() => RetentionRateTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
