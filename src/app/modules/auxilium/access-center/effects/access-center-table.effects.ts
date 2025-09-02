import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AccessCenterIndividualActions } from '../actions/access-center-individual.actions';
import { AccessCenterTableActions } from '../actions/access-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class AccessCenterTableEffects {
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccessCenterTableActions.LoadAccessList),
            switchMap(action =>
                this.apiService.getAccessList(action.filter).pipe(
                    map(accesslist => AccessCenterTableActions.LoadAccessListSuccess({ accesslist })),
                    catchError(error => of(AccessCenterTableActions.LoadAccessListFailure({ error: error.error })))
                )
            )
        )
    );

    deleteAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccessCenterTableActions.DeleteAccess),
            switchMap(action =>
                this.apiService.deleteAccess(action.dto).pipe(
                    map(access => AccessCenterTableActions.DeleteAccessSuccess()),
                    catchError(error => of(AccessCenterTableActions.DeleteAccessFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AccessCenterIndividualActions.AddAccessSuccess, AccessCenterTableActions.DeleteAccessSuccess),
            map(() => AccessCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
