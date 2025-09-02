import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { PatientCenterTableActions } from '../actions/patient-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class PatientCenterTableEffects {
    loadPatients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterTableActions.LoadPatients),
            switchMap(action =>
                this.apiService.getPatients(action.filter).pipe(
                    map((patient: any) => PatientCenterTableActions.LoadPatientsSuccess({ patient })),
                    catchError(error => of(PatientCenterTableActions.LoadPatientsFailure({ error: error.error })))
                )
            )
        )
    );

    addPatient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterTableActions.AddPatientQuickSave),
            switchMap(action =>
                this.apiService.patientQuickSave(action.patient).pipe(
                    mergeMap(id => [
                        PatientCenterTableActions.AddPatientQuickSaveSuccess({ id }),
                        PatientCenterTableActions.RedirectPatientCenter(),
                    ]),
                    catchError(error =>
                        of(PatientCenterTableActions.AddPatientQuickSaveFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    searchPatient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterTableActions.PatientSearch),
            switchMap(action =>
                this.apiService.patientSearch(action.patientSearch).pipe(
                    map(patient => PatientCenterTableActions.PatientSearchSuccess({ patient })),
                    catchError(error => of(PatientCenterTableActions.PatientSearchFailure({ error: error.error })))
                )
            )
        )
    );

    deletePatient$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterTableActions.DeletePatient),
            switchMap(action =>
                this.apiService.deletePatient(action.dto).pipe(
                    map(patient => PatientCenterTableActions.DeletePatientSuccess()),
                    catchError(error => of(PatientCenterTableActions.DeletePatientFailure({ error: error.error })))
                )
            )
        )
    );

    redirectPatientCenter$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterTableActions.AddPatientQuickSaveSuccess),
            map(action =>
                PatientCenterTableActions.Navigate({
                    commands: [`/centers/patient-center/${action.id.toString()}/demographics`],
                })
            )
        )
    );

    loadPatientBalance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterTableActions.LoadPatientBalance),
            switchMap(action =>
                this.apiService.getPatientBalance(action.id).pipe(
                    map(patientBalances => PatientCenterTableActions.LoadPatientBalanceSuccess({ patientBalances })),
                    catchError(error => of(PatientCenterTableActions.LoadPatientBalanceFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PatientCenterTableActions.AddPatientQuickSaveSuccess,
                PatientCenterTableActions.DeletePatientSuccess
            ),
            map(() => PatientCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
