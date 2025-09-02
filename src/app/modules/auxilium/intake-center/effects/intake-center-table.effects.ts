import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IntakeCenterTableActions } from '../actions/intake-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class IntakeCenterTableEffects {
    loadIntakes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IntakeCenterTableActions.LoadIntake),
            switchMap(action =>
                this.apiService.getIntake(action.filter).pipe(
                    map(Intakes => IntakeCenterTableActions.LoadIntakeSuccess({ Intakes })),
                    catchError(error => of(IntakeCenterTableActions.LoadIntakeFailure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
