import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientPaymentAdjustmentsActions } from '../actions/patient-payments-adjustments.action';

@Injectable({
    providedIn: 'root',
})
export class PatientPaymentsAdjustmentsEffects {
    loadPatientPaymentsAdjustments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientPaymentAdjustmentsActions.LoadPaymentAdjustments),
            switchMap(action =>
                this.apiService.getPatientPaymentsAdjustments(action.patientId).pipe(
                    map(data => PatientPaymentAdjustmentsActions.LoadPaymentAdjustmentsSuccess({ data })),
                    catchError(error =>
                        of(PatientPaymentAdjustmentsActions.LoadPaymentAdjustmentsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    addPaymentAdjustment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientPaymentAdjustmentsActions.AddPaymentAdjustment),
            switchMap(action =>
                this.apiService.savePaymentAdjustment(action.paymentAdjustment).pipe(
                    map(paymentAdjustment => {
                        ToastConfig.ADD_SUCCESS();
                        return PatientPaymentAdjustmentsActions.AddPaymentAdjustmentSuccess({ paymentAdjustment });
                    }),
                    catchError(error =>
                        of(PatientPaymentAdjustmentsActions.AddPaymentAdjustmentFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    redirectPatientPaymentsAdjustments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientPaymentAdjustmentsActions.AddPaymentAdjustmentSuccess),
            map(action =>
                PatientPaymentAdjustmentsActions.Navigate({
                    commands: [window.history.back()],
                })
            )
        )
    );

    loadPatientPaymentsAdjustmentsById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientPaymentAdjustmentsActions.LoadPaymentAdjustmentsId),
            switchMap(action =>
                this.apiService.getPatientPaymentsAdjustmentsById(action.PaymentAdjustmentId).pipe(
                    map(PaymentAdjustmentdata =>
                        PatientPaymentAdjustmentsActions.LoadPaymentAdjustmentsIdSuccess({ PaymentAdjustmentdata })
                    ),
                    catchError(error =>
                        of(PatientPaymentAdjustmentsActions.LoadPaymentAdjustmentsIdFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPaymentTypeDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientPaymentAdjustmentsActions.PaymentTypeDropdown),
            switchMap(action =>
                this.apiService.getPaymentTypeDropdown().pipe(
                    map(paymentType => PatientPaymentAdjustmentsActions.PaymentTypeDropdownSuccess({ paymentType })),
                    catchError(error =>
                        of(PatientPaymentAdjustmentsActions.PaymentTypeDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadInsuranceRank2$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientPaymentAdjustmentsActions.LoadInsuranceRank2),
            mergeMap(({ patientId }) =>
                this.apiService.getPatientInsuranceRank2(patientId).pipe(
                    map(insuranceRank2 => {
                        console.log('API Response:', insuranceRank2); // Debug log
                        return PatientPaymentAdjustmentsActions.LoadInsuranceRank2Success({ insuranceRank2 });
                    }),
                    catchError(error => {
                        console.error('API Error:', error); // Debug log
                        return of(PatientPaymentAdjustmentsActions.LoadInsuranceRank2Failure({ error }));
                    })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
