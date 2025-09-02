import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { ReferralCenterIndividualActions } from '../actions/referral-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class ReferralCenterEmailEffects {
    addReferral$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReferralCenterIndividualActions.AddReferral),
            switchMap(action =>
                this.apiService.saveReferral(action.referral).pipe(
                    map(referral => ReferralCenterIndividualActions.AddReferralSuccess({ referral })),
                    catchError(error => of(ReferralCenterIndividualActions.AddReferralFailure({ error: error.error })))
                )
            )
        )
    );

    updateReferral$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReferralCenterIndividualActions.UpdateReferral),
            switchMap(action =>
                this.apiService.saveReferral(action.referral).pipe(
                    map(referral => {
                        ToastConfig.EDIT_SUCCESS();
                        return ReferralCenterIndividualActions.UpdateReferralSuccess({ referral });
                    }),
                    catchError(error => {
                        ToastConfig.EDIT_FAILURE();
                        return of(ReferralCenterIndividualActions.UpdateReferralFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store: Store
    ) {}
}
