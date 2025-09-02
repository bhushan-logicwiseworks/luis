import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PatientPortalIndividualActions } from '../actions/patient-portal-individual.actions';
import { PatientPortalTableActions } from '../actions/patient-portal-table.actions';

@Injectable({
    providedIn: 'root',
})
export class PatientPortalTableEffects {
    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientPortalTableActions.LoadPPUsers),
            switchMap(action =>
                this.apiService.getPatientPortalUsers(action.filter).pipe(
                    map(users => PatientPortalTableActions.LoadPPUsersSuccess({ users })),
                    catchError(error => of(PatientPortalTableActions.LoadPPUsersFailure({ error: error.error })))
                )
            )
        )
    );

    deleteAccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientPortalTableActions.DeletePPUser),
            switchMap(action =>
                this.apiService.deletePatientPortalUser(action.dto).pipe(
                    map(access => PatientPortalTableActions.DeletePPUserSuccess()),
                    catchError(error => of(PatientPortalTableActions.DeletePPUserFailure({ error: error.error })))
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PatientPortalIndividualActions.AddPPUserSuccess,
                PatientPortalTableActions.DeletePPUserSuccess,
                PatientPortalIndividualActions.UpdateUserDetailsSuccess
            ),
            map(() => PatientPortalTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
