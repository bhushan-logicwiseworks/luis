import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientCenterPhysiciansActions } from '../actions/patient-center-physicians.action';

@Injectable({
    providedIn: 'root',
})
export class PatientCenterPhysiciansEffects {
    loadPhysicians$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterPhysiciansActions.LoadPatientPhysicians),
            switchMap(action =>
                this.apiService.getPatientPhysicians(action.id).pipe(
                    map(physicians => PatientCenterPhysiciansActions.LoadPatientPhysiciansSuccess({ physicians })),
                    catchError(error =>
                        of(PatientCenterPhysiciansActions.LoadPatientPhysiciansFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    addPatientPhysician$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterPhysiciansActions.AddPatientPhysicians),
            switchMap(action =>
                this.apiService.addNewPatientPhysicians(action.physicians).pipe(
                    map(physicians => PatientCenterPhysiciansActions.AddPatientPhysiciansSuccess({ physicians })),
                    catchError(error =>
                        of(PatientCenterPhysiciansActions.AddPatientPhysiciansFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    deletePhysician$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterPhysiciansActions.DeletePatientPhysicians),
            switchMap(action =>
                this.apiService.deletePatientPhysicians(action.dto).pipe(
                    map(salesrep => PatientCenterPhysiciansActions.DeletePatientPhysiciansSuccess()),
                    catchError(error =>
                        of(PatientCenterPhysiciansActions.DeletePatientPhysiciansFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPhysiciansList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterPhysiciansActions.LoadPatientPhysiciansList),
            switchMap(action =>
                this.apiService.getPatientPhysiciansList().pipe(
                    map(physiciansList =>
                        PatientCenterPhysiciansActions.LoadPatientPhysiciansListSuccess({ physiciansList })
                    ),
                    catchError(error =>
                        of(PatientCenterPhysiciansActions.LoadPatientPhysiciansListFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    updatePhysiciansList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterPhysiciansActions.UpdatePatientPhysicians),
            switchMap(({ physicians }) => {
                const physicanObservables = physicians.map(physicians =>
                    this.apiService.addNewPatientPhysicians(physicians)
                );
                return forkJoin(physicanObservables).pipe(
                    map(results => {
                        ToastConfig.EDIT_SUCCESS();
                        return PatientCenterPhysiciansActions.UpdatePatientPhysiciansSuccess({ physicians: results });
                    }),
                    catchError(error => {
                        ToastConfig.EDIT_FAILURE();
                        return of(
                            PatientCenterPhysiciansActions.UpdatePatientPhysiciansFailure({ error: error.error })
                        );
                    })
                );
            })
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PatientCenterPhysiciansActions.DeletePatientPhysiciansSuccess,
                PatientCenterPhysiciansActions.AddPatientPhysiciansSuccess,
                PatientCenterPhysiciansActions.UpdatePatientPhysiciansSuccess
            ),
            map(() => PatientCenterPhysiciansActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
