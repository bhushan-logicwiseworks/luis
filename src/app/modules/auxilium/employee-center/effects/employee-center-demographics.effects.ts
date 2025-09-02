import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { EmployeeDemographicsActions } from '../actions/employee-center-demographics.action';

@Injectable({
    providedIn: 'root',
})
export class EmployeeDemographicsEffects {
    loadEmployeeDemographics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeDemographicsActions.AddEmployeeDemographics),
            switchMap(action =>
                this.apiService.addEmployeeDemographics(action.patient).pipe(
                    map(demographics => {
                        ToastConfig.ADD_SUCCESS();
                        return EmployeeDemographicsActions.AddEmployeeDemographicsSuccess({ demographics });
                    }),
                    catchError(error =>
                        of(EmployeeDemographicsActions.AddEmployeeDemographicsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeDemographicsActions.AddEmployeeDemographicsSuccess),
            map(() => EmployeeDemographicsActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
