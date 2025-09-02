import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CommCenterCreateActions } from '../actions/comm-center-create.actions';

@Injectable({
    providedIn: 'root',
})
export class CommCenterCreateEffects {
    createEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterCreateActions.CreateEmail),
            switchMap(action =>
                this.apiService
                    .createEmail({
                        ...action.dto,
                    })
                    .pipe(
                        map(email => CommCenterCreateActions.CreateEmailSuccess({ email })),
                        catchError(error => of(CommCenterCreateActions.CreateEmailFailure({ error: error.error })))
                    )
            )
        )
    );

    loadOwners$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CommCenterCreateActions.LoadOwners),
            switchMap(action =>
                this.apiService.getOwners().pipe(
                    map(owners => CommCenterCreateActions.LoadOwnersSuccess({ owners })),
                    catchError(error => of(CommCenterCreateActions.LoadOwnersFailure({ error: error.error })))
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
