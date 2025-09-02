import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ReferralCenterIndividualActions } from '../actions/referral-center-individual.actions';
import { ReferralCenterTableActions } from '../actions/referral-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class ReferralCenterTableEffects {
    loadReferrals$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReferralCenterTableActions.LoadReferrals),
            switchMap(action =>
                this.apiService.getReferrals(action.filter).pipe(
                    map(referrals => ReferralCenterTableActions.LoadReferralsSuccess({ referrals })),
                    catchError(error => of(ReferralCenterTableActions.LoadReferralsFailure({ error: error.error })))
                )
            )
        )
    );

    loadSalesRepDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReferralCenterTableActions.LoadSalesRepDropDown),
            switchMap(action =>
                this.apiService.getSalesRepDropDown().pipe(
                    map(salesreps => ReferralCenterTableActions.LoadSalesRepDropDownSuccess({ salesreps })),
                    catchError(error =>
                        of(ReferralCenterTableActions.LoadSalesRepDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReferralCenterTableActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup => ReferralCenterTableActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })),
                    catchError(error =>
                        of(ReferralCenterTableActions.LoadCityAndStateDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    deleteReferral$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReferralCenterTableActions.DeleteReferral),
            switchMap(action =>
                this.apiService.deleteReferral(action.dto).pipe(
                    map(() => ReferralCenterTableActions.DeleteReferralSuccess()),
                    catchError(error => of(ReferralCenterTableActions.DeleteReferralFailure({ error: error.error })))
                )
            )
        )
    );

    loadReferralById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReferralCenterTableActions.LoadReferralById),
            switchMap(action =>
                this.apiService.getReferralDetail(action.id).pipe(
                    map(Referral => ReferralCenterTableActions.LoadReferralByIdSuccess({ Referral })),
                    catchError(error => of(ReferralCenterTableActions.LoadReferralByIdFailure({ error: error.error })))
                )
            )
        )
    );

    addReferral$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReferralCenterTableActions.AddReferralQuickSave),
            switchMap(action =>
                this.apiService.referralQuickSave(action.referral).pipe(
                    mergeMap(id => [
                        ReferralCenterTableActions.AddReferralQuickSaveSuccess({ id: Number(id) }),
                        ReferralCenterTableActions.RedirectToDemographics(),
                    ]),
                    catchError(error =>
                        of(ReferralCenterTableActions.AddReferralQuickSaveFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    redirectDemographics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReferralCenterTableActions.AddReferralQuickSaveSuccess),
            map(action =>
                ReferralCenterTableActions.Navigate({
                    commands: [`/centers/referral-center/${action.id.toString()}/demographics`],
                })
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                ReferralCenterIndividualActions.LoadReferral,
                ReferralCenterIndividualActions.UpdateReferralSuccess,
                ReferralCenterTableActions.DeleteReferralSuccess,
                ReferralCenterTableActions.LoadReferrals
            ),
            map(() => ReferralCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
