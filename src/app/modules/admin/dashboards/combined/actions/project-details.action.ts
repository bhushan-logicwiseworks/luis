import { createAction, props } from '@ngrx/store';
import { ActiveCMGPatientLongevityDisplay } from 'app/shared/interfaces/auxilium/dashboard/dashboard.interface';

const ResetState = createAction('[Dashboard Details/API] Reset Dashboard Details State');
const Refresh = createAction('[Dashboard Deatils/API] Refresh');

// COUNTER 1-1
const LoadReordersConfirmedTodayByManufacturer = createAction(
    '[Dashboard DETAILS/API] Reorders Confirmed Today By Manufacturer'
);
const LoadReordersConfirmedTodayByManufacturerSuccess = createAction(
    '[Dashboard DETAILS/API] Reorders Confirmed Today By Manufacturer Success',
    props<{ ReordersConfirmedTodayByManufacturer: any }>()
);
const LoadReordersConfirmedTodayByManufacturerFailure = createAction(
    '[Dashboard DETAILS/API] Reorders Confirmed Today By Manufacturer Failure',
    props<{ error: Error }>()
);

// COUNTER 1-2
const LoadReferarlsEnteredTodayByManufacturer = createAction(
    '[Dashboard DETAILS/API] Referarls Entered Today By Manufacturer'
);
const LoadReferarlsEnteredTodayByManufacturerSuccess = createAction(
    '[Dashboard DETAILS/API] Referarls Entered Today By Manufacturer Success',
    props<{ ReferarlsEnteredTodayByManufacturer: any }>()
);
const LoadReferarlsEnteredTodayByManufacturerFailure = createAction(
    '[Dashboard DETAILS/API] Referarls Entered Today By Manufacturer Failure',
    props<{ error: Error }>()
);

// COUNTER 1-3
const LoadDailyMenuVisits = createAction('[Dashboard DETAILS/API] Daily Menu Visits');
const LoadDailyMenuVisitsSuccess = createAction(
    '[Dashboard DETAILS/API] Daily Menu Visits Success',
    props<{ DailyMenuVisits: any }>()
);
const LoadDailyMenuVisitsFailure = createAction(
    '[Dashboard DETAILS/API] Daily Menu Visits Failure',
    props<{ error: Error }>()
);

// COUNTER 1-4
const LoadNewCgmReferralsShippedToday = createAction('[Dashboard DETAILS/API] New Cgm Referral Shipped Today');
const LoadNewCgmReferralsShippedTodaySuccess = createAction(
    '[Dashboard DETAILS/API] New Cgm Referral Shipped Today Success',
    props<{ NewCgmReferralShippedToday: any }>()
);
const LoadNewCgmReferralsShippedTodayFailure = createAction(
    '[Dashboard DETAILS/API] New Cgm Referral Shipped Today Failure',
    props<{ error: Error }>()
);

// COUNTER 1-5
const LoadPendingCgmReferralsReconciled = createAction('[Dashboard DETAILS/API] Pending Cgm Referral Reconciled');
const LoadPendingCgmReferralsReconciledSuccess = createAction(
    '[Dashboard DETAILS/API] Pending Cgm Referral Reconciled Success',
    props<{ PendingCgmReferralsReconciled: any }>()
);
const LoadPendingCgmReferralsReconciledFailure = createAction(
    '[Dashboard DETAILS/API] Pending Cgm Referral Reconciled Failure',
    props<{ error: Error }>()
);

// COUNTER 1-6
const LoadDocManagementKpi = createAction('[Dashboard DETAILS/API] Doc Management');
const LoadDocManagementKpiSuccess = createAction(
    '[Dashboard DETAILS/API] Doc Management Success',
    props<{ DocManagementKpi: any }>()
);
const LoadDocManagementKpiFailure = createAction(
    '[Dashboard DETAILS/API] Doc Management Failure',
    props<{ error: Error }>()
);

// COUNTER 2-1
const LoadTotalOrdersProcessedThisMonth = createAction('[Dashboard DETAILS/API] Load Total Orders This Month');
const LoadTotalOrdersProcessedThisMonthSuccess = createAction(
    '[Dashboard DETAILS/API] Load Total Orders This Month Success',
    props<{ TotalOrdersProcessedThisMonth: any }>()
);
const LoadTotalOrdersProcessedThisMonthFailure = createAction(
    '[Dashboard DETAILS/API] Load Total Orders This Month Failure',
    props<{ error: Error }>()
);

// COUNTER 2-1 *** THIS IS GOING AWAY
const LoadReordersThisMonth = createAction('[Dashboard DETAILS/API] Reorders This Month');
const LoadReordersThisMonthSuccess = createAction(
    '[Dashboard DETAILS/API] Reorders This Month Success',
    props<{ ReordersThisMonth: any }>()
);
const LoadReordersThisMonthFailure = createAction(
    '[Dashboard DETAILS/API] Reorders This Month Failure',
    props<{ error: Error }>()
);

// COUNTER 2-2
const LoadInvitationsThisMonth = createAction('[Dashboard DETAILS/API] Invitations This Month');
const LoadInvitationsThisMonthSuccess = createAction(
    '[Dashboard DETAILS/API] Invitations This Month Success',
    props<{ InvitationsThisMonth: any }>()
);
const LoadInvitationsThisMonthFailure = createAction(
    '[Dashboard DETAILS/API] Invitations This Month Failure',
    props<{ error: Error }>()
);

// COUNTER 2-1a NEW
const LoadReordersThisMonthBreakdown = createAction('[Dashboard DETAILS/API] Reorders This Month Breakdown');
const LoadReordersThisMonthBreakdownSuccess = createAction(
    '[Dashboard DETAILS/API] Reorders This Month Success Breakdown',
    props<{ ReordersThisMonthBreakdown: any }>()
);
const LoadReordersThisMonthBreakdownFailure = createAction(
    '[Dashboard DETAILS/API] Reorders This Month Failure Breakdown',
    props<{ error: Error }>()
);

// COUNTER 2-1a NEW
const LoadReordersThisMonthCategory = createAction('[Dashboard DETAILS/API] Reorders This Month Category');
const LoadReordersThisMonthCategorySuccess = createAction(
    '[Dashboard DETAILS/API] Reorders This Month Success Category',
    props<{ ReordersThisMonthCategory: any }>()
);
const LoadReordersThisMonthCategoryFailure = createAction(
    '[Dashboard DETAILS/API] Reorders This Month Failure Category',
    props<{ error: Error }>()
);

// COUNTER 2-3
const LoadBillingPerformance = createAction('[Dashboard DETAILS/API] Billing Performance');
const LoadBillingPerformanceSuccess = createAction(
    '[Dashboard DETAILS/API] Billing Performance Success',
    props<{ BillingPerformance: any }>()
);
const LoadBillingPerformanceFailure = createAction(
    '[Dashboard DETAILS/API] Billing Performance Failure',
    props<{ error: Error }>()
);

// COUNTER 2-4
const LoadReferarlsEnteredThisMondyByManufacturer = createAction(
    '[Dashboard DETAILS/API] Referarls Entered This Month By Manufacturer'
);
const LoadReferarlsEnteredThisMondyByManufacturerSuccess = createAction(
    '[Dashboard DETAILS/API] Referarls Entered This Month By Manufacturer Success',
    props<{ ReferarlsEnteredThisMondyByManufacturer: any }>()
);
const LoadReferarlsEnteredThisMondyByManufacturerFailure = createAction(
    '[Dashboard DETAILS/API] Referarls Entered This Month By Manufacturer Failure',
    props<{ error: Error }>()
);

// COUNTER 2-5
const LoadReferarlsShippedThisMondyByManufacturer = createAction(
    '[Dashboard DETAILS/API] Referarls Shipped This Month By Manufacturer'
);
const LoadReferarlsShippedThisMondyByManufacturerSuccess = createAction(
    '[Dashboard DETAILS/API] Referarls Shipped This Month By Manufacturer Success',
    props<{ ReferarlsShippedThisMondyByManufacturer: any }>()
);
const LoadReferarlsShippedThisMondyByManufacturerFailure = createAction(
    '[Dashboard DETAILS/API] Referarls Shipped This Month By Manufacturer Failure',
    props<{ error: Error }>()
);

// COUNTER 2-6
const LoadMonthlyMenuVisits = createAction('[Dashboard DETAILS/API] Load Monthly Menu Visits');
const LoadMonthlyMenuVisitsSuccess = createAction(
    '[Dashboard DETAILS/API] Load Monthly Menu Visits Success',
    props<{ MonthlyMenuVisits: any }>()
);
const LoadMonthlyMenuVisitsFailure = createAction(
    '[Dashboard DETAILS/API] Load Monthly Menu Visits Failure',
    props<{ error: Error }>()
);

// COUNTER 2-7
const LoadHollySmokesThisMonth = createAction('[Dashboard DETAILS/API] Holly Smokes This Month');
const LoadHollySmokesThisMonthSuccess = createAction(
    '[Dashboard DETAILS/API] Holly Smokes This Month Success',
    props<{ HollySmokesThisMonth: any }>()
);
const LoadHollySmokesThisMonthFailure = createAction(
    '[Dashboard DETAILS/API] Holly Smokes This Month Failure',
    props<{ error: Error }>()
);

// COUNTER 3-1
const LoadCgmTotalActiveCgmPatientsThisYear = createAction(
    '[Dashboard DETAILS/API] Cgm Total Active Cgm Patients This Year'
);
const LoadCgmTotalActiveCgmPatientsThisYearSuccess = createAction(
    '[Dashboard DETAILS/API] Cgm Total Active Cgm Patients This Year Success',
    props<{ CgmTotalActiveCgmPatientsThisYear: any }>()
);
const LoadCgmTotalActiveCgmPatientsThisYearFailure = createAction(
    '[Dashboard DETAILS/API] Cgm Total Active Cgm Patients This Year Failure',
    props<{ error: Error }>()
);

// COUNTER 3-2
const LoadActivecmnExpiration14Days = createAction('[Dashboard DETAILS/API] Active Cmn Expiration 14 Days');
const LoadActivecmnExpiration14DaysSuccess = createAction(
    '[Dashboard DETAILS/API] Active Cmn Expiration 14 Days Success',
    props<{ ActivecmnExpiration14Days: any }>()
);
const LoadActivecmnExpiration14DaysFailure = createAction(
    '[Dashboard DETAILS/API] Active Cmn Expiration 14 Days Failure',
    props<{ error: Error }>()
);

// COUNTER 3-3
const LoadTotalPendingCgmReferrals = createAction('[Dashboard DETAILS/API] Total Pending Cgm Referrals');
const LoadTotalPendingCgmReferralsSuccess = createAction(
    '[Dashboard DETAILS/API] Total Pending Cgm Referrals Success',
    props<{ TotalPendingCgmReferrals: any }>()
);
const LoadTotalPendingCgmReferralsFailure = createAction(
    '[Dashboard DETAILS/API] Total Pending Cgm Referrals Failure',
    props<{ error: Error }>()
);

// COUNTER 3-4
const LoadAverageDaysFromReferralEntryToActiveStatus = createAction(
    '[Dashboard DETAILS/API] Average Days From Referral Entry To Active Status'
);
const LoadAverageDaysFromReferralEntryToActiveStatusSuccess = createAction(
    '[Dashboard DETAILS/API] Average Days From Referral Entry To Active Status Success',
    props<{ AverageDaysFromReferralEntryToActiveStatus: any }>()
);
const LoadAverageDaysFromReferralEntryToActiveStatusFailure = createAction(
    '[Dashboard DETAILS/API] Average Days From Referral Entry To Active Status Failure',
    props<{ error: Error }>()
);

// COUNTER 3-5
const LoadPercentCgmReferralSturnedinToActivePatients = createAction(
    '[Dashboard DETAILS/API] Percent Cgm Referral Sturnedin To Active Patients'
);
const LoadPercentCgmReferralSturnedinToActivePatientsSuccess = createAction(
    '[Dashboard DETAILS/API] Percent Cgm Referral Sturnedin To Active Patients Success',
    props<{ PercentCgmReferralSturnedinToActivePatients: any }>()
);
const LoadPercentCgmReferralSturnedinToActivePatientsFailure = createAction(
    '[Dashboard DETAILS/API] Percent Cgm Referral Sturnedin To Active Patients Failure',
    props<{ error: Error }>()
);

// COUNTER 3-6
const LoadPatientsUsingAnswersReorderPortal = createAction(
    '[Dashboard DETAILS/API] Patients Using Answers Reorder Portal'
);
const LoadPatientsUsingAnswersReorderPortalSuccess = createAction(
    '[Dashboard DETAILS/API] Patients Using Answers Reorder Portal Success',
    props<{ PatientsUsingAnswersReorderPortal: any }>()
);
const LoadPatientsUsingAnswersReorderPortalFailure = createAction(
    '[Dashboard DETAILS/API] Patients Using Answers Reorder Portal Failure',
    props<{ error: Error }>()
);

// COUNTER 3-7
const LoadTotalRspAccounts = createAction('[Dashboard DETAILS/API] Total Rsp Accounts');
const LoadTotalRspAccountsSuccess = createAction(
    '[Dashboard DETAILS/API] Total Rsp Accounts Success',
    props<{ TotalRspAccounts: any }>()
);
const LoadTotalRspAccountsFailure = createAction(
    '[Dashboard DETAILS/API] Total Rsp Accounts Failure',
    props<{ error: Error }>()
);

// COUNTER 3-8
const LoadRetentionRate = createAction('[Dashboard DETAILS/API] Retention Rate');
const LoadRetentionRateSuccess = createAction('[Dashboard DETAILS/API] Retention Rate Success', props<{ data: any }>());
const LoadRetentionRateFailure = createAction(
    '[Dashboard DETAILS/API] Retention Rate Failure',
    props<{ error: Error }>()
);

const LoadCgmOrdersProcessedThisMonth = createAction('[Dashboard DETAILS/API] New Cgm Order Processed This Month');
const LoadCgmOrdersProcessedThisMonthSuccess = createAction(
    '[Dashboard DETAILS/API] New Cgm Order Processed This Month Success',
    props<{ CgmOrdersProcessedThisMonth: any }>()
);
const LoadCgmOrdersProcessedThisMonthFailure = createAction(
    '[Dashboard DETAILS/API] New Cgm Order Processed This Month Failure',
    props<{ error: Error }>()
);

const LoadCgmAverageServiceLongevity = createAction('[Dashboard DETAILS/API] Cgm Average Service Longevity');
const LoadCgmAverageServiceLongevitySuccess = createAction(
    '[Dashboard DETAILS/API] Cgm Average Service Longevity Success',
    props<{ CgmPatientLongevityThisMonth: ActiveCMGPatientLongevityDisplay[] }>()
);
const LoadCgmAverageServiceLongevityFailure = createAction(
    '[Dashboard DETAILS/API] Cgm Average Service Longevity Failure',
    props<{ error: Error }>()
);

const LoadActivePatientLongevityThisMonth = createAction(
    '[Dashboard DETAILS/API] New Active Patient Longevity This Month'
);
const LoadActivePatientLongevityThisMonthSuccess = createAction(
    '[Dashboard DETAILS/API] New Active Patient Longevity This Month Success',
    props<{ activePatientLongevityThisMonth: ActiveCMGPatientLongevityDisplay[] }>()
);
const LoadActivePatientLongevityThisMonthFailure = createAction(
    '[Dashboard DETAILS/API] New Active Patient Longevity This Month Failure',
    props<{ error: Error }>()
);

// COUNTER 4-1
const LoadDashboardGoals = createAction('[Dashboard GOALS/API]');
const LoadDashboardGoalsSuccess = createAction('[Dashboard GOALS/API] Success', props<{ Goals: any }>());
const LoadDashboardGoalsFailure = createAction('[Dashboard GOALS/API] Failure', props<{ error: Error }>());

export const DashboardDeatilsActions = {
    Refresh,
    ResetState,

    // COUNTER 1-1
    LoadReordersConfirmedTodayByManufacturer,
    LoadReordersConfirmedTodayByManufacturerSuccess,
    LoadReordersConfirmedTodayByManufacturerFailure,

    // COUNTER 1-2
    LoadReferarlsEnteredTodayByManufacturer,
    LoadReferarlsEnteredTodayByManufacturerSuccess,
    LoadReferarlsEnteredTodayByManufacturerFailure,

    // COUNTER 1-3
    LoadDailyMenuVisits,
    LoadDailyMenuVisitsSuccess,
    LoadDailyMenuVisitsFailure,

    // COUNTER 1-4
    LoadNewCgmReferralsShippedToday,
    LoadNewCgmReferralsShippedTodaySuccess,
    LoadNewCgmReferralsShippedTodayFailure,

    // COUNTER 1-5
    LoadPendingCgmReferralsReconciled,
    LoadPendingCgmReferralsReconciledSuccess,
    LoadPendingCgmReferralsReconciledFailure,

    // COUNTER 1-6
    LoadDocManagementKpi,
    LoadDocManagementKpiSuccess,
    LoadDocManagementKpiFailure,

    // COUNTER 2-1
    LoadTotalOrdersProcessedThisMonth,
    LoadTotalOrdersProcessedThisMonthSuccess,
    LoadTotalOrdersProcessedThisMonthFailure,

    // COUNTER 2-1 *** THIS IS GOING AWAY
    LoadReordersThisMonth,
    LoadReordersThisMonthSuccess,
    LoadReordersThisMonthFailure,

    // COUNTER 2-2
    LoadInvitationsThisMonth,
    LoadInvitationsThisMonthSuccess,
    LoadInvitationsThisMonthFailure,

    // COUNTER 2-1a NEW
    LoadReordersThisMonthBreakdown,
    LoadReordersThisMonthBreakdownSuccess,
    LoadReordersThisMonthBreakdownFailure,

    // COUNTER 2-1b NEW
    LoadReordersThisMonthCategory,
    LoadReordersThisMonthCategorySuccess,
    LoadReordersThisMonthCategoryFailure,

    // COUNTER 2-2 NEW
    LoadCgmOrdersProcessedThisMonth,
    LoadCgmOrdersProcessedThisMonthSuccess,
    LoadCgmOrdersProcessedThisMonthFailure,

    // COUNTER 2-3
    LoadBillingPerformance,
    LoadBillingPerformanceSuccess,
    LoadBillingPerformanceFailure,

    // COUNTER 2-4
    LoadReferarlsEnteredThisMondyByManufacturer,
    LoadReferarlsEnteredThisMondyByManufacturerSuccess,
    LoadReferarlsEnteredThisMondyByManufacturerFailure,

    // COUNTER 2-5
    LoadReferarlsShippedThisMondyByManufacturer,
    LoadReferarlsShippedThisMondyByManufacturerSuccess,
    LoadReferarlsShippedThisMondyByManufacturerFailure,

    // COUNTER 2-6
    LoadMonthlyMenuVisits,
    LoadMonthlyMenuVisitsSuccess,
    LoadMonthlyMenuVisitsFailure,

    // COUNTER 2-7
    LoadHollySmokesThisMonth,
    LoadHollySmokesThisMonthSuccess,
    LoadHollySmokesThisMonthFailure,

    // COUNTER 3-1
    LoadCgmTotalActiveCgmPatientsThisYear,
    LoadCgmTotalActiveCgmPatientsThisYearSuccess,
    LoadCgmTotalActiveCgmPatientsThisYearFailure,

    // COUNTER 3-2
    LoadActivecmnExpiration14Days,
    LoadActivecmnExpiration14DaysSuccess,
    LoadActivecmnExpiration14DaysFailure,

    // COUNTER 3-3
    LoadTotalPendingCgmReferrals,
    LoadTotalPendingCgmReferralsSuccess,
    LoadTotalPendingCgmReferralsFailure,

    // COUNTER 3-4
    LoadAverageDaysFromReferralEntryToActiveStatus,
    LoadAverageDaysFromReferralEntryToActiveStatusSuccess,
    LoadAverageDaysFromReferralEntryToActiveStatusFailure,

    // COUNTER 3-5
    LoadPercentCgmReferralSturnedinToActivePatients,
    LoadPercentCgmReferralSturnedinToActivePatientsSuccess,
    LoadPercentCgmReferralSturnedinToActivePatientsFailure,

    // COUNTER 3-6
    LoadPatientsUsingAnswersReorderPortal,
    LoadPatientsUsingAnswersReorderPortalSuccess,
    LoadPatientsUsingAnswersReorderPortalFailure,

    // COUNTER 3-7
    LoadTotalRspAccounts,
    LoadTotalRspAccountsSuccess,
    LoadTotalRspAccountsFailure,

    // COUNTER 3-8
    LoadRetentionRate,
    LoadRetentionRateSuccess,
    LoadRetentionRateFailure,

    // COUNTER 3-9
    LoadCgmAverageServiceLongevity,
    LoadCgmAverageServiceLongevitySuccess,
    LoadCgmAverageServiceLongevityFailure,

    // COUNTER 3-9
    LoadActivePatientLongevityThisMonth,
    LoadActivePatientLongevityThisMonthSuccess,
    LoadActivePatientLongevityThisMonthFailure,

    // COUNTER 4-1
    LoadDashboardGoals,
    LoadDashboardGoalsSuccess,
    LoadDashboardGoalsFailure,
};
