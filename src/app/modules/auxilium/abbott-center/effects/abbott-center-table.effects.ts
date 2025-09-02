import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AbbottCenterIndividualActions } from '../actions/abbott-center-individual.actions';
import { AbbottCenterTableActions } from '../actions/abbott-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class AbbottCenterTableEffects {
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AbbottCenterTableActions.LoadUsers),
            switchMap(action =>
                this.apiService.getAbbottUsers().pipe(
                    map(users => AbbottCenterTableActions.LoadUsersSuccess({ users })),
                    catchError(error => of(AbbottCenterTableActions.LoadUsersFailure({ error: error.error })))
                )
            )
        )
    );

    deleteAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AbbottCenterIndividualActions.DeleteUser),
            switchMap(action =>
                this.apiService.deleteAbbottUser(action.dto).pipe(
                    map(access => AbbottCenterIndividualActions.DeleteUserSuccess()),
                    catchError(error => of(AbbottCenterIndividualActions.DeleteUserFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                AbbottCenterIndividualActions.AddUserSuccess,
                AbbottCenterIndividualActions.UpdateUserSuccess,
                AbbottCenterIndividualActions.DeleteUserSuccess
            ),
            map(() => AbbottCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
