import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CodeCenterIndividualActions } from '../actions/code-center-individual.actions';
import { CodeCenterTableActions } from '../actions/code-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class CodeCenterTableEffects {
    loadCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CodeCenterTableActions.LoadCodes),
            switchMap(action =>
                this.apiService.getAllCodes().pipe(
                    map(codes => CodeCenterTableActions.LoadCodesSuccess({ codelist: codes })),
                    catchError(error => of(CodeCenterTableActions.LoadCodesFailure({ error: error.error })))
                )
            )
        )
    );

    deleteCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CodeCenterTableActions.DeleteCode),
            switchMap(action =>
                this.apiService.deleteCode(action.dto).pipe(
                    map(codereps => CodeCenterTableActions.DeleteCodeSuccess()),
                    catchError(error => of(CodeCenterTableActions.DeleteCodeFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CodeCenterIndividualActions.AddCodeSuccess, CodeCenterTableActions.DeleteCodeSuccess),
            map(() => CodeCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
