import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PatientCenterSensorActions } from '../actions/patient-center-sensor.action';

@Injectable({
    providedIn: 'root',
})
export class PatientCenterSensorEffects {
    loadPatients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterSensorActions.LoadPatientSensor),
            switchMap(action =>
                this.apiService.getpatientSensor(action.id).pipe(
                    map((data: any) => PatientCenterSensorActions.LoadPatientSensorSuccess({ sensor: data })),
                    catchError(error => of(PatientCenterSensorActions.LoadPatientSensorFailure({ error: error.error })))
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
