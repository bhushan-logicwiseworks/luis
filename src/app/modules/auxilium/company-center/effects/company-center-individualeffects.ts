import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { ToastConfig } from '../../../../core/config/toast-config';
import { CompanyCenterIndividualActions } from '../actions/company-center-individualeffects';

@Injectable({
    providedIn: 'root',
})
export class CompanyCenterIndividualEffects {
    addCompany$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyCenterIndividualActions.AddCompany),
            switchMap(action =>
                this.apiService.saveCompany(action.company).pipe(
                    map(company => {
                        ToastConfig.ADD_SUCCESS();
                        return CompanyCenterIndividualActions.AddCompanySuccess({ company });
                    }),
                    catchError(error => of(CompanyCenterIndividualActions.AddCompanyFailure({ error: error.error })))
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CompanyCenterIndividualActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup =>
                        CompanyCenterIndividualActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })
                    ),
                    catchError(error =>
                        of(CompanyCenterIndividualActions.LoadCityAndStateDropDownFailure({ error: error.error }))
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
