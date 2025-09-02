import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ApiService } from 'app/core/services/api.service';
import { AuxUtilService } from 'app/shared/aux-service/aux-utils.service';
import { TransFormDateValues } from 'app/shared/components/auxilium/work-order-details.enum';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Routes } from '../../../../core/config/route.paths';
import { ToastConfig } from '../../../../core/config/toast-config';
import { WorkOrderCenterIndividualActions } from '../actions/work-order-center-individual.actions';
import { WorkOrderCenterTableActions } from '../actions/work-order-center-table.actions';

@Injectable({
    providedIn: 'root',
})
export class WorkCenterIndividualEffects {
    loadWorkOrderById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.LoadWorkOrderDetails),
            switchMap(action =>
                this.apiService.getWorkOrderDetails(action.id).pipe(
                    map(workrep => this.auxUtilService.transformWorkOrderDates(workrep, TransFormDateValues)),
                    map(workrep => WorkOrderCenterIndividualActions.LoadWorkOrderDetailsSuccess({ workrep })),
                    catchError(error =>
                        of(WorkOrderCenterIndividualActions.LoadWorkOrderDetailsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPatientSalesRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.LoadworkSalesRep),
            switchMap(action =>
                this.apiService.getPatientSalesRep().pipe(
                    map(salesrep => WorkOrderCenterIndividualActions.LoadworkSalesRepSuccess({ salesrep })),
                    catchError(error =>
                        of(WorkOrderCenterIndividualActions.LoadworkSalesRepFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadBillType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.BillTypeDropdown),
            switchMap(action =>
                this.apiService.getARBillTypeDropdown().pipe(
                    map(billType => WorkOrderCenterIndividualActions.BillTypeDropdownSuccess({ billType })),
                    catchError(error =>
                        of(WorkOrderCenterIndividualActions.BillTypeDropdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    getItemCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.getItemCode),
            switchMap(action =>
                this.apiService.getItemCode(action.id).pipe(
                    map(itemcode => WorkOrderCenterIndividualActions.getItemCodeSuccess({ itemcode })),
                    catchError(error => of(WorkOrderCenterIndividualActions.getItemCodeFailure({ error: error.error })))
                )
            )
        )
    );

    addWorkRep$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.AddworkOrder),
            switchMap(action =>
                this.apiService.saveWorkOrder(action.workorder).pipe(
                    map(workorder => {
                        ToastConfig.ADD_SUCCESS();
                        return WorkOrderCenterIndividualActions.AddworkOrderSuccess({ workorder });
                    }),
                    catchError(error =>
                        of(WorkOrderCenterIndividualActions.AddworkOrderFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadPayorDetailsForWorkOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.LoadPayorDetails),
            switchMap(({ id }) => {
                // Ensure id is always an array
                // const ids = Array.isArray(id) ? id : [id];
                return this.apiService.getPayorDetailsForWorkOrder(id).pipe(
                    map(payorDetails =>
                        WorkOrderCenterIndividualActions.LoadPayorDetailsSuccess({ payorsDetail: payorDetails })
                    ),
                    catchError(error =>
                        of(WorkOrderCenterIndividualActions.LoadPayorDetailsFailure({ error: error.error }))
                    )
                );
            })
        )
    );

    redirectWorkOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.AddworkOrderSuccess),
            map(action =>
                WorkOrderCenterIndividualActions.Navigate({
                    commands: [window.history.back()],
                })
            )
        )
    );

    getReferCode$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.getReferCode),
            switchMap(action => {
                return this.apiService.getReferCode(action.id).pipe(
                    map(referCode => {
                        return WorkOrderCenterIndividualActions.getReferCodeSuccess({ referCode });
                    }),
                    catchError(error => {
                        return of(WorkOrderCenterIndividualActions.getReferCodeFailure({ error }));
                    })
                );
            })
        )
    );

    LoadBranches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.LoadBranchDropDown),
            switchMap(action =>
                this.apiService.getBranchList().pipe(
                    map(branch => WorkOrderCenterIndividualActions.LoadBranchDropDownSuccess({ branch })),
                    catchError(error =>
                        of(WorkOrderCenterIndividualActions.LoadBranchDropDownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    getBatchEligibility$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.FilterBatchEligibilityRecords),
            switchMap(action => {
                this.router.navigate([Routes.WORK_ORDER_CENTER.BatchEligibility], {
                    queryParams: {
                        startDate: action.startDate.toISOString(),
                        endDate: action.endDate.toISOString(),
                    },
                });
                // Always dispatch GetBatchEligibility, even if dates are the same
                return [
                    WorkOrderCenterIndividualActions.GetBatchEligibility({
                        startDate: action.startDate,
                        endDate: action.endDate,
                    }),
                ];
            })
        )
    );

    filterBatchEligibilityRecords$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.GetBatchEligibility),
            switchMap(action =>
                this.apiService.getBatchEligibility({ startDate: action.startDate, endDate: action.endDate }).pipe(
                    tap(() => {
                        this.router.navigate([Routes.WORK_ORDER_CENTER.BatchEligibility], {
                            queryParams: {
                                startDate: action.startDate.toISOString(),
                                endDate: action.endDate.toISOString(),
                            },
                        });
                    }),
                    map(eligibility => WorkOrderCenterIndividualActions.GetBatchEligibilitySuccess({ eligibility })),
                    catchError(error =>
                        of(WorkOrderCenterIndividualActions.GetBatchEligibilityFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    processBatchEligibility$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.ProcessBatchEligibility),
            switchMap(action =>
                this.apiService.processBatchEligibility(action.patientIds).pipe(
                    map(eligibility => {
                        ToastConfig.CUSTOM_SUCCESS('processBatchEligibilitySuccess');
                        return WorkOrderCenterIndividualActions.ProcessBatchEligibilitySuccess({ eligibility });
                    }),
                    catchError(error => {
                        ToastConfig.CUSTOM_FAILURE('processBatchEligibilityError');

                        return of(
                            WorkOrderCenterIndividualActions.ProcessBatchEligibilityFailure({ error: error.error })
                        );
                    })
                )
            )
        )
    );

    processBatchEligibilitySuccessEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(WorkOrderCenterIndividualActions.ProcessBatchEligibilitySuccess),
            switchMap(() => [
                WorkOrderCenterTableActions.LoadWorkReps({ filter: 'epo' }),
                WorkOrderCenterTableActions.LoadWorkReps({ filter: 'eposent' }),
                WorkOrderCenterTableActions.LoadWorkReps({ filter: 'mblines' }),
                WorkOrderCenterTableActions.LoadWorkReps({ filter: 'pblines' }),
                WorkOrderCenterTableActions.LoadWorkReps({ filter: 'pylines' }),
                WorkOrderCenterTableActions.LoadWorkReps({ filter: 'pypast' }),
                WorkOrderCenterTableActions.LoadWorkReps({ filter: 'monthlymarker' }),
                WorkOrderCenterTableActions.LoadWorkReps({ filter: 'datevariants' }),
                WorkOrderCenterTableActions.LoadWorkReps({ filter: 'authexpiring' }),
            ]),
            catchError(error =>
                of(
                    WorkOrderCenterTableActions.LoadWorkReps({ filter: 'epo' }),
                    WorkOrderCenterTableActions.LoadWorkReps({ filter: 'eposent' }),
                    WorkOrderCenterTableActions.LoadWorkReps({ filter: 'mblines' }),
                    WorkOrderCenterTableActions.LoadWorkReps({ filter: 'pblines' }),
                    WorkOrderCenterTableActions.LoadWorkReps({ filter: 'pylines' }),
                    WorkOrderCenterTableActions.LoadWorkReps({ filter: 'pypast' }),
                    WorkOrderCenterTableActions.LoadWorkReps({ filter: 'monthlymarker' }),
                    WorkOrderCenterTableActions.LoadWorkReps({ filter: 'datevariants' }),
                    WorkOrderCenterTableActions.LoadWorkReps({ filter: 'authexpiring' })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private auxUtilService: AuxUtilService,
        private router: Router,
        private store: Store
    ) {}
}
