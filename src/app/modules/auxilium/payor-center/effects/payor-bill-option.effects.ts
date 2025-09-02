import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ApiService } from 'app/core/services/api.service';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PayorBillOptionActions } from '../actions/payor-bill-option.action';
import { PayorCenterTableActions } from '../actions/payor-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class PayorBillOptionEffects {
    loadPayorBillOption$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorBillOptionActions.AddPayorBillOption),
            switchMap(action =>
                this.apiService.addPayorBillOption(action.payor).pipe(
                    map(payorBillOption => {
                        ToastConfig.ADD_SUCCESS();
                        return PayorBillOptionActions.AddPayorBillOptionSuccess({ payorBillOption });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(PayorBillOptionActions.AddPayorBillOptionFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorBillOptionActions.AddPayorBillOptionSuccess, PayorCenterTableActions.LoadPayorDetails),
            map(() => PayorBillOptionActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
