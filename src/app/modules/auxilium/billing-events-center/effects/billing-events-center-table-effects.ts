import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BillingEventsCenterTableActions } from '../actions/billing-events-center-table.action';

@Injectable({
    providedIn: 'root',
})
export class BillingEventsCenterTableEffects {
    loadBillingEvents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillingEventsCenterTableActions.LoadBillingEvents),
            switchMap(action =>
                this.apiService.getBillingEvents(action.filter).pipe(
                    map(BillingEvents => BillingEventsCenterTableActions.LoadBillingEventsSuccess({ BillingEvents })),
                    catchError(error =>
                        of(BillingEventsCenterTableActions.LoadBillingEventsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadAllEvents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillingEventsCenterTableActions.LoadAllBillingEvents),
            switchMap(() =>
                this.apiService.getAllEvents().pipe(
                    map(BillingEvents =>
                        BillingEventsCenterTableActions.LoadAllBillingEventsSuccess({ BillingEvents })
                    ),
                    catchError(error =>
                        of(BillingEventsCenterTableActions.LoadAllBillingEventsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
