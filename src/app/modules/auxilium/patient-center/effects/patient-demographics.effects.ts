import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientDemographicsActions } from '../actions/patient-demographics.action';
import { PatientCenterDeatilsActions } from '../actions/patient-details.action';

@Injectable({
    providedIn: 'root',
})
export class PatientDemographicsEffects {
    loadPatientDemographics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDemographicsActions.AddPatientDemographics),
            switchMap(action =>
                this.apiService.addPatientDemographics(action.patient).pipe(
                    map(demographics => {
                        ToastConfig.ADD_SUCCESS();
                        return PatientDemographicsActions.AddPatientDemographicsSuccess({ demographics });
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(PatientDemographicsActions.AddPatientDemographicsFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    getReferCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDemographicsActions.getReferCode),
            switchMap(action => {
                return this.apiService.getReferCode(action.id).pipe(
                    map(referCode => {
                        return PatientDemographicsActions.getReferCodeSuccess({ referCode });
                    }),
                    catchError(error => {
                        return of(PatientDemographicsActions.getReferCodeFailure({ error }));
                    })
                );
            })
        )
    );

    loadPatientsOnUpdatePatientDemographics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDemographicsActions.AddPatientDemographicsSuccess),
            switchMap(action =>
                this.apiService.getPatientDetails(action.demographics as unknown as number).pipe(
                    map(patient => PatientCenterDeatilsActions.LoadPatientDetails(patient)),
                    catchError(error =>
                        of(PatientCenterDeatilsActions.LoadPatientDetailsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDemographicsActions.LoadBranchDropDown),
            switchMap(action =>
                this.apiService.getBranchList().pipe(
                    map(branch => PatientDemographicsActions.LoadBranchDropDownSuccess({ branch })),
                    catchError(error =>
                        of(PatientDemographicsActions.LoadBranchDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadAuthorizePrism$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDemographicsActions.LoadPrismAuthorization),
            switchMap(action =>
                this.apiService.getAuthorizePrism(action.id).pipe(
                    map(prism => PatientDemographicsActions.LoadPrismAuthorizationSuccess({ authPrism: prism })),
                    catchError(error =>
                        of(PatientDemographicsActions.LoadPrismAuthorizationFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    prismAuthorization$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDemographicsActions.prismAuthorization),
            switchMap(action =>
                this.apiService.authorizePrism(action.id).pipe(
                    map(prism => {
                        ToastConfig.CUSTOM_SUCCESS('prismAuthorizationSuccess');
                        return PatientDemographicsActions.prismAuthorizationSuccess({ id: action.id });
                    }),
                    catchError(error => {
                        ToastConfig.CUSTOM_FAILURE('prismAuthorizationFailure');
                        return of(PatientDemographicsActions.prismAuthorizationFailure({ error }));
                    })
                )
            )
        )
    );

    loadPatientDataAfterAuthorization$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientDemographicsActions.prismAuthorizationSuccess),
            map(action => {
                return PatientDemographicsActions.LoadPrismAuthorization({ id: action.id });
            })
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                PatientDemographicsActions.AddPatientDemographicsSuccess,
                PatientCenterDeatilsActions.LoadPatientDetailsSuccess
            ),
            map(() => PatientDemographicsActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
