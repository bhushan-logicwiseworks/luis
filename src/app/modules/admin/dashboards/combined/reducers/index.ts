import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../../reducers';
import * as fromDashboard from '../reducers/dashboard-details.reducer';

export const featureKey = 'Dashboard';

export interface DashboardState {
    [fromDashboard.featureKey]: fromDashboard.State;
}

export interface State extends fromRoot.State {
    [featureKey]: DashboardState;
}
export function reducers(state: DashboardState | undefined, action: Action) {
    return combineReducers({
        [fromDashboard.featureKey]: fromDashboard.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, DashboardState>(featureKey);

/**
 * Dashboard Selectors
 */
export namespace DashboardSelectors {
    export const selectDashboardState = createSelector(selectState, state => state[fromDashboard.featureKey]);
    export const selectLoading = createSelector(selectDashboardState, fromDashboard.selectLoading);
    export const selectError = createSelector(selectDashboardState, fromDashboard.selectError);

    // COUNTER 1-1
    export const selectReordersConfirmedTodayByManufacturer = createSelector(
        selectDashboardState,
        fromDashboard.selectReordersConfirmedTodayByManufacturer
    );

    // COUNTER 1-2
    export const selectReferarlsEnteredTodayByManufacturer = createSelector(
        selectDashboardState,
        fromDashboard.selectReferarlsEnteredTodayByManufacturer
    );

    // COUNTER 1-3
    export const selectLoadDailyMenuVisits = createSelector(
        selectDashboardState,
        fromDashboard.selectLoadDailyMenuVisits
    );

    // COUNTER 1-4
    export const selectLoadNewCgmReferralsShippedToday = createSelector(
        selectDashboardState,
        fromDashboard.selectLoadNewCgmReferralsShippedToday
    );

    // COUNTER 1-5
    export const selectLoadPendingCgmReferralsReconciled = createSelector(
        selectDashboardState,
        fromDashboard.selectLoadPendingCgmReferralsReconciled
    );

    // COUNTER 1-6
    export const selectDocManagementKpi = createSelector(selectDashboardState, fromDashboard.selectDocManagementKpi);

    // COUNTER 2-1
    export const selectTotalOrdersProcessedThisMonth = createSelector(
        selectDashboardState,
        fromDashboard.selectTotalOrdersProcessedThisMonth
    );

    // COUNTER 2-2
    export const selectCgmOrdersProcessedThisMonth = createSelector(
        selectDashboardState,
        fromDashboard.selectCgmOrdersProcessedThisMonth
    );

    // COUNTER 2-1 *** THIS IS GOING AWAY
    export const selectReordersThisMonth = createSelector(selectDashboardState, fromDashboard.selectReordersThisMonth);

    // COUNTER 2-2
    export const selectInvitationsThisMonth = createSelector(
        selectDashboardState,
        fromDashboard.selectInvitationsThisMonth
    );

    // COUNTER 2-2a NEW
    export const selectReordersThisMonthBreakdown = createSelector(
        selectDashboardState,
        fromDashboard.selectReordersThisMonthBreakdown
    );

    // COUNTER 2-2b NEW
    export const selectReordersThisMonthCategory = createSelector(
        selectDashboardState,
        fromDashboard.selectReordersThisMonthCategory
    );

    // COUNTER 2-3
    export const selectBillingPerformance = createSelector(
        selectDashboardState,
        fromDashboard.selectBillingPerformance
    );

    // COUNTER 2-4
    export const selectReferarlsEnteredThisMondyByManufacturer = createSelector(
        selectDashboardState,
        fromDashboard.selectReferarlsEnteredThisMondyByManufacturer
    );

    // COUNTER 2-5
    export const selectReferarlsShippedThisMondyByManufacturer = createSelector(
        selectDashboardState,
        fromDashboard.selectReferarlsShippedThisMondyByManufacturer
    );

    // COUNTER 2-6
    export const selectMonthlyMenuVisits = createSelector(selectDashboardState, fromDashboard.selectMonthlyMenuVisits);

    // COUNTER 2-7
    export const selectHollySmokesThisMonth = createSelector(
        selectDashboardState,
        fromDashboard.selectHollySmokesThisMonth
    );

    // COUNTER 3-1
    export const selectCgmTotalActiveCgmPatientsThisYear = createSelector(
        selectDashboardState,
        fromDashboard.selectCgmTotalActiveCgmPatientsThisYear
    );

    // COUNTER 3-2
    export const selectActivecmnExpiration14Days = createSelector(
        selectDashboardState,
        fromDashboard.selectActivecmnExpiration14Days
    );

    // COUNTER 3-3
    export const selectTotalPendingCgmReferrals = createSelector(
        selectDashboardState,
        fromDashboard.selectTotalPendingCgmReferrals
    );

    // COUNTER 3-4
    export const selectAverageDaysFromReferralEntryToActiveStatus = createSelector(
        selectDashboardState,
        fromDashboard.selectAverageDaysFromReferralEntryToActiveStatus
    );

    // COUNTER 3-5
    export const selectPercentCgmReferralSturnedinToActivePatients = createSelector(
        selectDashboardState,
        fromDashboard.selectPercentCgmReferralSturnedinToActivePatients
    );

    // COUNTER 3-6
    export const selectPatientsUsingAnswersReorderPortal = createSelector(
        selectDashboardState,
        fromDashboard.selectPatientsUsingAnswersReorderPortal
    );

    // COUNTER 3-7
    export const selectTotalRspAccounts = createSelector(selectDashboardState, fromDashboard.selectTotalRspAccounts);

    // COUNTER 3-8
    export const selectRetentionRate = createSelector(selectDashboardState, fromDashboard.selectLoadRetentionRate);

    export const selectCgmPatientLongevityThisMonth = createSelector(
        selectDashboardState,
        fromDashboard.selectCgmPatientLongevityThisMonth
    );

    export const selectActivePatientLongevityThisMonth = createSelector(
        selectDashboardState,
        fromDashboard.selectActivePatientLongevityThisMonth
    );

    // COUNTER 4-1
    export const selectGoal = createSelector(selectDashboardState, fromDashboard.selectGoal);
}
