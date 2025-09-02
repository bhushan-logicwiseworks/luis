import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { LicenseCenterTableActions } from '../actions/license-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class LicenseCenterTableEffects {
    loadLicenses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseCenterTableActions.LoadLicenses),
            switchMap(action =>
                this.apiService.getAllLicense(action.filter).pipe(
                    map(licenses => LicenseCenterTableActions.LoadLicensesSuccess({ licenses })),
                    catchError(error => of(LicenseCenterTableActions.LoadLicensesFailure({ error: error.error })))
                )
            )
        )
    );

    loadLicensesById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseCenterTableActions.LoadLicensesById),
            switchMap(action =>
                this.apiService.getLicenseById(action.id).pipe(
                    map(License => LicenseCenterTableActions.LoadLicensesByIdSuccess({ License })),
                    catchError(error => of(LicenseCenterTableActions.LoadLicensesByIdFailure({ error: error.error })))
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseCenterTableActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup => LicenseCenterTableActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })),
                    catchError(error =>
                        of(LicenseCenterTableActions.LoadCityAndStateDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    deleteLicense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseCenterTableActions.DeleteLicense),
            exhaustMap(action =>
                this.apiService.deleteLicense(action.dto).pipe(
                    map(() => {
                        ToastConfig.DELETE_SUCCESS();
                        return LicenseCenterTableActions.DeleteLicenseSuccess();
                    }),
                    catchError(error => {
                        ToastConfig.DELETE_FAILURE();
                        return of(LicenseCenterTableActions.DeleteLicenseFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    addLicense$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseCenterTableActions.AddLicense),
            switchMap(action =>
                this.apiService.saveLicense(action.license).pipe(
                    map(() => {
                        ToastConfig.ADD_SUCCESS();
                        return LicenseCenterTableActions.AddLicenseSuccess();
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(LicenseCenterTableActions.AddLicenseFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    LoadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseCenterTableActions.LoadBranchDropDown),
            switchMap(action =>
                this.apiService.getBranchList().pipe(
                    map(branch => LicenseCenterTableActions.LoadBranchDropDownSuccess({ branch })),
                    catchError(error => of(LicenseCenterTableActions.LoadBranchDropDownFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LicenseCenterTableActions.DeleteLicenseSuccess, LicenseCenterTableActions.AddLicenseSuccess),
            map(() => LicenseCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
