import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { AccessCenterIndividualActions } from '../actions/access-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class AccessCenterIndividualEffects {
    getAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccessCenterIndividualActions.LoadAccess),
            switchMap(action =>
                this.apiService.getAccess(action.id).pipe(
                    map(access => AccessCenterIndividualActions.LoadAccessSuccess({ access })),
                    catchError(error => of(AccessCenterIndividualActions.LoadAccessFailure({ error: error.error })))
                )
            )
        )
    );

    addAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccessCenterIndividualActions.AddAccess),
            switchMap(action =>
                this.apiService.addAccess(action.access).pipe(
                    map(access => AccessCenterIndividualActions.AddAccessSuccess({ access })),
                    catchError(error => of(AccessCenterIndividualActions.AddAccessFailure({ error: error.error })))
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
