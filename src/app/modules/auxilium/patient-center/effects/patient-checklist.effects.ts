import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { ApiService } from 'app/core/services/api.service';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientChecklistActions } from '../actions/patient-checklist.action';

@Injectable({
    providedIn: 'root',
})
export class PatientChecklistEffects {
    loadPatientChecklist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientChecklistActions.AddPatientChecklist),
            switchMap(action =>
                this.apiService.addPatientchecklist(action.patient).pipe(
                    map(checklist => {
                        ToastConfig.ADD_SUCCESS();
                        return PatientChecklistActions.AddPatientChecklistSuccess({ checklist });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(PatientChecklistActions.AddPatientChecklistFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientChecklistActions.AddPatientChecklistSuccess),
            map(() => PatientChecklistActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
