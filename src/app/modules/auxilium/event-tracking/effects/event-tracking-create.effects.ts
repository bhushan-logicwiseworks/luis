import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EventTrackingCreateActions } from '../actions/event-tracking-create.actions';

@Injectable({
    providedIn: 'root',
})
export class EventTrackingCreateEffects {
    createEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingCreateActions.CreateEmail),
            switchMap(action =>
                this.apiService
                    .createEmail({
                        ...action.dto,
                    })
                    .pipe(
                        map(email => EventTrackingCreateActions.CreateEmailSuccess({ email })),
                        catchError(error => of(EventTrackingCreateActions.CreateEmailFailure({ error: error.error })))
                    )
            )
        )
    );

    loadOwners$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EventTrackingCreateActions.LoadOwners),
            switchMap(action =>
                this.apiService.getOwners().pipe(
                    map(owners => EventTrackingCreateActions.LoadOwnersSuccess({ owners })),
                    catchError(error => of(EventTrackingCreateActions.LoadOwnersFailure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
