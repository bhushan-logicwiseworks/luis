import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ComplianceCenterTableActions } from '../actions/compliance-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class ComplianceCenterTableEffects {
    loadCompliances$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ComplianceCenterTableActions.LoadCompliance),
            switchMap(action =>
                this.apiService.getCompliance(action.filter).pipe(
                    map(Compliances => ComplianceCenterTableActions.LoadComplianceSuccess({ Compliances })),
                    catchError(error => of(ComplianceCenterTableActions.LoadComplianceFailure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
