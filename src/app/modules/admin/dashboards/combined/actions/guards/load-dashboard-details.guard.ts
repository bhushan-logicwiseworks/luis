import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, take } from 'rxjs';
import { DashboardSelectors } from '../../reducers';

@Injectable()
export class LoadDashboardDetialsGuard implements CanActivate {
    loadDashboardDetail() {
        return this.store.select(DashboardSelectors.selectDashboardState).pipe(
            take(1),
            switchMap(state => {
                // // COUNTER 1-1
                // if (!state.ReordersConfirmedTodayByManufacturer.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadReordersConfirmedTodayByManufacturer())
                // }

                // // COUNTER 1-2
                // if (!state.ReferarlsEnteredTodayByManufacturer.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadReferarlsEnteredTodayByManufacturer())
                // }

                // // COUNTER 1-3
                // if (!state.DailyMenuVisits.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadDailyMenuVisits())
                // }

                // // COUNTER 1-4
                // if (!state.NewCgmReferralShippedToday.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadNewCgmReferralsShippedToday())
                // }

                // // COUNTER 1-5
                // if (!state.PendingCgmReferralsReconciled.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadPendingCgmReferralsReconciled())
                // }

                // // COUNTER 1-6
                // if (!state.DocManagementKpi.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadDocManagementKpi())
                // }

                // // COUNTER 2-1
                // if (!state.TotalOrdersProcessedThisMonth.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadTotalOrdersProcessedThisMonth())
                // }

                // // COUNTER 2-1 *** THIS IS GOING AWAY
                // if (!state.ReordersThisMonth.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadReordersThisMonth())
                // }

                // // COUNTER 2-2
                // if (!state.InvitationsThisMonth.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadInvitationsThisMonth())
                // }

                // // COUNTER 2-2a NEW
                // if (!state.ReordersThisMonthBreakdown.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadReordersThisMonthBreakdown())
                // }

                // // COUNTER 2-2b NEW
                // if (!state.ReordersThisMonthCategory.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadReordersThisMonthCategory())
                // }

                //  // COUNTER 2-2 NEW
                //  if (!state.InvitationsThisMonth.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadCgmOrdersProcessedThisMonth())
                // }

                // // COUNTER 2-3
                // if (!state.BillingPerformance.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadBillingPerformance())
                // }

                // // COUNTER 2-4
                // if (!state.ReferarlsEnteredThisMondyByManufacturer.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadReferarlsEnteredThisMondyByManufacturer())
                // }

                // // COUNTER 2-5
                // if (!state.ReferarlsShippedThisMondyByManufacturer.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadReferarlsShippedThisMondyByManufacturer())
                // }

                // // COUNTER 2-6
                // if (!state.MonthlyMenuVisits.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadMonthlyMenuVisits())
                // }

                // // COUNTER 2-7
                // if (!state.HollySmokesThisMonth.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadHollySmokesThisMonth())
                // }

                // // COUNTER 3-1
                // if (!state.CgmTotalActiveCgmPatientsThisYear.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadCgmTotalActiveCgmPatientsThisYear())
                // }

                // // COUNTER 3-2
                // if (!state.ActivecmnExpiration14Days.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadActivecmnExpiration14Days())
                // }

                // // COUNTER 3-3
                // if (!state.TotalPendingCgmReferrals.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadTotalPendingCgmReferrals())
                // }

                // // COUNTER 3-4
                // if (!state.AverageDaysFromReferralEntryToActiveStatus.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadAverageDaysFromReferralEntryToActiveStatus())
                // }

                // // COUNTER 3-5
                // if (!state.PercentCgmReferralSturnedinToActivePatients.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadPercentCgmReferralSturnedinToActivePatients())
                // }

                // // COUNTER 3-6
                // if (!state.PatientsUsingAnswersReorderPortal.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadPatientsUsingAnswersReorderPortal())
                // }

                // // COUNTER 3-7
                // if (!state.TotalRspAccounts.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadTotalRspAccounts())
                // }

                // // COUNTER 3-8
                // if (!state.retentionRate.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadRetentionRate())
                // }

                // if (!state.CgmPatientLongevityThisMonth.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadCgmAverageServiceLongevity())
                // }

                // if (!state.activePatientLongevityThisMonth.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadActivePatientLongevityThisMonth())
                // }

                // // COUNTER 4-1
                // if (!state.Goals.length) {
                //     this.store.dispatch(DashboardDeatilsActions.LoadDashboardGoals())
                // }

                return of(true);
            })
        );
    }
    constructor(private store: Store<any>) {}
    canActivate(): Observable<boolean> {
        // return our Observable stream from above
        return this.loadDashboardDetail().pipe(
            // if it was successful, we can return Observable.of(true)
            switchMap(() => {
                return of(true);
            })
        );
    }
}
