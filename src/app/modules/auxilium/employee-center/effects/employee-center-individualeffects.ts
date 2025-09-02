import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { EmployeeCenterIndividualActions } from '../actions/employee-center-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class EmployeeCenterIndividualEffects {
    addSalesRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeCenterIndividualActions.AddEmployee),
            switchMap(action =>
                this.apiService.saveEmployee(action.employee).pipe(
                    mergeMap((id: any) => [
                        EmployeeCenterIndividualActions.AddEmployeeSuccess({ id }),
                        EmployeeCenterIndividualActions.RedirectEmployeeCenter(),
                    ]),
                    catchError(error => of(EmployeeCenterIndividualActions.AddEmployeeFailure({ error: error.error })))
                )
            )
        )
    );

    redirectEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeCenterIndividualActions.AddEmployeeSuccess),
            map(action =>
                EmployeeCenterIndividualActions.Navigate({
                    commands: [`/centers/employee-center/${action.id.toString()}/demographics`],
                })
            )
        )
    );

    updateSalesRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeCenterIndividualActions.UpdateEmployee),
            switchMap(action =>
                this.apiService.saveEmployee(action.employee).pipe(
                    map(employee => EmployeeCenterIndividualActions.AddEmployeeSuccess({ employee })),
                    catchError(error => of(EmployeeCenterIndividualActions.AddEmployeeFailure({ error: error.error })))
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
