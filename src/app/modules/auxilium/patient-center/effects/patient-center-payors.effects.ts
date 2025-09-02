import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientCenterPayorsActions } from '../actions/patient-center-payors.action';

@Injectable({
    providedIn: 'root',
})
export class PatientCenterPayorsEffects {
    loadPayors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterPayorsActions.LoadPatientPayors),
            switchMap(action =>
                this.apiService.getPatientPayors(action.id).pipe(
                    map(payors => PatientCenterPayorsActions.LoadPatientPayorsSuccess({ payors })),
                    catchError(error => of(PatientCenterPayorsActions.LoadPatientPayorsFailure({ error: error.error })))
                )
            )
        )
    );

    loadPayor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterPayorsActions.LoadPatientPayor),
            switchMap(action =>
                this.apiService.getPatientPayor(action.id).pipe(
                    map(payor => PatientCenterPayorsActions.LoadPatientPayorSuccess({ payor })),
                    catchError(error => of(PatientCenterPayorsActions.LoadPatientPayorFailure({ error: error.error })))
                )
            )
        )
    );

    loadPayorsList$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterPayorsActions.LoadPatientPayorsList),
            switchMap(action =>
                this.apiService.getPatientPayorsList().pipe(
                    map(payorsList => PatientCenterPayorsActions.LoadPatientPayorsListSuccess({ payorsList })),
                    catchError(error =>
                        of(PatientCenterPayorsActions.LoadPatientPayorsListFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    addPatientPayors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterPayorsActions.AddPatientPayors),
            switchMap(action =>
                this.apiService.addNewPatientPayors(action.payors).pipe(
                    map(payors => PatientCenterPayorsActions.AddPatientPayorsSuccess({ payors })),
                    catchError(error => of(PatientCenterPayorsActions.AddPatientPayorsFailure({ error: error.error })))
                )
            )
        )
    );

    deletePayors$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterPayorsActions.DeletePatientPayor),
            switchMap(action =>
                this.apiService.deletePatientPayors(action.dto).pipe(
                    map(salesrep => PatientCenterPayorsActions.DeletePatientPayorSuccess()),
                    catchError(error =>
                        of(PatientCenterPayorsActions.DeletePatientPayorFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    updatePayorsRank$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterPayorsActions.UpdatePatientPayors),
            switchMap(action =>
                this.apiService.updatePatientPayorsRank(action.payors).pipe(
                    map(payors => {
                        ToastConfig.EDIT_SUCCESS();
                        return PatientCenterPayorsActions.UpdatePatientPayorsSuccess({ payors });
                    }),
                    catchError(error => {
                        ToastConfig.EDIT_FAILURE();
                        return of(PatientCenterPayorsActions.UpdatePatientPayorsFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PatientCenterPayorsActions.DeletePatientPayorSuccess,
                PatientCenterPayorsActions.AddPatientPayorsSuccess,
                PatientCenterPayorsActions.UpdatePatientPayorsSuccess
            ),
            map(() => PatientCenterPayorsActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
