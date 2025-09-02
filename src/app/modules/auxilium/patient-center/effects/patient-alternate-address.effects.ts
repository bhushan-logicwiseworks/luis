import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PatientAlternateAddressActions } from '../actions/patient-alternate-address.action';

@Injectable({
    providedIn: 'root',
})
export class PatientAlternateAddressEffects {
    // Other Address
    loadPatientOtherAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientAlternateAddressActions.LoadAlternateAddress),
            switchMap(action =>
                this.apiService.getPatientOtherAddress(action.patientId).pipe(
                    map(address => PatientAlternateAddressActions.LoadAlternateAddressSuccess({ address })),
                    catchError(error =>
                        of(PatientAlternateAddressActions.LoadAlternateAddressFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    patientOtherAddressSave$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientAlternateAddressActions.AddAlternateAddress),
            switchMap(action =>
                this.apiService.patientOtherAddressSave(action.address).pipe(
                    map(address => PatientAlternateAddressActions.AddAlternateAddressSuccess({ address })),
                    catchError(error =>
                        of(PatientAlternateAddressActions.AddAlternateAddressFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    deleteOtherAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientAlternateAddressActions.DeleteAlternateAddress),
            switchMap(action =>
                this.apiService.deleteAlternateAddress(action.address).pipe(
                    map(access => PatientAlternateAddressActions.DeleteAlternateAddressSuccess()),
                    catchError(error =>
                        of(PatientAlternateAddressActions.DeleteAlternateAddressFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientAlternateAddressActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup =>
                        PatientAlternateAddressActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })
                    ),
                    catchError(error =>
                        of(PatientAlternateAddressActions.LoadCityAndStateDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PatientAlternateAddressActions.AddAlternateAddressSuccess,
                PatientAlternateAddressActions.DeleteAlternateAddressSuccess
            ),
            map(() => PatientAlternateAddressActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
