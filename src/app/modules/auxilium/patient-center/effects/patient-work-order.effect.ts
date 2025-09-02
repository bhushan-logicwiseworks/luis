import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { PatientWorkOrderActions } from '../actions/patient-work-order.action';

@Injectable({
    providedIn: 'root',
})
export class PatientWorkOrderEffects {
    // Load Work Order
    loadWorkOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientWorkOrderActions.LoadWorkOrder),
            switchMap(action =>
                this.apiService.getPatientWorkOrders(action.patientId).pipe(
                    map(data => PatientWorkOrderActions.LoadWorkOrderSuccess({ data })),
                    catchError(error => of(PatientWorkOrderActions.LoadWorkOrderFailure({ error: error.error })))
                )
            )
        )
    );

    // Group Edit
    groupEdit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientWorkOrderActions.EditGroupWorkEdit),
            switchMap(action =>
                this.apiService.groupEdit(action.patientData).pipe(
                    map(data => {
                        ToastConfig.EDIT_SUCCESS();
                        return PatientWorkOrderActions.EditGroupWorkEditSuccess();
                    }),
                    catchError(error => of(PatientWorkOrderActions.EditGroupWorkEditFailure({ error: error.error })))
                )
            )
        )
    );

    // Edit Group Work Order
    shipworkorderEdit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientWorkOrderActions.ShipWorkOrder),
            switchMap(action =>
                this.apiService.getShipWorkOrder(action.patientData).pipe(
                    map(data => {
                        ToastConfig.EDIT_SUCCESS();
                        return PatientWorkOrderActions.ShipWorkOrderSuccess({ data });
                    }),
                    catchError(error => of(PatientWorkOrderActions.ShipWorkOrderFailure({ error: error.error })))
                )
            )
        )
    );

    saveSelectedProcessShortcut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientWorkOrderActions.SaveSelectedProcessShortcut),
            switchMap(action =>
                this.apiService.addProcessShortcut(action.id, action.patientId).pipe(
                    map(patient => {
                        ToastConfig.ADD_SUCCESS();
                        return PatientWorkOrderActions.SaveSelectedProcessShortcutSuccess();
                    }),
                    catchError(error =>
                        of(PatientWorkOrderActions.SaveSelectedProcessShortcutFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    LoadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientWorkOrderActions.LoadBranchDropDown),
            switchMap(action =>
                this.apiService.getBranchList().pipe(
                    map(branch => PatientWorkOrderActions.LoadBranchDropDownSuccess({ branch })),
                    catchError(error => of(PatientWorkOrderActions.LoadBranchDropDownFailure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) {}
}
