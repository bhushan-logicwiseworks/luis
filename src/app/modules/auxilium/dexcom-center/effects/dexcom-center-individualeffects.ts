import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { DexcomCenterIndividualActions } from '../actions/dexcom-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class DexcomCenterIndividualEffects {
    getAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DexcomCenterIndividualActions.LoadUser),
            switchMap(action =>
                this.apiService.getDexcomUser(action.id).pipe(
                    map(user => DexcomCenterIndividualActions.LoadUserSuccess({ user })),
                    catchError(error => of(DexcomCenterIndividualActions.LoadUserFailure({ error: error.error })))
                )
            )
        )
    );

    addAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DexcomCenterIndividualActions.AddUser),
            switchMap(action =>
                this.apiService.addDexcomUser(action.user).pipe(
                    map(user => DexcomCenterIndividualActions.AddUserSuccess({ user })),
                    catchError(error => of(DexcomCenterIndividualActions.AddUserFailure({ error: error.error })))
                )
            )
        )
    );

    updateAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DexcomCenterIndividualActions.UpdateUser),
            switchMap(action =>
                this.apiService.updateDexcomUser(action.user).pipe(
                    map(user => DexcomCenterIndividualActions.UpdateUserSuccess({ user })),
                    catchError(error => of(DexcomCenterIndividualActions.UpdateUserFailure({ error: error.error })))
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
