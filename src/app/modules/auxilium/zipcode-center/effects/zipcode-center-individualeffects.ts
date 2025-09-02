import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { ToastConfig } from '../../../../core/config/toast-config';
import { ZipCodeCenterIndividualActions } from '../actions/zipcode-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class ZipCodeCenterIndividualEffects {
    addZipCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZipCodeCenterIndividualActions.AddZipCode),
            switchMap(action =>
                this.apiService.savezipcode(action.zipcode).pipe(
                    map(zipcode => {
                        ToastConfig.ADD_SUCCESS();
                        return ZipCodeCenterIndividualActions.AddZipCodeSuccess({ zipcode });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(ZipCodeCenterIndividualActions.AddZipCodeFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    updateZipCodeRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZipCodeCenterIndividualActions.UpdateZipCode),
            switchMap(action =>
                this.apiService.savezipcode(action.zipcode).pipe(
                    map(zipcode => {
                        ToastConfig.ADD_SUCCESS();
                        return ZipCodeCenterIndividualActions.AddZipCodeSuccess({ zipcode });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(ZipCodeCenterIndividualActions.AddZipCodeFailure({ error: error.error }));
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
