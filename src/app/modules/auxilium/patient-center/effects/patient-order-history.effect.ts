import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PatientOrderActions } from '../actions/patient-order-history.action';

@Injectable({
    providedIn: 'root',
})
export class PatientOrderEffects {
    // Load Work Order
    loadOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientOrderActions.loadOrder),
            switchMap(action =>
                this.apiService.getPatientOrderHistory(action.patientId).pipe(
                    map(orders => PatientOrderActions.loadOrdersSuccess({ orders })),
                    catchError(error => of(PatientOrderActions.loadOrdersFailure({ error: error.error })))
                )
            )
        )
    );
    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
