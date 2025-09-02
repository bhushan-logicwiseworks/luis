import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PatientCenterDiagnosiscodeActions } from '../actions/patient-center-diagnosiscode.action';

@Injectable({
    providedIn: 'root',
})
export class PatientCenterDiagnosiscodesEffects {
    loadDiagnosiscodes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosiscode),
            switchMap(action =>
                this.apiService.getPatientDiagnosiscode(action.id).pipe(
                    map(diagnosiscodes =>
                        PatientCenterDiagnosiscodeActions.LoadPatientDiagnosiscodeSuccess({ diagnosiscodes })
                    ),
                    catchError(error =>
                        of(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosiscodeFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadDiagnosiscodesList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDiagnosiscodeActions.LoadPatientDiagnosisCodesList),
            switchMap(action =>
                this.apiService.getPatientDiagnosiscodeList().pipe(
                    map(diagnosisCodesList =>
                        PatientCenterDiagnosiscodeActions.LoadPatientDiagnosisCodesListSuccess({ diagnosisCodesList })
                    ),
                    catchError(error =>
                        of(
                            PatientCenterDiagnosiscodeActions.LoadPatientDiagnosisCodesListFailure({
                                error: error.error,
                            })
                        )
                    )
                )
            )
        )
    );

    addPatientDiagnosiscodes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDiagnosiscodeActions.AddPatientDiagnosiscode),
            switchMap(action =>
                this.apiService.addNewPatientDiagnosiscodes(action.diagnosiscode).pipe(
                    map(diagnosiscode =>
                        PatientCenterDiagnosiscodeActions.AddPatientDiagnosiscodeSuccess({ diagnosiscode })
                    ),
                    catchError(error =>
                        of(PatientCenterDiagnosiscodeActions.AddPatientDiagnosiscodeFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    deleteDiagnosiscodes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDiagnosiscodeActions.DeletePatientDiagnosiscode),
            switchMap(action =>
                this.apiService.deletePatientDiagnosiscode(action.dto).pipe(
                    map(salesrep => PatientCenterDiagnosiscodeActions.DeletePatientDiagnosiscodeSuccess()),
                    catchError(error =>
                        of(PatientCenterDiagnosiscodeActions.DeletePatientDiagnosiscodeFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PatientCenterDiagnosiscodeActions.DeletePatientDiagnosiscodeSuccess,
                PatientCenterDiagnosiscodeActions.AddPatientDiagnosiscodeSuccess
            ),
            map(() => PatientCenterDiagnosiscodeActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
