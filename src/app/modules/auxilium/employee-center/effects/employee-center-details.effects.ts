import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EmployeeCenterDeatilsActions } from '../actions/employee-center-details.action';

@Injectable({
    providedIn: 'root',
})
export class EmployeeCenterDetailsEffects {
    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeCenterDeatilsActions.LoadEmployeeDetails),
            switchMap(action =>
                this.apiService.getEmployeeDetails(action.id).pipe(
                    map((data: any) => EmployeeCenterDeatilsActions.LoadEmployeeDetailsSuccess({ employee: data })),
                    catchError(error =>
                        of(EmployeeCenterDeatilsActions.LoadEmployeeDetailsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeCenterDeatilsActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup =>
                        EmployeeCenterDeatilsActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })
                    ),
                    catchError(error =>
                        of(EmployeeCenterDeatilsActions.LoadCityAndStateDropDownFailure({ error: error.error }))
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
