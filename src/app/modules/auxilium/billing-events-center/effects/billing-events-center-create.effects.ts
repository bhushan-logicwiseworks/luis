import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { BillingEventsCenterCreateActions } from '../actions/billing-events-center-create.actions';

@Injectable({
    providedIn: 'root',
})
export class BillingEventsCenterCreateEffects {
    saveBillingEvent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillingEventsCenterCreateActions.SaveBillingEvent),
            switchMap(action =>
                this.apiService.saveBillingEvent(action.data, action.filter).pipe(
                    map(response => {
                        ToastConfig.ADD_SUCCESS();
                        return BillingEventsCenterCreateActions.SaveBillingEventSuccess({ response });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(BillingEventsCenterCreateActions.SaveBillingEventFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    loadOwners$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillingEventsCenterCreateActions.LoadOwners),
            switchMap(action =>
                this.apiService.getOwners().pipe(
                    map(owners => BillingEventsCenterCreateActions.LoadOwnersSuccess({ owners })),
                    catchError(error => of(BillingEventsCenterCreateActions.LoadOwnersFailure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
