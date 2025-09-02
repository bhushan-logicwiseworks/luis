import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EmergencyContactsActions } from '../actions/patient-emergency-contacts.action';

@Injectable({
    providedIn: 'root',
})
export class PatientEmergencyContactsEffects {
    loadPatientEmergencyContacts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmergencyContactsActions.LoadEmergencyContacts),
            switchMap(action =>
                this.apiService.getEmergencyContacts(action.patientId).pipe(
                    map(emergencyContacts =>
                        EmergencyContactsActions.LoadEmergencyContactsSuccess({ emergencyContacts })
                    ),
                    catchError(error =>
                        of(EmergencyContactsActions.LoadEmergencyContactsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    addEmergencyContact$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmergencyContactsActions.AddEmergencyContact),
            switchMap(action =>
                this.apiService.addEmergencyContact(action.emergencyContact).pipe(
                    map(contact => EmergencyContactsActions.AddEmergencyContactSuccess()),
                    catchError(error => of(EmergencyContactsActions.AddEmergencyContactFailure({ error: error.error })))
                )
            )
        )
    );

    deleteEmergencyContact$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmergencyContactsActions.DeleteEmergencyContact),
            switchMap(action =>
                this.apiService.deleteEmergencyContact(action.emergencyContact).pipe(
                    map(contact => EmergencyContactsActions.DeleteEmergencyContactSuccess()),
                    catchError(error =>
                        of(EmergencyContactsActions.DeleteEmergencyContactFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmergencyContactsActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup => EmergencyContactsActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })),
                    catchError(error =>
                        of(EmergencyContactsActions.LoadCityAndStateDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                EmergencyContactsActions.AddEmergencyContactSuccess,
                EmergencyContactsActions.DeleteEmergencyContactSuccess
            ),
            map(() => EmergencyContactsActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
