import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { TeamCenterTableActions } from '../actions/team-center.actions';

@Injectable({
    providedIn: 'root',
})
export class TeamCenterTableEffects {
    loadEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TeamCenterTableActions.LoadEmployees),
            switchMap(action =>
                this.apiService.getEmployees(action.filter).pipe(
                    map(employees => TeamCenterTableActions.LoadEmployeesSuccess({ employees })),
                    catchError(error => of(TeamCenterTableActions.LoadEmployeesFailure({ error: error.error })))
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
