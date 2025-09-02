import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PayorCenterDeatilsActions } from '../actions/payor-details.action';

@Injectable({
    providedIn: 'root',
})
export class PayorCenterDetailsEffects {
    loadPriceCodeDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterDeatilsActions.LoadPriceCodeDropDown),
            switchMap(action =>
                this.apiService.getPriceCodeDorpDown().pipe(
                    map(priceCode => PayorCenterDeatilsActions.LoadPriceCodeDropDownSuccess({ priceCode })),
                    catchError(error =>
                        of(PayorCenterDeatilsActions.LoadPriceCodeDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPrimaryBillDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterDeatilsActions.LoadPrimaryBillFormDropDown),
            switchMap(action =>
                this.apiService.getPrimaryBillDorpDown().pipe(
                    map(primaryBillForm =>
                        PayorCenterDeatilsActions.LoadPrimaryBillFormDropDownSuccess({ primaryBillForm })
                    ),
                    catchError(error =>
                        of(PayorCenterDeatilsActions.LoadPrimaryBillFormDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPayorTypeDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterDeatilsActions.LoadPayorTypeDropDown),
            switchMap(action =>
                this.apiService.getPayorTypeDorpDown().pipe(
                    map(payorType => PayorCenterDeatilsActions.LoadPayorTypeDropDownSuccess({ payorType })),
                    catchError(error =>
                        of(PayorCenterDeatilsActions.LoadPayorTypeDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadBoxDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterDeatilsActions.LoadBoxOneDropDown),
            switchMap(action =>
                this.apiService.getBoxOneDorpDown().pipe(
                    map(boxOne => PayorCenterDeatilsActions.LoadBoxOneDropDownSuccess({ boxOne })),
                    catchError(error => of(PayorCenterDeatilsActions.LoadBoxOneDropDownFailure({ error: error.error })))
                )
            )
        )
    );

    loadPatientSalesRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterDeatilsActions.LoadPatientSalesRep),
            switchMap(action =>
                this.apiService.getPatientSalesRep().pipe(
                    map(salesrep => PayorCenterDeatilsActions.LoadPatientSalesRepSuccess({ salesrep })),
                    catchError(error =>
                        of(PayorCenterDeatilsActions.LoadPatientSalesRepFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadFinancialClassDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterDeatilsActions.LoadFinancialClassDown),
            switchMap(action =>
                this.apiService.getFinancialClassDorpDown().pipe(
                    map(financialclass => PayorCenterDeatilsActions.LoadFinancialClassDownSuccess({ financialclass })),
                    catchError(error =>
                        of(PayorCenterDeatilsActions.LoadFinancialClassDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadClaimIndicatorDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterDeatilsActions.LoadClaimIndicatorDropDown),
            switchMap(action =>
                this.apiService.getClaimIndicatorDorpDown().pipe(
                    map(claimindicator =>
                        PayorCenterDeatilsActions.LoadClaimIndicatorDropDownSuccess({ claimindicator })
                    ),
                    catchError(error =>
                        of(PayorCenterDeatilsActions.LoadClaimIndicatorDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadClearinghouseDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PayorCenterDeatilsActions.LoadClearinghouseDropDown),
            switchMap(action =>
                this.apiService.getClearinghouseDorpDown().pipe(
                    map(clearinghouse => PayorCenterDeatilsActions.LoadClearinghouseDropDownSuccess({ clearinghouse })),
                    catchError(error =>
                        of(PayorCenterDeatilsActions.LoadClearinghouseDropDownFailure({ error: error.error }))
                    )
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
