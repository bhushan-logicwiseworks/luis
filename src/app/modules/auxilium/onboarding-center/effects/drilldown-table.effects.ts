import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { OnboardingCenterService } from 'app/core/services/onboarding-center.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DrillDownTableActions } from '../actions/drilldown-table.actions';

@Injectable({
    providedIn: 'root',
})
export class DrillDownTableEffects {
    loadDrillDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DrillDownTableActions.LoadPatients),
            switchMap(action =>
                this.apiService.getDrillDown(action.filter).pipe(
                    map(patientlist => DrillDownTableActions.LoadPatientsSuccess({ patientlist })),
                    catchError(error => of(DrillDownTableActions.LoadPatientsFailure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: OnboardingCenterService
    ) {}
}
