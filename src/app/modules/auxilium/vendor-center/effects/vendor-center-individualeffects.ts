import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { VendorCenterIndividualActions } from '../actions/vendor-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class VendorCenterIndividualEffects {
    addVendor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VendorCenterIndividualActions.AddVendor),
            switchMap(action =>
                this.apiService.saveVendor(action.vendor).pipe(
                    map(vendor => VendorCenterIndividualActions.AddVendorSuccess({ vendor })),
                    catchError(error => of(VendorCenterIndividualActions.AddVendorFailure({ error: error.error })))
                )
            )
        )
    );

    updateVendor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VendorCenterIndividualActions.UpdateVendor),
            switchMap(action =>
                this.apiService.saveVendor(action.vendor).pipe(
                    map(vendor => VendorCenterIndividualActions.AddVendorSuccess({ vendor })),
                    catchError(error => of(VendorCenterIndividualActions.AddVendorFailure({ error: error.error })))
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VendorCenterIndividualActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup =>
                        VendorCenterIndividualActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })
                    ),
                    catchError(error =>
                        of(VendorCenterIndividualActions.LoadCityAndStateDropDownFailure({ error: error.error }))
                    )
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
