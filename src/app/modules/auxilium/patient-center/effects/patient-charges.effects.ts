import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientChargesActions } from '../actions/patient-charges.action';

@Injectable({
    providedIn: 'root',
})
export class PatientChargesEffects {
    loadPatientCharges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientChargesActions.LoadCharges),
            switchMap(action =>
                this.apiService.getPatientCharges(action.patientId).pipe(
                    map(data => PatientChargesActions.LoadChargesSuccess({ data })),
                    catchError(error => of(PatientChargesActions.LoadChargesFailure({ error: error.error })))
                )
            )
        )
    );

    loadPatientChargesById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientChargesActions.LoadChargesById),
            switchMap(action =>
                this.apiService.getPatientChargesById(action.chargeId).pipe(
                    map(chargesData => PatientChargesActions.LoadChargesByIdSuccess({ chargesData })),
                    catchError(error => of(PatientChargesActions.LoadChargesByIdFailure({ error: error.error })))
                )
            )
        )
    );

    saveChargesById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientChargesActions.AddCharges),
            switchMap(action =>
                this.apiService.savePatientChargesById(action.charges).pipe(
                    map(chargesData => {
                        ToastConfig.ADD_SUCCESS();
                        return PatientChargesActions.AddChargesSuccess({ charges: chargesData });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(PatientChargesActions.AddChargesFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    redirectPatientCharges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientChargesActions.AddChargesSuccess),
            map(action =>
                PatientChargesActions.Navigate({
                    commands: [window.history.back()],
                })
            )
        )
    );

    groupEditCharges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientChargesActions.EditGroupCharges),
            switchMap(action =>
                this.apiService.groupEditCharges(action.chargesData).pipe(
                    map(data => {
                        ToastConfig.EDIT_SUCCESS();
                        return PatientChargesActions.EditGroupChargesSuccess();
                    }),
                    catchError(error => of(PatientChargesActions.EditGroupChargesFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientChargesActions.EditGroupChargesSuccess),
            map(() => PatientChargesActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
