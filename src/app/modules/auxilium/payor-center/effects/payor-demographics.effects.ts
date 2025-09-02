import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ApiService } from 'app/core/services/api.service';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PayorCenterTableActions } from '../actions/payor-center-table.actions';
import { PayorDemographicsActions } from '../actions/payor-demographics.action';

@Injectable({
    providedIn: 'root',
})
export class PayorBillInfoEffects {
    loadPayorBillInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorDemographicsActions.AddPayorDemographics),
            switchMap(action =>
                this.apiService.addPayorBillInfo(action.payor).pipe(
                    map(payorDemographics => {
                        ToastConfig.ADD_SUCCESS();
                        return PayorDemographicsActions.AddPayorDemographicsSuccess({ payorDemographics });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(PayorDemographicsActions.AddPayorDemographicsFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorDemographicsActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup => PayorDemographicsActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })),
                    catchError(error =>
                        of(PayorDemographicsActions.LoadCityAndStateDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorDemographicsActions.LoadBranchDropDown),
            switchMap(action =>
                this.apiService.getBranchList().pipe(
                    map(branch => PayorDemographicsActions.LoadBranchDropDownSuccess({ branch })),
                    catchError(error => of(PayorDemographicsActions.LoadBranchDropDownFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PayorDemographicsActions.AddPayorDemographicsSuccess,
                PayorCenterTableActions.LoadPayorDetails,
                PayorDemographicsActions.LoadCityAndStateDropDownSuccess
            ),
            map(() => PayorDemographicsActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
