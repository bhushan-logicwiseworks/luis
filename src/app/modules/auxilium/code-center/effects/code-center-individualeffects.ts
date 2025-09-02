import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { ToastConfig } from '../../../../core/config/toast-config';
import { CodeCenterIndividualActions } from '../actions/code-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class CodeCenterIndividualEffects {
    addCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CodeCenterIndividualActions.AddCode),
            switchMap(action =>
                this.apiService.saveCode(action.code).pipe(
                    map(code => {
                        ToastConfig.ADD_SUCCESS();
                        return CodeCenterIndividualActions.AddCodeSuccess({ code });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(CodeCenterIndividualActions.AddCodeFailure({ error: error.error }));
                    })
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
