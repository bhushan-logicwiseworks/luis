import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { AbbottCenterIndividualActions } from '../actions/abbott-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class AbbottCenterIndividualEffects {
    getAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AbbottCenterIndividualActions.LoadUser),
            switchMap(action =>
                this.apiService.getAbbottUser(action.id).pipe(
                    map(user => AbbottCenterIndividualActions.LoadUserSuccess({ user })),
                    catchError(error => of(AbbottCenterIndividualActions.LoadUserFailure({ error: error.error })))
                )
            )
        )
    );

    addAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AbbottCenterIndividualActions.AddUser),
            switchMap(action =>
                this.apiService.addAbbottUser(action.user).pipe(
                    map(user => AbbottCenterIndividualActions.AddUserSuccess({ user })),
                    catchError(error => of(AbbottCenterIndividualActions.AddUserFailure({ error: error.error })))
                )
            )
        )
    );

    updateAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AbbottCenterIndividualActions.UpdateUser),
            switchMap(action =>
                this.apiService.updateAbbottUser(action.user).pipe(
                    map(user => AbbottCenterIndividualActions.UpdateUserSuccess({ user })),
                    catchError(error => of(AbbottCenterIndividualActions.UpdateUserFailure({ error: error.error })))
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
