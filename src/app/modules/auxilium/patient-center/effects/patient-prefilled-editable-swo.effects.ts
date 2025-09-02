import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientSWOActions } from '../actions/patient-prefilled-editable-swo.action';

@Injectable({
    providedIn: 'root',
})
export class PatientSWOEffects {
    // Load Patient SWO
    loadSWO$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientSWOActions.LoadPatientSWO),
            switchMap(action =>
                this.apiService.getPatietSWO(action.patientId).pipe(
                    map(patientSWOInfo => PatientSWOActions.LoadPatientSWOSuccess({ patientSWOInfo })),
                    catchError(error => of(PatientSWOActions.LoadPatientSWOFailure({ error: error.error })))
                )
            )
        )
    );

    UpdateSWODetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientSWOActions.UpdatePatientSWO),
            switchMap(action =>
                this.apiService.updatepatientSWO(action.patientSWODetails).pipe(
                    map(() => {
                        ToastConfig.CUSTOM_SUCCESS('PatientSWOSuccess');
                        return PatientSWOActions.UpdatePatientSWOSuccess();
                    }),
                    catchError(error => {
                        ToastConfig.EDIT_FAILURE();
                        return of(PatientSWOActions.UpdatePatientSWOFailure({ error: error.error }));
                    })
                )
            )
        )
    );
    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
