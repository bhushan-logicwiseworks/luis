import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IdentityCenterIndividualActions } from '../actions/identity-center-individual.actions';
import { IdentityCenterTableActions } from '../actions/identity-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class IdentityCenterTableEffects {
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IdentityCenterTableActions.LoadUsers),
            switchMap(action =>
                this.apiService.getUsers().pipe(
                    map(users => IdentityCenterTableActions.LoadUsersSuccess({ users })),
                    catchError(error => of(IdentityCenterTableActions.LoadUsersFailure({ error: error.error })))
                )
            )
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IdentityCenterTableActions.DeleteUser),
            switchMap(action =>
                this.apiService.deleteUser(action.dto).pipe(
                    map(salesrep => IdentityCenterTableActions.DeleteUserSuccess()),
                    catchError(error => of(IdentityCenterTableActions.DeleteUserFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                IdentityCenterIndividualActions.AddUserSuccess,
                IdentityCenterIndividualActions.UpdateUserSuccess,
                IdentityCenterTableActions.DeleteUserSuccess
            ),
            map(() => IdentityCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
