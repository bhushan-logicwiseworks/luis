import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { ToastConfig } from '../../../../core/config/toast-config';
import { IcdCodesCenterIndividualActions } from '../actions/icdcode-center-individual.actions';
import { IcdCodeCenterTableActions } from '../actions/icdcode-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class ICDCodeCenterIndividualEffects {
    addIcdCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IcdCodesCenterIndividualActions.AddIcdCode),
            switchMap(action =>
                this.apiService.saveicdcode(action.icdcode).pipe(
                    map(icdcode => {
                        ToastConfig.ADD_SUCCESS();
                        return IcdCodesCenterIndividualActions.AddIcdCodeSuccess({ icdcode });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(IcdCodesCenterIndividualActions.AddIcdCodeFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    updateIcdCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IcdCodesCenterIndividualActions.UpdateIcdCode),
            switchMap(action =>
                this.apiService.saveicdcode(action.icdcode).pipe(
                    map(icdcode => {
                        ToastConfig.EDIT_SUCCESS();
                        return IcdCodesCenterIndividualActions.UpdateIcdCodeSuccess({ icdcode });
                    }),
                    catchError(error => {
                        ToastConfig.EDIT_FAILURE();
                        return of(IcdCodesCenterIndividualActions.UpdateIcdCodeFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    loadIcdCodeById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IcdCodesCenterIndividualActions.LoadIcdCodeById),
            switchMap(action =>
                this.apiService.getIcdCodeById(action.id).pipe(
                    map(icdcode => IcdCodesCenterIndividualActions.LoadIcdCodeByIdSuccess({ icdcode })),
                    catchError(error =>
                        of(IcdCodesCenterIndividualActions.LoadIcdCodeByIdFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                IcdCodesCenterIndividualActions.AddIcdCodeSuccess,
                IcdCodesCenterIndividualActions.UpdateIcdCodeSuccess
            ),
            map(() => IcdCodeCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store: Store
    ) {}
}
