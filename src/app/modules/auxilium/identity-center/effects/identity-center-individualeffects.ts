import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { IdentityCenterIndividualActions } from '../actions/identity-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class IdentityCenterIndividualEffects {
    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IdentityCenterIndividualActions.AddUser),
            switchMap(action =>
                this.apiService.saveUser(action.user).pipe(
                    map(user => IdentityCenterIndividualActions.AddUserSuccess({ user })),
                    catchError(error => of(IdentityCenterIndividualActions.AddUserFailure({ error: error.error })))
                )
            )
        )
    );

    /* updateUser$ = createEffect(() => this.actions$.pipe(
      ofType(IdentityCenterIndividualActions.UpdateUser),
      switchMap(action =>
        this.apiService.saveUser(action.user).pipe(
          map(user => IdentityCenterIndividualActions.AddUserSuccess({user})),
          catchError(error => of(IdentityCenterIndividualActions.AddUserFailure({error: error.error})))
        )
      )
    )); */

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store: Store
    ) {}
}
