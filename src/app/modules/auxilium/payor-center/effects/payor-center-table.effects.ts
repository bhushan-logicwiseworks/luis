import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastMessages } from 'app/common/constants/constVariables';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ToastConfig } from '../../../../core/config/toast-config';
import { Payor1500DataActions } from '../actions/payor-1500-data.action';
import { Payor837DataActions } from '../actions/payor-837-data.action';
import { PayorBillOptionActions } from '../actions/payor-bill-option.action';
import { PayorCenterTableActions } from '../actions/payor-center-table.actions';
import { PayorDemographicsActions } from '../actions/payor-demographics.action';

@Injectable({
    providedIn: 'root',
})
export class PayorCenterTableEffects {
    loadPayor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterTableActions.LoadPayor),
            switchMap(action =>
                this.apiService.getPayors().pipe(
                    map(payor => PayorCenterTableActions.LoadPayorSuccess({ payor })),
                    catchError(error => of(PayorCenterTableActions.LoadPayorFailure({ error: error.error })))
                )
            )
        )
    );

    addPayor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterTableActions.AddPayorQuickSave),
            switchMap(action =>
                this.apiService.payorQuickSave(action.payor).pipe(
                    mergeMap(id => [
                        PayorCenterTableActions.AddPayorQuickSaveSuccess({ id }),
                        PayorCenterTableActions.RedirectPayorCenter(),
                    ]),
                    catchError(error => of(PayorCenterTableActions.AddPayorQuickSaveFailure({ error: error.error })))
                )
            )
        )
    );

    savePayorOverride$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterTableActions.SavePayorOverride),
            switchMap(action =>
                this.apiService.payorOverrideSave(action.payorOverride).pipe(
                    map(payorOverride => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: ToastMessages.CREATE.SUCCESS,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        return PayorCenterTableActions.SavePayorOverrideSuccess({ payorOverride });
                    }),
                    catchError(error => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: ToastMessages.CREATE.ERROR,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        return of(PayorCenterTableActions.SavePayorOverrideFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    loadPayorDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterTableActions.LoadPayorDetails),
            switchMap(action =>
                this.apiService.getPayorDetails(action.id).pipe(
                    mergeMap(payorDetails => [PayorCenterTableActions.LoadPayorDetailsSuccess({ payorDetails })]),
                    catchError(error => of(PayorCenterTableActions.LoadPayorDetailsFailure({ error: error.error })))
                )
            )
        )
    );

    loadPayorOverrides$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterTableActions.LoadPayorOverrides),
            switchMap(action =>
                this.apiService.getPayorOverrides(action.filter).pipe(
                    map(payorOverrides => PayorCenterTableActions.LoadPayorOverridesSuccess({ payorOverrides })),
                    catchError(error => of(PayorCenterTableActions.LoadPayorOverridesFailure({ error: error.error })))
                )
            )
        )
    );

    redirectPatientCenter$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterTableActions.AddPayorQuickSaveSuccess),
            map(action =>
                PayorCenterTableActions.Navigate({
                    commands: [`/centers/payor-center/${action.id}/demographics`],
                })
            )
        )
    );

    loadPayorById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterTableActions.LoadPayorById),
            switchMap(action =>
                this.apiService.getPayorDetails(action.id).pipe(
                    map(payorDetailsById => PayorCenterTableActions.LoadPayorByIdSuccess({ payorDetailsById })),
                    catchError(error => of(PayorCenterTableActions.LoadPayorByIdFailure({ error: error.error })))
                )
            )
        )
    );

    deletepayorOverride$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterTableActions.DeletePayorOverride),
            switchMap(action =>
                this.apiService.deletePayorOverride(action.payorOverride).pipe(
                    map(() => {
                        ToastConfig.ADD_SUCCESS();
                        return PayorCenterTableActions.DeletePayorOverrideSuccess();
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(PayorCenterTableActions.DeletePayorOverrideFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PayorCenterTableActions.AddPayorQuickSaveSuccess,
                PayorCenterTableActions.AddPayorQuickSaveFailure,
                PayorCenterTableActions.SavePayorOverrideSuccess,
                PayorCenterTableActions.SavePayorOverrideFailure,
                PayorCenterTableActions.DeletePayorOverrideSuccess,
                PayorDemographicsActions.AddPayorDemographicsSuccess,
                PayorBillOptionActions.AddPayorBillOptionSuccess,
                Payor837DataActions.AddPayor837DataSuccess,
                Payor1500DataActions.AddPayor1500DataSuccess
            ),
            map(() => {
                const payorId = this.route.snapshot.paramMap.get('id');
                if (payorId) {
                    return PayorCenterTableActions.LoadPayorById({ id: Number(payorId) });
                }
                return PayorCenterTableActions.Refresh();
            })
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService,
        private route: ActivatedRoute
    ) {}
}
