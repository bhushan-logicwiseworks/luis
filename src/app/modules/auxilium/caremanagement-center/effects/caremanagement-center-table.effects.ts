import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CareManagementCenterTableActions } from '../actions/caremanagement-center-table.actions';

@Injectable()
export class CareManagementCenterTableEffects {
    loadCareManagements$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CareManagementCenterTableActions.LoadCareManagement),
            switchMap(action =>
                this.apiService.getCareManagement(action.filter).pipe(
                    map(CareManagements =>
                        CareManagementCenterTableActions.LoadCareManagementSuccess({ CareManagements })
                    ),
                    catchError(error =>
                        of(CareManagementCenterTableActions.LoadCareManagementFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
