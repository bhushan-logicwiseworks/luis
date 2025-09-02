import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IcdCodesCenterIndividualActions } from '../actions/icdcode-center-individual.actions';
import { IcdCodeCenterTableActions } from '../actions/icdcode-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class ICDCodeCenterTableEffects {
    loadIcdCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IcdCodeCenterTableActions.LoadIcdCodes),
            switchMap(action =>
                this.apiService.geticdcode().pipe(
                    map(icdcodes => IcdCodeCenterTableActions.LoadIcdCodesSuccess({ icdcodes })),
                    catchError(error => of(IcdCodeCenterTableActions.LoadIcdCodesFailure({ error: error.error })))
                )
            )
        )
    );

    deleteIcdCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IcdCodeCenterTableActions.DeleteIcdCode),
            switchMap(action =>
                this.apiService.deleteicdcode(action.dto).pipe(
                    map(icdcode => IcdCodeCenterTableActions.DeleteIcdCodesuccess()),
                    catchError(error => of(IcdCodeCenterTableActions.DeleteIcdCodeFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                IcdCodesCenterIndividualActions.AddIcdCodeSuccess,
                IcdCodesCenterIndividualActions.UpdateIcdCodeSuccess,
                IcdCodeCenterTableActions.DeleteIcdCodesuccess
            ),
            map(() => IcdCodeCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
