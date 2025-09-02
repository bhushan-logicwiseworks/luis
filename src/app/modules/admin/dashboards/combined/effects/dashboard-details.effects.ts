import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashboardApiService } from 'app/core/services/dashboard-api.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DashboardDeatilsActions } from '../actions/project-details.action';

@Injectable({
    providedIn: 'root',
})
export class DashboardDetailsEffects {
    // COUNTER 1-1
    loadReordersConfirmedTodayByManufacturer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadReordersConfirmedTodayByManufacturer),
            switchMap(action =>
                this.dashboardApiService.getReordersConfirmedTodayByManufacturer().pipe(
                    map(ReordersConfirmedTodayByManufacturer =>
                        DashboardDeatilsActions.LoadReordersConfirmedTodayByManufacturerSuccess({
                            ReordersConfirmedTodayByManufacturer,
                        })
                    ),
                    catchError(error =>
                        of(
                            DashboardDeatilsActions.LoadReordersConfirmedTodayByManufacturerFailure({
                                error: error.error,
                            })
                        )
                    )
                )
            )
        )
    );

    // COUNTER 1-2
    loadReferarlsEnteredTodayByManufacturer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadReferarlsEnteredTodayByManufacturer),
            switchMap(action =>
                this.dashboardApiService.getReferarlsEnteredTodayByManufacturer().pipe(
                    map(ReferarlsEnteredTodayByManufacturer =>
                        DashboardDeatilsActions.LoadReferarlsEnteredTodayByManufacturerSuccess({
                            ReferarlsEnteredTodayByManufacturer,
                        })
                    ),
                    catchError(error =>
                        of(
                            DashboardDeatilsActions.LoadReferarlsEnteredTodayByManufacturerFailure({
                                error: error.error,
                            })
                        )
                    )
                )
            )
        )
    );

    // COUNTER 1-3
    loadDailyMenuVisits$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadDailyMenuVisits),
            switchMap(action =>
                this.dashboardApiService.getDailyMenuVisits().pipe(
                    map(DailyMenuVisits => DashboardDeatilsActions.LoadDailyMenuVisitsSuccess({ DailyMenuVisits })),
                    catchError(error => of(DashboardDeatilsActions.LoadDailyMenuVisitsFailure({ error: error.error })))
                )
            )
        )
    );

    // COUNTER 1-4
    loadNewCgmReferralShippedToday$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadNewCgmReferralsShippedToday),
            switchMap(action =>
                this.dashboardApiService.getNewCGMReferralsShippedToday().pipe(
                    map(NewCgmReferralShippedToday =>
                        DashboardDeatilsActions.LoadNewCgmReferralsShippedTodaySuccess({ NewCgmReferralShippedToday })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadNewCgmReferralsShippedTodayFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 1-5
    loadPendingCgmReferralsReconciled$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadPendingCgmReferralsReconciled),
            switchMap(action =>
                this.dashboardApiService.getPendingCGMPatientReferralsReconciled().pipe(
                    map(PendingCgmReferralsReconciled =>
                        DashboardDeatilsActions.LoadPendingCgmReferralsReconciledSuccess({
                            PendingCgmReferralsReconciled,
                        })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadPendingCgmReferralsReconciledFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 1-6
    loadDocManagementKpiData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadDocManagementKpi),
            switchMap(action =>
                this.dashboardApiService.getDocManagementKpi().pipe(
                    map(DocManagementKpi => DashboardDeatilsActions.LoadDocManagementKpiSuccess({ DocManagementKpi })),
                    catchError(error => of(DashboardDeatilsActions.LoadDocManagementKpiFailure({ error: error.error })))
                )
            )
        )
    );

    // COUNTER 2-1
    LoadTotalOrdersProcessedThisMonth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadTotalOrdersProcessedThisMonth),
            switchMap(action =>
                this.dashboardApiService.getTotalOrdersProcessedThisMonth().pipe(
                    map(TotalOrdersProcessedThisMonth =>
                        DashboardDeatilsActions.LoadTotalOrdersProcessedThisMonthSuccess({
                            TotalOrdersProcessedThisMonth,
                        })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadTotalOrdersProcessedThisMonthFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 2-1 *** THIS IS GOING AWAY
    loadReordersThisMonth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadReordersThisMonth),
            switchMap(action =>
                this.dashboardApiService.getReordersThisMonth().pipe(
                    map(ReordersThisMonth =>
                        DashboardDeatilsActions.LoadReordersThisMonthSuccess({ ReordersThisMonth })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadReordersThisMonthFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 2-2
    loadInvitationsThisMonth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadInvitationsThisMonth),
            switchMap(action =>
                this.dashboardApiService.getReorderInvitationsThisMonth().pipe(
                    map(InvitationsThisMonth =>
                        DashboardDeatilsActions.LoadInvitationsThisMonthSuccess({ InvitationsThisMonth })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadInvitationsThisMonthFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 2-2a NEW
    loadReordersThisMonthBreakdown$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadReordersThisMonthBreakdown),
            switchMap(action =>
                this.dashboardApiService.getReordersThisMonthBreakdown().pipe(
                    map(ReordersThisMonthBreakdown =>
                        DashboardDeatilsActions.LoadReordersThisMonthBreakdownSuccess({ ReordersThisMonthBreakdown })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadReordersThisMonthBreakdownFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 2-2B NEW
    loadReordersThisMonthCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadReordersThisMonthCategory),
            switchMap(action =>
                this.dashboardApiService.getReordersThisMonthCategory().pipe(
                    map(ReordersThisMonthCategory =>
                        DashboardDeatilsActions.LoadReordersThisMonthCategorySuccess({ ReordersThisMonthCategory })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadReordersThisMonthCategoryFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    //  COUNTER 2-2 NEW
    loadCgmOrdersProcessedThisMonth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadCgmOrdersProcessedThisMonth),
            switchMap(action =>
                this.dashboardApiService.getCGMOrdersProcessedThisMonth().pipe(
                    map(CgmOrdersProcessedThisMonth =>
                        DashboardDeatilsActions.LoadCgmOrdersProcessedThisMonthSuccess({ CgmOrdersProcessedThisMonth })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadCgmOrdersProcessedThisMonthFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 2-3
    loadBillingPerformance$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadBillingPerformance),
            switchMap(action =>
                this.dashboardApiService.getBillingPerformance().pipe(
                    map(BillingPerformance =>
                        DashboardDeatilsActions.LoadBillingPerformanceSuccess({ BillingPerformance })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadBillingPerformanceFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 2-4
    ReferarlsEnteredThisMondyByManufacturer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadReferarlsEnteredThisMondyByManufacturer),
            switchMap(action =>
                this.dashboardApiService.getReferarlsEnteredThisMondyByManufacturer().pipe(
                    map(ReferarlsEnteredThisMondyByManufacturer =>
                        DashboardDeatilsActions.LoadReferarlsEnteredThisMondyByManufacturerSuccess({
                            ReferarlsEnteredThisMondyByManufacturer,
                        })
                    ),
                    catchError(error =>
                        of(
                            DashboardDeatilsActions.LoadReferarlsEnteredThisMondyByManufacturerFailure({
                                error: error.error,
                            })
                        )
                    )
                )
            )
        )
    );

    // COUNTER 2-5
    loadReferarlsShippedThisMondyByManufacturer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadReferarlsShippedThisMondyByManufacturer),
            switchMap(action =>
                this.dashboardApiService.getReferarlsShippedThisMondyByManufacturer().pipe(
                    map(ReferarlsShippedThisMondyByManufacturer =>
                        DashboardDeatilsActions.LoadReferarlsShippedThisMondyByManufacturerSuccess({
                            ReferarlsShippedThisMondyByManufacturer,
                        })
                    ),
                    catchError(error =>
                        of(
                            DashboardDeatilsActions.LoadReferarlsShippedThisMondyByManufacturerFailure({
                                error: error.error,
                            })
                        )
                    )
                )
            )
        )
    );

    // COUNTER 2-6
    loadMonthlyMenuVisits$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadMonthlyMenuVisits),
            switchMap(action =>
                this.dashboardApiService.getMonthlyMenuVisits().pipe(
                    map(MonthlyMenuVisits =>
                        DashboardDeatilsActions.LoadMonthlyMenuVisitsSuccess({ MonthlyMenuVisits })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadMonthlyMenuVisitsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 2-7
    loadHollySmokesThisMonthData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadHollySmokesThisMonth),
            switchMap(action =>
                this.dashboardApiService.getHollySmokesThisMonth().pipe(
                    map(HollySmokesThisMonth =>
                        DashboardDeatilsActions.LoadHollySmokesThisMonthSuccess({ HollySmokesThisMonth })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadHollySmokesThisMonthFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 3-1
    loadCgmTotalActiveCgmPatientsThisYear$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadCgmTotalActiveCgmPatientsThisYear),
            switchMap(action =>
                this.dashboardApiService.getCGMTotalActivePatientsThisYear().pipe(
                    map(CgmTotalActiveCgmPatientsThisYear =>
                        DashboardDeatilsActions.LoadCgmTotalActiveCgmPatientsThisYearSuccess({
                            CgmTotalActiveCgmPatientsThisYear,
                        })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadCgmTotalActiveCgmPatientsThisYearFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 3-2
    loadActivecmnExpiration14Days$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadActivecmnExpiration14Days),
            switchMap(action =>
                this.dashboardApiService.getActiveCMNExpiration14Days().pipe(
                    map(ActivecmnExpiration14Days =>
                        DashboardDeatilsActions.LoadActivecmnExpiration14DaysSuccess({ ActivecmnExpiration14Days })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadActivecmnExpiration14DaysFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 3-3
    loadTotalPendingCgmReferrals$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadTotalPendingCgmReferrals),
            switchMap(action =>
                this.dashboardApiService.getTotalPendingCGMReferrals().pipe(
                    map(TotalPendingCgmReferrals =>
                        DashboardDeatilsActions.LoadTotalPendingCgmReferralsSuccess({ TotalPendingCgmReferrals })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadTotalPendingCgmReferralsFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 3-4
    loadAverageDaysFromReferralEntryToActiveStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadAverageDaysFromReferralEntryToActiveStatus),
            switchMap(action =>
                this.dashboardApiService.getAverageDaysFromReferralEntryToActiveStatus().pipe(
                    map(AverageDaysFromReferralEntryToActiveStatus =>
                        DashboardDeatilsActions.LoadAverageDaysFromReferralEntryToActiveStatusSuccess({
                            AverageDaysFromReferralEntryToActiveStatus,
                        })
                    ),
                    catchError(error =>
                        of(
                            DashboardDeatilsActions.LoadAverageDaysFromReferralEntryToActiveStatusFailure({
                                error: error.error,
                            })
                        )
                    )
                )
            )
        )
    );

    // COUNTER 3-5
    loadPercentCgmReferralSturnedinToActivePatients$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadPercentCgmReferralSturnedinToActivePatients),
            switchMap(action =>
                this.dashboardApiService.getPercentCGMReferralsTurnedIntoActivePatients().pipe(
                    map(PercentCgmReferralSturnedinToActivePatients =>
                        DashboardDeatilsActions.LoadPercentCgmReferralSturnedinToActivePatientsSuccess({
                            PercentCgmReferralSturnedinToActivePatients,
                        })
                    ),
                    catchError(error =>
                        of(
                            DashboardDeatilsActions.LoadPercentCgmReferralSturnedinToActivePatientsFailure({
                                error: error.error,
                            })
                        )
                    )
                )
            )
        )
    );

    // COUNTER 3-6
    loadPatientsUsingAnswersReorderPortal$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadPatientsUsingAnswersReorderPortal),
            switchMap(action =>
                this.dashboardApiService.getPatientsUsingReorderPortal().pipe(
                    map(PatientsUsingAnswersReorderPortal =>
                        DashboardDeatilsActions.LoadPatientsUsingAnswersReorderPortalSuccess({
                            PatientsUsingAnswersReorderPortal,
                        })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadPatientsUsingAnswersReorderPortalFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 3-7
    loadTotalRspAccounts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadTotalRspAccounts),
            switchMap(action =>
                this.dashboardApiService.getTotalRSPAccounts().pipe(
                    map(TotalRspAccounts => DashboardDeatilsActions.LoadTotalRspAccountsSuccess({ TotalRspAccounts })),
                    catchError(error => of(DashboardDeatilsActions.LoadTotalRspAccountsFailure({ error: error.error })))
                )
            )
        )
    );

    // COUNTER 3-8
    loadRetentionRate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadRetentionRate),
            switchMap(action =>
                this.dashboardApiService.getRetentionRate().pipe(
                    map(data => DashboardDeatilsActions.LoadRetentionRateSuccess({ data })),
                    catchError(error => of(DashboardDeatilsActions.LoadRetentionRateFailure({ error: error.error })))
                )
            )
        )
    );

    loadCgmAverageServiceLongevity$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadCgmAverageServiceLongevity),
            switchMap(action =>
                this.dashboardApiService.getCGMAverageServiceLongevity().pipe(
                    map(CgmPatientLongevityThisMonth =>
                        DashboardDeatilsActions.LoadCgmAverageServiceLongevitySuccess({ CgmPatientLongevityThisMonth })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadCgmAverageServiceLongevityFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    loadActivePatientLongevityThisMonth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadActivePatientLongevityThisMonth),
            switchMap(action =>
                this.dashboardApiService.getActivePatientLongevityThisMonth().pipe(
                    map(activePatientLongevityThisMonth =>
                        DashboardDeatilsActions.LoadActivePatientLongevityThisMonthSuccess({
                            activePatientLongevityThisMonth,
                        })
                    ),
                    catchError(error =>
                        of(DashboardDeatilsActions.LoadActivePatientLongevityThisMonthFailure({ error: error.error }))
                    )
                )
            )
        )
    );

    // COUNTER 4-1
    loadDashboardGoals$ = createEffect(() =>
        this.actions$.pipe(
            ofType(DashboardDeatilsActions.LoadDashboardGoals),
            switchMap(action =>
                this.dashboardApiService.getGoals().pipe(
                    map(Goals => DashboardDeatilsActions.LoadDashboardGoalsSuccess({ Goals })),
                    catchError(error => of(DashboardDeatilsActions.LoadDashboardGoalsFailure({ error: error.error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private dashboardApiService: DashboardApiService
    ) {}
}
