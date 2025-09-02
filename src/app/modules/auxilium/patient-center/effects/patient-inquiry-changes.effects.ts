import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientInquiryChangesActions } from '../actions/patient-inquiry-changes.action';

@Injectable({
    providedIn: 'root',
})
export class PatientInquiryChangesEffects {
    loadPatientInquiryChanges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.LoadInquiryChanges),
            switchMap(action =>
                this.apiService.getPatientInquiryChanges(action.patientId).pipe(
                    map(data => PatientInquiryChangesActions.LoadInquiryChangesSuccess({ data })),
                    catchError(error =>
                        of(PatientInquiryChangesActions.LoadInquiryChangesFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    addInquiryChanges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.AddinquiryChanges),
            switchMap(action =>
                this.apiService.saveInquiryChanges(action.inquirychanges).pipe(
                    map(inquirychanges => {
                        ToastConfig.ADD_SUCCESS();
                        return PatientInquiryChangesActions.AddinquiryChangesSuccess({ inquirychanges });
                    }),
                    catchError(error =>
                        of(PatientInquiryChangesActions.AddinquiryChangesFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    redirectPatientInquiryChanges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.AddinquiryChangesSuccess),
            map(action =>
                PatientInquiryChangesActions.Navigate({
                    commands: [window.history.back()],
                })
            )
        )
    );

    loadPatientSalesRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.LoadPatientSalesRep),
            switchMap(action =>
                this.apiService.getPatientSalesRep().pipe(
                    map(salesrep => PatientInquiryChangesActions.LoadPatientSalesRepSuccess({ salesrep })),
                    catchError(error =>
                        of(PatientInquiryChangesActions.LoadPatientSalesRepFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPatientInquiryChangesById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.LoadInquiryChangesId),
            switchMap(action =>
                this.apiService.getPatientInquiryChangesById(action.arHistoryId).pipe(
                    map(historyData => PatientInquiryChangesActions.LoadInquiryChangesIdSuccess({ historyData })),
                    catchError(error =>
                        of(PatientInquiryChangesActions.LoadInquiryChangesIdFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPrintStatusDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.PrintStatusDropDown),
            switchMap(action =>
                this.apiService.getPrintStatusDropdown().pipe(
                    map(printstatus => PatientInquiryChangesActions.PrintStatusDropDownSuccess({ printstatus })),
                    catchError(error =>
                        of(PatientInquiryChangesActions.PrintStatusDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadBillTypeDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.BillTypeDropdown),
            switchMap(action =>
                this.apiService.getARBillTypeDropdown().pipe(
                    map(billType => PatientInquiryChangesActions.BillTypeDropdownSuccess({ billType })),
                    catchError(error =>
                        of(PatientInquiryChangesActions.BillTypeDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );
    loadTranTypeDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.TranTypeDropdown),
            switchMap(action =>
                this.apiService.getTranTypeDropdown().pipe(
                    map(tranType => PatientInquiryChangesActions.TranTypeDropdownSuccess({ tranType })),
                    catchError(error =>
                        of(PatientInquiryChangesActions.TranTypeDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );
    loadClaimTypeDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.ClaimTypeDropdown),
            switchMap(action =>
                this.apiService.getClaimTypeDropdown().pipe(
                    map(claimType => PatientInquiryChangesActions.ClaimTypeDropdownSuccess({ claimType })),
                    catchError(error =>
                        of(PatientInquiryChangesActions.ClaimTypeDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPwkTypeDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.PwkTypeDropdown),
            switchMap(action =>
                this.apiService.getPwkTypeDropdown().pipe(
                    map(pwkType => PatientInquiryChangesActions.PwkTypeDropdownSuccess({ pwkType })),
                    catchError(error => of(PatientInquiryChangesActions.PwkTypeDropdownFailure({ error: error.error })))
                )
            )
        )
    );

    loadPwkMethodDropdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.PwkMethodDropdown),
            switchMap(action =>
                this.apiService.getPwkMethodDropdown().pipe(
                    map(pwkMethod => PatientInquiryChangesActions.PwkMethodDropdownSuccess({ pwkMethod })),
                    catchError(error =>
                        of(PatientInquiryChangesActions.PwkMethodDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadBillTo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.BillTo),
            switchMap(action =>
                this.apiService.getBillTO(action.patientId).pipe(
                    map(billTo => PatientInquiryChangesActions.BillToSuccess({ billTo })),
                    catchError(error => of(PatientInquiryChangesActions.BillToFailure({ error: error.error })))
                )
            )
        )
    );

    loadIcdCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.IcdCode),
            switchMap(action =>
                this.apiService.getIcdCode(action.patientId).pipe(
                    map(icdCode => PatientInquiryChangesActions.IcdCodeSuccess({ icdCode })),
                    catchError(error => of(PatientInquiryChangesActions.IcdCodeFailure({ error: error.error })))
                )
            )
        )
    );

    loadPhysician$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.Physician),
            switchMap(action =>
                this.apiService.getPhysician(action.patientId).pipe(
                    map(physician => PatientInquiryChangesActions.PhysicianSuccess({ physician })),
                    catchError(error => of(PatientInquiryChangesActions.PhysicianFailure({ error: error.error })))
                )
            )
        )
    );

    LoadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.LoadBranchDropDown),
            switchMap(action =>
                this.apiService.getBranchList().pipe(
                    map(branch => PatientInquiryChangesActions.LoadBranchDropDownSuccess({ branch })),
                    catchError(error =>
                        of(PatientInquiryChangesActions.LoadBranchDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    groupEditInquiryChanges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.EditGroupInquiryChanges),
            switchMap(action =>
                this.apiService.groupEditInquiryChanges(action.patientData).pipe(
                    map(data => {
                        ToastConfig.EDIT_SUCCESS();
                        return PatientInquiryChangesActions.EditGroupInquiryChangesSuccess();
                    }),
                    catchError(error =>
                        of(PatientInquiryChangesActions.EditGroupInquiryChangesFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientInquiryChangesActions.EditGroupInquiryChangesSuccess),
            map(() => PatientInquiryChangesActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
