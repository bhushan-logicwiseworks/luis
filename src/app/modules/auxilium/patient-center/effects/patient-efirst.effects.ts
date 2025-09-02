import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PatientEFirstActions } from '../actions/patient-efirst.actions';

@Injectable({
    providedIn: 'root',
})
export class PatientEFirstEffects {
    loadPatientEFirst$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientEFirstActions.LoadEFirst),
            switchMap(action =>
                this.apiService.getEFirst(action.patientId).pipe(
                    map(efirsts => PatientEFirstActions.LoadEFirstSuccess({ efirsts })),
                    catchError(error => of(PatientEFirstActions.LoadEFirstFailure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
