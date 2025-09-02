import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { Payor837DataActions } from '../actions/payor-837-data.action';
import { PayorCenterTableActions } from '../actions/payor-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class Payor837DataEffects {
    loadPayor837Data$ = createEffect(() =>
        this.actions$.pipe(
            ofType(Payor837DataActions.AddPayor837Data),
            switchMap(action =>
                this.apiService.addPayor837Data(action.payor).pipe(
                    map(payor837Data => {
                        ToastConfig.ADD_SUCCESS();
                        return Payor837DataActions.AddPayor837DataSuccess({ payor837Data });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(Payor837DataActions.AddPayor837DataFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(Payor837DataActions.AddPayor837DataSuccess, PayorCenterTableActions.LoadPayorDetails),
            map(() => Payor837DataActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
