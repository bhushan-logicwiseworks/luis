import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'app/core/services/api.service';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { ToastConfig } from '../../../../core/config/toast-config';
import { BillCenterTableActions } from '../actions/bill-center-table.action';

@Injectable({
    providedIn: 'root',
})
export class BillCenterTableEffects {
    loadchargeReps$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.LoadChargesReadyForClaims),
            switchMap(action =>
                this.apiService.getChargesReadyForClaims().pipe(
                    map(charges => BillCenterTableActions.LoadChargesReadyForClaimsSuccess({ charges })),
                    catchError(error =>
                        of(BillCenterTableActions.LoadChargesReadyForClaimsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // post confirmed Work Order
    postConirmedWorkEdit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.PostConfirmedWorkOrder),
            switchMap(action =>
                this.apiService.postconfirmedworkorder(action.patientData).pipe(
                    map(data => {
                        ToastConfig.ADD_SUCCESS();
                        return BillCenterTableActions.PostConfirmedWorkOrderSuccess();
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(BillCenterTableActions.PostConfirmedWorkOrderFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    // Createclaimsfromcharges
    Createclaimsfromcharges$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.Createclaimsfromcharges),
            switchMap(action =>
                this.apiService.createclaimsfromcharges(action.patientData).pipe(
                    map(data => {
                        ToastConfig.ADD_SUCCESS();
                        return BillCenterTableActions.CreateclaimsfromchargesSuccess();
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(BillCenterTableActions.CreateclaimsfromchargesFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    // Get Claims Ready for Validation
    getclaimsreadyforvalidation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.LoadClaimsReadyForValidation),
            switchMap(action =>
                this.apiService.getclaimsreadyforvalidation().pipe(
                    map(validation => BillCenterTableActions.LoadClaimsReadyForValidationSuccess({ validation })),
                    catchError(error =>
                        of(BillCenterTableActions.LoadClaimsReadyForValidationFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    prepareClaimsForValidation$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.PrepareClaimsForValidation),
            switchMap(action =>
                this.apiService.prepareClaimsForValidation().pipe(
                    tap(() => {
                        ToastConfig.ADD_SUCCESS();
                        this.router.navigateByUrl(`/centers/bill-center/validation-readyfor-claims`);
                    }),
                    map(validation => BillCenterTableActions.PrepareClaimsForValidationSuccess({ validation })),
                    catchError(error =>
                        of(BillCenterTableActions.PrepareClaimsForValidationFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // CreateClaimsFromValidations
    CreateClaimsFromValidations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.CreateClaimsFromValidations),
            switchMap(action =>
                this.apiService.createClaimsFromValidations(action.patientData).pipe(
                    map(data => {
                        ToastConfig.ADD_SUCCESS();
                        return BillCenterTableActions.CreateClaimsFromValidationsSuccess();
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(BillCenterTableActions.CreateClaimsFromValidationsFailure({ error: error.error }));
                    })
                )
            )
        )
    );

    // Load Held Items Report
    loadHeldItemsReportReps$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.LoadHeldItemsReport),
            switchMap(action =>
                this.apiService.getHeldItemsReport().pipe(
                    map(heldItemsReport => BillCenterTableActions.LoadHeldItemsReportSuccess({ heldItemsReport })),
                    catchError(error => of(BillCenterTableActions.LoadHeldItemsReportFailure({ error: error.error })))
                )
            )
        )
    );

    // Load Held Item Details
    loadHeldItemDetails$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.LoadHeldItemDetails),
            switchMap(action =>
                this.apiService.getHeldItemDetails(action.claimId).pipe(
                    map(heldItemDetails => BillCenterTableActions.LoadHeldItemDetailsSuccess({ heldItemDetails })),
                    catchError(error => of(BillCenterTableActions.LoadHeldItemDetailsFailure({ error: error.error })))
                )
            )
        )
    );

    // confirmed Work Order
    loadClaimsFor837$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.LoadClaimFor837),
            switchMap(action =>
                this.apiService.getListForClaimsFor837().pipe(
                    map(claimsFor837 => BillCenterTableActions.LoadClaimFor837Success({ claimsFor837: claimsFor837 })),
                    catchError(error => of(BillCenterTableActions.LoadClaimFor837Failure({ error: error.error })))
                )
            )
        )
    );

    // Createclaimsfromcharges
    generateClaimFileFor837$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.CreateClaimsFileFor837),
            exhaustMap(action =>
                this.apiService.createClaimsFileFor837().pipe(
                    map(data => {
                        ToastConfig.ADD_SUCCESS();
                        return BillCenterTableActions.CreateClaimsFileFor837Success();
                    }),
                    catchError(error => {
                        ToastConfig.ADD_FAILURE();
                        return of(BillCenterTableActions.CreateClaimsFileFor837Failure({ error: error.error }));
                    })
                )
            )
        )
    );

    // New effects for Dashboard

    loadDashboardWorkOrdersAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.loadDashBoardWorkOrdersAll),
            switchMap(action =>
                this.apiService.getBillDashboard('workordersall').pipe(
                    map(dashboardWorkOrdersAll =>
                        BillCenterTableActions.loadDashBoardWorkOrdersAllSuccess({ dashboardWorkOrdersAll })
                    ),
                    catchError(error =>
                        of(BillCenterTableActions.loadDashBoardWorkOrdersAllFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadDashboardWorkOrdersWithPOD$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.loadDashBoardWorkOrdersWithPOD),
            switchMap(action =>
                this.apiService.getBillDashboard('workorderswithpod').pipe(
                    map(dashboardWorkOrdersWithPOD =>
                        BillCenterTableActions.loadDashBoardWorkOrdersWithPODSuccess({ dashboardWorkOrdersWithPOD })
                    ),
                    catchError(error =>
                        of(BillCenterTableActions.loadDashBoardWorkOrdersWithPODFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadDashboardWorkOrdersWithoutPOD$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.loadDashBoardWorkOrdersWithoutPOD),
            switchMap(action =>
                this.apiService.getBillDashboard('workorderswithoutpod').pipe(
                    map(dashboardWorkOrdersWithoutPOD =>
                        BillCenterTableActions.loadDashBoardWorkOrdersWithoutPODSuccess({
                            dashboardWorkOrdersWithoutPOD,
                        })
                    ),
                    catchError(error =>
                        of(BillCenterTableActions.loadDashBoardWorkOrdersWithoutPODFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // New effects for work orders
    loadWorkOrdersAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.LoadWorkOrdersAll),
            switchMap(action =>
                this.apiService.getBillCenterWorkOrders('workordersall').pipe(
                    map(workOrders => BillCenterTableActions.LoadWorkOrdersAllSuccess({ workOrders: workOrders })),
                    catchError(error => of(BillCenterTableActions.LoadWorkOrdersAllFailure({ error: error.error })))
                )
            )
        )
    );

    loadWorkOrdersWithPOD$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.LoadWorkOrdersWithPOD),
            switchMap(action =>
                this.apiService.getBillCenterWorkOrders('workorderswithpod').pipe(
                    map(workOrders => BillCenterTableActions.LoadWorkOrdersWithPODSuccess({ workOrders: workOrders })),
                    catchError(error => of(BillCenterTableActions.LoadWorkOrdersWithPODFailure({ error: error.error })))
                )
            )
        )
    );

    loadWorkOrdersWithoutPOD$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.LoadWorkOrdersWithoutPOD),
            switchMap(action =>
                this.apiService.getBillCenterWorkOrders('workorderswithoutpod').pipe(
                    map(workOrders =>
                        BillCenterTableActions.LoadWorkOrdersWithoutPODSuccess({ workOrders: workOrders })
                    ),
                    catchError(error =>
                        of(BillCenterTableActions.LoadWorkOrdersWithoutPODFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadAgingReport$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.LoadAgingReport),
            switchMap(action =>
                this.apiService.getAgingReports().pipe(
                    map(aginReports => BillCenterTableActions.LoadAgingReportSuccess({ aginReports })),
                    catchError(error => of(BillCenterTableActions.LoadAgingReportFailure({ error: error.error })))
                )
            )
        )
    );

    postConfirmedWorkOrderSuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BillCenterTableActions.PostConfirmedWorkOrderSuccess),
            switchMap(() => [
                BillCenterTableActions.LoadWorkOrdersAll(),
                BillCenterTableActions.LoadWorkOrdersWithPOD(),
                BillCenterTableActions.LoadWorkOrdersWithoutPOD(),
                BillCenterTableActions.loadDashBoardWorkOrdersAll(),
                BillCenterTableActions.loadDashBoardWorkOrdersWithPOD(),
                BillCenterTableActions.loadDashBoardWorkOrdersWithoutPOD(),
            ]),
            catchError(error =>
                of(
                    BillCenterTableActions.LoadWorkOrdersAll(),
                    BillCenterTableActions.LoadWorkOrdersWithPOD(),
                    BillCenterTableActions.LoadWorkOrdersWithoutPOD(),
                    BillCenterTableActions.loadDashBoardWorkOrdersAll(),
                    BillCenterTableActions.loadDashBoardWorkOrdersWithPOD(),
                    BillCenterTableActions.loadDashBoardWorkOrdersWithoutPOD()
                )
            )
        )
    );
    refresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(
                BillCenterTableActions.PostConfirmedWorkOrderSuccess,
                BillCenterTableActions.PostConfirmedWorkOrderFailure,
                BillCenterTableActions.CreateclaimsfromchargesSuccess,
                BillCenterTableActions.CreateclaimsfromchargesFailure,
                BillCenterTableActions.CreateClaimsFromValidationsSuccess,
                BillCenterTableActions.CreateClaimsFromValidationsFailure,
                BillCenterTableActions.CreateClaimsFileFor837Success,
                BillCenterTableActions.CreateClaimsFileFor837Failure
            ),
            map(() => BillCenterTableActions.Refresh())
        )
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private apiService: ApiService
    ) {}
}
