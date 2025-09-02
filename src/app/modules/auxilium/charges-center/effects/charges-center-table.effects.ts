import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ChargesCenterTableActions } from '../actions/charges-center-table.action';

@Injectable({
    providedIn: 'root',
})
export class ChargesCenterTableEffects {
    loadchargeReps$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChargesCenterTableActions.LoadCharges),
            switchMap(action =>
                this.apiService.getChargesData().pipe(
                    map(charges => ChargesCenterTableActions.LoadChargesSuccess({ charges })),
                    catchError(error => of(ChargesCenterTableActions.LoadChargesFailure({ error: error.error })))
                )
            )
        )
    );

    // post confirmed Work Order
    postConirmedWorkEdit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChargesCenterTableActions.PostConfirmedWorkOrder),
            switchMap(action =>
                this.apiService.postconfirmedworkorder(action.patientData).pipe(
                    map(data => ChargesCenterTableActions.PostConfirmedWorkOrderSuccess()),
                    catchError(error =>
                        of(ChargesCenterTableActions.PostConfirmedWorkOrderFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChargesCenterTableActions.PostConfirmedWorkOrderSuccess),
            map(() => ChargesCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
