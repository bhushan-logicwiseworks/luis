import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { ApiService } from '../../../../core/services/api.service';
import { Payor1500DataActions } from '../actions/payor-1500-data.action';
import { PayorCenterTableActions } from '../actions/payor-center-table.actions';

@Injectable()
export class Payor1500DataEffects {
    loadPayor1500Data$ = createEffect(() =>
        this.actions$.pipe(
            ofType(Payor1500DataActions.AddPayor1500Data),
            switchMap(action =>
                this.apiService.addPayor1500Data(action.payor).pipe(
                    map(payor1500Data => {
                        ToastConfig.ADD_SUCCESS();
                        return Payor1500DataActions.AddPayor1500DataSuccess({ payor1500Data });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(Payor1500DataActions.AddPayor1500DataFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(Payor1500DataActions.AddPayor1500DataSuccess, PayorCenterTableActions.LoadPayorDetails),
            map(() => Payor1500DataActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
