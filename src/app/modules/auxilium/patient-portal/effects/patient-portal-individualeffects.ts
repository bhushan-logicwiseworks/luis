import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientPortalIndividualActions } from '../actions/patient-portal-individual.actions';

@Injectable({
    providedIn: 'root',
})
export class PatientPortalIndividualEffects {
    getAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientPortalIndividualActions.LoadPPUser),
            switchMap(action =>
                this.apiService.getPatientPortalUser(action.id).pipe(
                    map(user => PatientPortalIndividualActions.LoadPPUserSuccess({ user })),
                    catchError(error => of(PatientPortalIndividualActions.LoadPPUserFailure({ error: error.error })))
                )
            )
        )
    );

    addAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientPortalIndividualActions.AddPPUser),
            switchMap(action =>
                this.apiService.addPatientPortalUser(action.user).pipe(
                    map(user => PatientPortalIndividualActions.AddPPUserSuccess({ user })),
                    catchError(error => of(PatientPortalIndividualActions.AddPPUserFailure({ error: error.error })))
                )
            )
        )
    );

    updateAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientPortalIndividualActions.UpdatePPUser),
            switchMap(action =>
                this.apiService.updatePatientPortalUser(action.user).pipe(
                    map(user => PatientPortalIndividualActions.UpdatePPUserSuccess({ user })),
                    catchError(error => of(PatientPortalIndividualActions.UpdatePPUserFailure({ error: error.error })))
                )
            )
        )
    );

    updateUserDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientPortalIndividualActions.UpdateUserDetails),
            switchMap(action =>
                this.apiService.updatePatientPortalUser(action.userDetails).pipe(
                    map(userDetails => PatientPortalIndividualActions.UpdateUserDetailsSuccess({ userDetails })),
                    catchError(error =>
                        of(PatientPortalIndividualActions.UpdateUserDetailsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    updateUserDetailsSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PatientPortalIndividualActions.UpdateUserDetailsSuccess),
                tap(() => {
                    ToastConfig.EDIT_SUCCESS();
                })
            ),
        { dispatch: false }
    );

    updateUserDetailsFailure$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PatientPortalIndividualActions.UpdateUserDetailsFailure),
                tap(() => {
                    ToastConfig.EDIT_FAILURE();
                })
            ),
        { dispatch: false }
    );

    /* deleteAccess$ = createEffect(() => this.actions$.pipe(
        ofType(PatientPortalIndividualActions.DeleteUser),
        switchMap(action =>
            this.apiService.deletePatientPortalUser(action.id).pipe(
                map(access => PatientPortalIndividualActions.DeleteUserSuccess()),
                catchError(error => of(PatientPortalIndividualActions.DeleteUserFailure({ error: error.error })))
            )
        )
    )); */

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private store: Store
    ) {}
}
