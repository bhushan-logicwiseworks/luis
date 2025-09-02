import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientArHistoryActions } from '../actions/patient-ar-history.action';

@Injectable({
    providedIn: 'root',
})
export class PatientArHistoryEffects {
    loadPatientArHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientArHistoryActions.LoadArHistory),
            switchMap(action =>
                this.apiService.getPatientArHistory(action.patientId).pipe(
                    map(data => PatientArHistoryActions.LoadArHistorySuccess({ data })),
                    catchError(error => of(PatientArHistoryActions.LoadArHistoryFailure({ error: error.error })))
                )
            )
        )
    );

    loadPatientArHistoryById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientArHistoryActions.LoadHistoryById),
            switchMap(action =>
                this.apiService.getPatientArHistoryById(action.arHistoryId).pipe(
                    map(historyData => PatientArHistoryActions.LoadHistoryByIdSuccess({ historyData })),
                    catchError(error => of(PatientArHistoryActions.LoadHistoryByIdFailure({ error: error.error })))
                )
            )
        )
    );

    saveArHistoryById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientArHistoryActions.saveArHistory),
            switchMap(action =>
                this.apiService.savePatientArHistoryById(action.arHistory).pipe(
                    map(historyData => {
                        ToastConfig.ADD_SUCCESS();
                        return PatientArHistoryActions.saveArHistorySuccess();
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(PatientArHistoryActions.saveArHistoryFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    redirectPatientArHistory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientArHistoryActions.saveArHistorySuccess),
            map(action =>
                PatientArHistoryActions.Navigate({
                    commands: [window.history.back()],
                })
            )
        )
    );

    loadBillTypeDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientArHistoryActions.BillTypeDropdown),
            switchMap(action =>
                this.apiService.getARBillTypeDropdown().pipe(
                    map(billType => PatientArHistoryActions.BillTypeDropdownSuccess({ billType })),
                    catchError(error => of(PatientArHistoryActions.BillTypeDropdownFailure({ error: error.error })))
                )
            )
        )
    );

    LoadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientArHistoryActions.LoadBranchDropDown),
            switchMap(action =>
                this.apiService.getBranchList().pipe(
                    map(branch => PatientArHistoryActions.LoadBranchDropDownSuccess({ branch })),
                    catchError(error => of(PatientArHistoryActions.LoadBranchDropDownFailure({ error: error.error })))
                )
            )
        )
    );

    AmtAdjustedCodeDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientArHistoryActions.AmtAdjustedCodeDropdown),
            switchMap(action =>
                this.apiService.getAmtAdjustedCode().pipe(
                    map(amtAdjustedCode => PatientArHistoryActions.AmtAdjustedCodeDropdownSuccess({ amtAdjustedCode })),
                    catchError(error =>
                        of(PatientArHistoryActions.AmtAdjustedCodeDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    deleteRecord$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientArHistoryActions.DeleteArHistory),
            switchMap(action =>
                this.apiService.deletePatientArHistory(action.arHistory).pipe(
                    map(() => {
                        ToastConfig.DELETE_SUCCESS();
                        return PatientArHistoryActions.DeleteArHistorySuccess();
                    }),
                    catchError(error => {
                        ToastConfig.DELETE_FAILURE();
                        return of(PatientArHistoryActions.DeleteArHistoryFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientArHistoryActions.DeleteArHistorySuccess),
            map(() => PatientArHistoryActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store,
        private apiService: ApiService
    ) {}
}
