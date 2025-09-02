import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DexcomCenterIndividualActions } from '../actions/dexcom-center-individual.actions';
import { DexcomCenterTableActions } from '../actions/dexcom-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class DexcomCenterTableEffects {
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DexcomCenterTableActions.LoadUsers),
            switchMap(action =>
                this.apiService.getDexcomUsers(action.filter).pipe(
                    map(users => DexcomCenterTableActions.LoadUsersSuccess({ users })),
                    catchError(error => of(DexcomCenterTableActions.LoadUsersFailure({ error: error.error })))
                )
            )
        )
    );

    deleteAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DexcomCenterIndividualActions.DeleteUser),
            switchMap(action =>
                this.apiService.deleteDexcomUser(action.dto).pipe(
                    map(access => DexcomCenterIndividualActions.DeleteUserSuccess()),
                    catchError(error => of(DexcomCenterIndividualActions.DeleteUserFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                DexcomCenterIndividualActions.AddUserSuccess,
                DexcomCenterIndividualActions.UpdateUserSuccess,
                DexcomCenterIndividualActions.DeleteUserSuccess
            ),
            map(() => DexcomCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
