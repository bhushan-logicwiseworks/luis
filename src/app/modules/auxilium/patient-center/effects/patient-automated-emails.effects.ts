import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PatientAutomatedEmailsActions } from '../actions/patient-automated-emails.actions';

@Injectable({
    providedIn: 'root',
})
export class PatientAutomatedEmailsEffects {
    loadPatientEmergencyContacts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientAutomatedEmailsActions.LoadAutomatedEmails),
            switchMap(action =>
                this.apiService.getAutomatedEmails(action.patientId).pipe(
                    map(automatedEmails =>
                        PatientAutomatedEmailsActions.LoadAutomatedEmailsSuccess({ automatedEmails })
                    ),
                    catchError(error =>
                        of(PatientAutomatedEmailsActions.LoadAutomatedEmailsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
