import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PatientCenterDiagnosiscodeActions } from '../actions/patient-center-diagnosiscode.action';
import { PatientCenterPayorsActions } from '../actions/patient-center-payors.action';
import { PatientCenterPhysiciansActions } from '../actions/patient-center-physicians.action';
import { PatientCenterDeatilsActions } from '../actions/patient-details.action';
import { PatientWorkOrderActions } from '../actions/patient-work-order.action';

@Injectable({
    providedIn: 'root',
})
export class PatientCenterDetailsEffects {
    loadPatients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDeatilsActions.LoadPatientDetails),
            switchMap(action =>
                this.apiService.getPatientDetails(action.id).pipe(
                    map((data: any) => PatientCenterDeatilsActions.LoadPatientDetailsSuccess({ patient: data })),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadPatientDetailsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPatientSalesRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDeatilsActions.LoadPatientSalesRep),
            switchMap(action =>
                this.apiService.getPatientSalesRep().pipe(
                    map(salesrep => PatientCenterDeatilsActions.LoadPatientSalesRepSuccess({ salesrep })),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadPatientSalesRepFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadIntakeDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDeatilsActions.LoadIntakeDropDown),
            switchMap(action =>
                this.apiService.getPatientIntake().pipe(
                    map(intake => PatientCenterDeatilsActions.LoadIntakeDropDownSuccess({ intake })),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadIntakeDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadPatientCategoryDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDeatilsActions.LoadPatientCategoryDropDown),
            switchMap(action =>
                this.apiService.getPatientCatagory().pipe(
                    map(patientCategory =>
                        PatientCenterDeatilsActions.LoadPatientCategoryDropDownSuccess({ patientCategory })
                    ),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadPatientCategoryDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadPatientContactMethodDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDeatilsActions.LoadPatientContactMethodDropDown),
            switchMap(action =>
                this.apiService.getPatientContactMethod().pipe(
                    map(contactMethod =>
                        PatientCenterDeatilsActions.LoadPatientContactMethodDropDownSuccess({ contactMethod })
                    ),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadPatientContactMethodDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadPatientStatusDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDeatilsActions.LoadPatientStatusDropDown),
            switchMap(action =>
                this.apiService.getPatientStatus().pipe(
                    map(patientStatus =>
                        PatientCenterDeatilsActions.LoadPatientStatusDropDownSuccess({ patientStatus })
                    ),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadPatientStatusDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadPatientReferralDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDeatilsActions.LoadPatientReferralDropDown),
            switchMap(action =>
                this.apiService.getPatientReferral().pipe(
                    map(patientReferral =>
                        PatientCenterDeatilsActions.LoadPatientReferralDropDownSuccess({ patientReferral })
                    ),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadPatientReferralDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadInactiveReasonDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDeatilsActions.LoadInactiveReasonDropDown),
            switchMap(action =>
                this.apiService.getInactiveReason().pipe(
                    map(inactiveReason =>
                        PatientCenterDeatilsActions.LoadInactiveReasonDropDownSuccess({ inactiveReason })
                    ),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadInactiveReasonDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadCityAndStateDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDeatilsActions.LoadCityAndStateDropDown),
            switchMap(action =>
                this.apiService.getStateCityBasedOnZipCode(action.zipCode).pipe(
                    map(zipCodeLookup =>
                        PatientCenterDeatilsActions.LoadCityAndStateDropDownSuccess({ zipCodeLookup })
                    ),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadCityAndStateDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadPlaceOfServiceDropDown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDeatilsActions.LoadPlaceOfServiceDropDown),
            switchMap(action =>
                this.apiService.getPlaceOfService().pipe(
                    map(placeOfService =>
                        PatientCenterDeatilsActions.LoadPlaceOfServiceDropDownSuccess({ placeOfService })
                    ),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadPlaceOfServiceDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadReferrals$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDeatilsActions.LoadPatientReferrals),
            switchMap(action =>
                this.apiService.getPatientReferal().pipe(
                    map(referrals => PatientCenterDeatilsActions.LoadPatientReferralsSuccess({ referrals })),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadPatientReferralsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPatientValidation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientCenterDeatilsActions.LoadPatientValidation),
            switchMap(action =>
                this.apiService.getPatientValidations(action.id).pipe(
                    map((validation: any) =>
                        PatientCenterDeatilsActions.LoadPatientValidationSuccess({ patientValidation: validation })
                    ),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadPatientValidationFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadValidationByUpdateRecord$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PatientCenterPayorsActions.UpdatePatientPayorsSuccess,
                PatientCenterPhysiciansActions.UpdatePatientPhysiciansSuccess,
                PatientCenterDiagnosiscodeActions.AddPatientDiagnosiscodeSuccess,
                PatientWorkOrderActions.EditGroupWorkEditSuccess,
                PatientCenterPhysiciansActions.AddPatientPhysiciansSuccess,
                PatientCenterPayorsActions.AddPatientPayorsSuccess
            ),
            map(data => {
                const currentPath = window.location.href.split('/')[4];
                if (currentPath !== 'work-order-center') {
                    const patientId = parseInt(window.location.href.split('/')[5], 10);
                    return PatientCenterDeatilsActions.LoadPatientValidation({ id: patientId });
                }
                // Return a default action if the condition is not met
                return { type: '[No Action] No Action Required' };
            }),
            catchError(error => of(PatientCenterDeatilsActions.LoadPatientValidationFailure({ error: error.error })))
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
