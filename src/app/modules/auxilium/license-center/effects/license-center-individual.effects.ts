import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { LicenseCenterIndividualActions } from '../actions/license-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class LicenseCenterIndividualEffects {
    updateLicense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseCenterIndividualActions.UpdateLicense),
            switchMap(action =>
                this.apiService.saveLicense(action.licenses).pipe(
                    map(licenses => {
                        ToastConfig.EDIT_SUCCESS();
                        return LicenseCenterIndividualActions.UpdateLicenseSuccess({ licenses: licenses });
                    }),
                    catchError(error => {
                        ToastConfig.EDIT_FAILURE();
                        return of(LicenseCenterIndividualActions.UpdateLicenseFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    loadLicensesById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseCenterIndividualActions.AddLicenseFolder),
            switchMap(action =>
                this.apiService.getLicenseFolderById(action.id).pipe(
                    map(licenseFolder =>
                        LicenseCenterIndividualActions.AddLicenseFolderSuccess({ licenseFolder: licenseFolder })
                    ),
                    catchError(error =>
                        of(LicenseCenterIndividualActions.AddLicenseFolderFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
