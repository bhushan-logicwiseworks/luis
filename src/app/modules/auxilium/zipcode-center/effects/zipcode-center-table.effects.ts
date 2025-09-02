import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ZipCodeCenterIndividualActions } from '../actions/zipcode-center-individual.actions';
import { ZipCodeCenterTableActions } from '../actions/zipcode-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class ZipCodeCenterTableEffects {
    loadZipCodeReps$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZipCodeCenterTableActions.LoadZipCodes),
            switchMap(action =>
                this.apiService.getzipcodes().pipe(
                    map(zipcodes => ZipCodeCenterTableActions.LoadZipCodesSuccess({ zipcodes })),
                    catchError(error => of(ZipCodeCenterTableActions.LoadZipCodesFailure({ error: error.error })))
                )
            )
        )
    );

    deleteZipCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ZipCodeCenterTableActions.DeleteZipCode),
            switchMap(action =>
                this.apiService.deletezipcode(action.dto).pipe(
                    map(zipcodes => ZipCodeCenterTableActions.DeleteZipCodeSuccess()),
                    catchError(error => of(ZipCodeCenterTableActions.DeleteZipCodeFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                ZipCodeCenterIndividualActions.AddZipCodeSuccess,
                ZipCodeCenterIndividualActions.UpdateZipCodeSuccess,
                ZipCodeCenterTableActions.DeleteZipCodeSuccess
            ),
            map(() => ZipCodeCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
