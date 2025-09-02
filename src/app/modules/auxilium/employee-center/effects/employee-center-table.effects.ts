import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { EmployeeCenterIndividualActions } from '../actions/employee-center-individual.actions';
import { EmployeeCenterTableActions } from '../actions/employee-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class EmployeeCenterTableEffects {
    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeCenterTableActions.LoadEmployees),
            switchMap(action =>
                this.apiService.getEmployees(action.filter).pipe(
                    map(employees => EmployeeCenterTableActions.LoadEmployeesSuccess({ employees })),
                    catchError(error => of(EmployeeCenterTableActions.LoadEmployeesFailure({ error: error.error })))
                )
            )
        )
    );

    deleteSale$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeCenterTableActions.DeleteEmployee),
            switchMap(action =>
                this.apiService.deleteEmployee(action.dto).pipe(
                    map(salesrep => EmployeeCenterTableActions.DeleteEmployeeSuccess()),
                    catchError(error => of(EmployeeCenterTableActions.DeleteEmployeeFailure({ error: error.error })))
                )
            )
        )
    );

    searchEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeCenterTableActions.EmployeeSearch),
            switchMap(action =>
                this.apiService.employeeSearch(action.employeeSearch).pipe(
                    map(employee => EmployeeCenterTableActions.EmployeeSearchSuccess({ employee })),
                    catchError(error => of(EmployeeCenterTableActions.EmployeeSearchFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                EmployeeCenterIndividualActions.AddEmployeeSuccess,
                EmployeeCenterIndividualActions.UpdateEmployeeSuccess,
                EmployeeCenterTableActions.DeleteEmployeeSuccess
            ),
            map(() => EmployeeCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
