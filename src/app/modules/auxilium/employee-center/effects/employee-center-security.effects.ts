import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ApiService } from 'app/core/services/api.service';
import { EmployeeSecurityActions } from '../actions/employee-center-security.action';

@Injectable({
    providedIn: 'root',
})
export class EmployeeSecurityEffects {
    getEmployeeAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeSecurityActions.getEmployeeAccess),
            switchMap(action =>
                this.apiService.getEmployeeAccess(action.id).pipe(
                    map(employeeAccess => EmployeeSecurityActions.getEmployeeAccessSuccess({ employeeAccess })),
                    catchError(error => of(EmployeeSecurityActions.getEmployeeAccessFailure({ error: error.error })))
                )
            )
        )
    );

    saveEmployeeAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeSecurityActions.saveEmployeeAccess),
            switchMap(action =>
                this.apiService.saveEmployeeAccess(action.employeeAccess).pipe(
                    map(employeeAccess => EmployeeSecurityActions.saveEmployeeAccessSuccess()),
                    catchError(error => of(EmployeeSecurityActions.saveEmployeeAccessFailure({ error: error.error })))
                )
            )
        )
    );

    deleteEmployeeAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeSecurityActions.deleteEmployeeAccess),
            switchMap(action =>
                this.apiService.deleteEmployeeAccess(action.employeeData).pipe(
                    map(employeeData => EmployeeSecurityActions.deleteEmployeeAccessSuccess({ employeeData })),
                    catchError(error => of(EmployeeSecurityActions.deleteEmployeeAccessFailure({ error: error.error })))
                )
            )
        )
    );

    loadEmployeeSecurity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeSecurityActions.AddSecurity),
            switchMap(action =>
                this.apiService.addSecurity(action.data).pipe(
                    map((security: any) => EmployeeSecurityActions.AddSecuritySuccess({ security })),
                    catchError(error => of(EmployeeSecurityActions.AddSecurityFailure({ error: error.error })))
                )
            )
        )
    );

    addNewAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeSecurityActions.AddNewAcess),
            switchMap(action =>
                this.apiService.addNewAccess(action.addAccessData).pipe(
                    map((security: any) => EmployeeSecurityActions.AddNewAcessSuccess()),
                    catchError(error => of(EmployeeSecurityActions.AddNewAcessFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                EmployeeSecurityActions.AddSecuritySuccess,
                EmployeeSecurityActions.saveEmployeeAccessSuccess,
                EmployeeSecurityActions.deleteEmployeeAccessSuccess,
                EmployeeSecurityActions.AddNewAcessSuccess
            ),
            map(() => EmployeeSecurityActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
