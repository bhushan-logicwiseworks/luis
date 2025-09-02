import { createReducer, on } from '@ngrx/store';
import { ActiveCMGPatientLongevityDisplay } from 'app/shared/interfaces/auxilium/dashboard/dashboard.interface';
import { DashboardDeatilsActions } from '../actions/project-details.action';

export const featureKey = 'dashboard-detail';

export interface State {
    // additional entities state properties
    loading: boolean;
    error: Error;
    loaded: boolean;

    // COUNTER 1-1
    ReordersConfirmedTodayByManufacturer: any;

    // COUNTER 1-2
    ReferarlsEnteredTodayByManufacturer: any;

    // COUNTER 1-3
    DailyMenuVisits: any;

    // COUNTER 1-4
    NewCgmReferralShippedToday: any;

    // COUNTER 1-5
    PendingCgmReferralsReconciled: any;

    // COUNTER 1-6
    DocManagementKpi: any;

    // COUNTER 2-1
    TotalOrdersProcessedThisMonth: any;

    // COUNTER 2-1 *** THIS IS GOING AWAY
    ReordersThisMonth: any;

    // COUNTER 2-2
    InvitationsThisMonth: any;

    // COUNTER 2-1a NEW
    ReordersThisMonthBreakdown: any;

    // COUNTER 2-1b NEW
    ReordersThisMonthCategory: any;

    // COUNTER 2-3
    BillingPerformance: any;

    // COUNTER 2-4
    ReferarlsEnteredThisMondyByManufacturer: any;

    // COUNTER 2-5
    ReferarlsShippedThisMondyByManufacturer: any;

    // COUNTER 2-6
    MonthlyMenuVisits: any;

    // COUNTER 2-7
    HollySmokesThisMonth: any;

    // COUNTER 3-2
    ActivecmnExpiration14Days: any;

    // COUNTER 3-1
    CgmTotalActiveCgmPatientsThisYear: any;

    // COUNTER 3-3
    TotalPendingCgmReferrals: any;

    // COUNTER 3-4
    AverageDaysFromReferralEntryToActiveStatus: any;

    // COUNTER 3-5
    PercentCgmReferralSturnedinToActivePatients: any;

    // COUNTER 3-6
    PatientsUsingAnswersReorderPortal: any;

    // COUNTER 3-7
    TotalRspAccounts: any;

    // COUNTER 3-8
    retentionRate: any;

    // COUNTER 2-2
    CgmOrdersProcessedThisMonth: any;

    CgmPatientLongevityThisMonth: ActiveCMGPatientLongevityDisplay[];

    activePatientLongevityThisMonth: ActiveCMGPatientLongevityDisplay[];

    // COUNTER 4-1
    Goals: any;
}

export const initialState: State = {
    // additional entity state properties
    loading: false,
    error: null,
    loaded: false,

    // COUNTER 1-1
    ReordersConfirmedTodayByManufacturer: [],

    // COUNTER 1-2
    ReferarlsEnteredTodayByManufacturer: [],

    // COUNTER 1-3
    DailyMenuVisits: [],

    // COUNTER 1-4
    NewCgmReferralShippedToday: [],

    // COUNTER 1-5
    PendingCgmReferralsReconciled: [],

    // COUNTER 1-6
    DocManagementKpi: [],

    // COUNTER 2-1
    TotalOrdersProcessedThisMonth: [],

    // COUNTER 2-1 *** THIS IS GOING AWAY
    ReordersThisMonth: [],

    // COUNTER 2-2
    InvitationsThisMonth: [],

    // COUNTER 2-2a NEW
    ReordersThisMonthBreakdown: [],

    // COUNTER 2-2b NEW
    ReordersThisMonthCategory: [],

    // COUNTER 2-3
    BillingPerformance: [],

    // COUNTER 2-4
    ReferarlsEnteredThisMondyByManufacturer: [],

    // COUNTER 2-5
    ReferarlsShippedThisMondyByManufacturer: [],

    // COUNTER 2-6
    MonthlyMenuVisits: [],

    // COUNTER 2-7
    HollySmokesThisMonth: [],

    // COUNTER 3-1
    CgmTotalActiveCgmPatientsThisYear: [],

    // COUNTER 3-2
    ActivecmnExpiration14Days: [],

    // COUNTER 3-3
    TotalPendingCgmReferrals: [],

    // COUNTER 3-4
    AverageDaysFromReferralEntryToActiveStatus: [],

    // COUNTER 3-5
    PercentCgmReferralSturnedinToActivePatients: [],

    // COUNTER 3-6
    PatientsUsingAnswersReorderPortal: [],

    // COUNTER 3-7
    TotalRspAccounts: [],

    // COUNTER 3-8
    retentionRate: [],
    // COUNTER 2-2
    CgmOrdersProcessedThisMonth: [],

    CgmPatientLongevityThisMonth: [],

    activePatientLongevityThisMonth: [],

    // COUNTER 4-1
    Goals: [],
};

export const reducer = createReducer(
    initialState,

    on(DashboardDeatilsActions.ResetState, () => {
        return initialState;
    }),

    // COUNTER 1-1
    on(DashboardDeatilsActions.LoadReordersConfirmedTodayByManufacturer, state => ({ ...state, loading: true })),
    on(
        DashboardDeatilsActions.LoadReordersConfirmedTodayByManufacturerSuccess,
        (state, { ReordersConfirmedTodayByManufacturer }) => ({
            ...state,
            loading: false,
            ReordersConfirmedTodayByManufacturer,
        })
    ),
    on(DashboardDeatilsActions.LoadReordersConfirmedTodayByManufacturerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 1-2
    on(DashboardDeatilsActions.LoadReferarlsEnteredTodayByManufacturer, state => ({ ...state, loading: true })),
    on(
        DashboardDeatilsActions.LoadReferarlsEnteredTodayByManufacturerSuccess,
        (state, { ReferarlsEnteredTodayByManufacturer }) => ({
            ...state,
            loading: false,
            ReferarlsEnteredTodayByManufacturer,
        })
    ),
    on(DashboardDeatilsActions.LoadReferarlsEnteredTodayByManufacturerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 1-3
    on(DashboardDeatilsActions.LoadDailyMenuVisits, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadDailyMenuVisitsSuccess, (state, { DailyMenuVisits }) => ({
        ...state,
        loading: false,
        DailyMenuVisits,
    })),
    on(DashboardDeatilsActions.LoadDailyMenuVisitsFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // COUNTER 1-4
    on(DashboardDeatilsActions.LoadNewCgmReferralsShippedToday, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadNewCgmReferralsShippedTodaySuccess, (state, { NewCgmReferralShippedToday }) => ({
        ...state,
        loading: false,
        NewCgmReferralShippedToday,
    })),
    on(DashboardDeatilsActions.LoadNewCgmReferralsShippedTodayFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 1-5
    on(DashboardDeatilsActions.LoadPendingCgmReferralsReconciled, state => ({ ...state, loading: true })),
    on(
        DashboardDeatilsActions.LoadPendingCgmReferralsReconciledSuccess,
        (state, { PendingCgmReferralsReconciled }) => ({ ...state, loading: false, PendingCgmReferralsReconciled })
    ),
    on(DashboardDeatilsActions.LoadPendingCgmReferralsReconciledFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 1-6
    on(DashboardDeatilsActions.LoadDocManagementKpi, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadDocManagementKpiSuccess, (state, { DocManagementKpi }) => ({
        ...state,
        loading: false,
        DocManagementKpi,
    })),
    on(DashboardDeatilsActions.LoadDocManagementKpiFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 2-1
    on(DashboardDeatilsActions.LoadTotalOrdersProcessedThisMonth, state => ({ ...state, loading: true })),
    on(
        DashboardDeatilsActions.LoadTotalOrdersProcessedThisMonthSuccess,
        (state, { TotalOrdersProcessedThisMonth }) => ({ ...state, loading: false, TotalOrdersProcessedThisMonth })
    ),
    on(DashboardDeatilsActions.LoadTotalOrdersProcessedThisMonthFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 2-1 *** THIS IS GOING AWAY
    on(DashboardDeatilsActions.LoadReordersThisMonth, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadReordersThisMonthSuccess, (state, { ReordersThisMonth }) => ({
        ...state,
        loading: false,
        ReordersThisMonth,
    })),
    on(DashboardDeatilsActions.LoadReordersThisMonthFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 2-2
    on(DashboardDeatilsActions.LoadInvitationsThisMonth, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadInvitationsThisMonthSuccess, (state, { InvitationsThisMonth }) => ({
        ...state,
        loading: false,
        InvitationsThisMonth,
    })),
    on(DashboardDeatilsActions.LoadInvitationsThisMonthFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 2-1a NEW
    on(DashboardDeatilsActions.LoadReordersThisMonthBreakdown, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadReordersThisMonthBreakdownSuccess, (state, { ReordersThisMonthBreakdown }) => ({
        ...state,
        loading: false,
        ReordersThisMonthBreakdown,
    })),
    on(DashboardDeatilsActions.LoadReordersThisMonthBreakdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 2-1b NEW
    on(DashboardDeatilsActions.LoadReordersThisMonthCategory, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadReordersThisMonthCategorySuccess, (state, { ReordersThisMonthCategory }) => ({
        ...state,
        loading: false,
        ReordersThisMonthCategory,
    })),
    on(DashboardDeatilsActions.LoadReordersThisMonthCategoryFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 2-3
    on(DashboardDeatilsActions.LoadBillingPerformance, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadBillingPerformanceSuccess, (state, { BillingPerformance }) => ({
        ...state,
        loading: false,
        BillingPerformance,
    })),
    on(DashboardDeatilsActions.LoadBillingPerformanceFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 2-4
    on(DashboardDeatilsActions.LoadReferarlsEnteredThisMondyByManufacturer, state => ({ ...state, loading: true })),
    on(
        DashboardDeatilsActions.LoadReferarlsEnteredThisMondyByManufacturerSuccess,
        (state, { ReferarlsEnteredThisMondyByManufacturer }) => ({
            ...state,
            loading: false,
            ReferarlsEnteredThisMondyByManufacturer,
        })
    ),
    on(DashboardDeatilsActions.LoadReferarlsEnteredThisMondyByManufacturerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 2-5
    on(DashboardDeatilsActions.LoadReferarlsShippedThisMondyByManufacturer, state => ({ ...state, loading: true })),
    on(
        DashboardDeatilsActions.LoadReferarlsShippedThisMondyByManufacturerSuccess,
        (state, { ReferarlsShippedThisMondyByManufacturer }) => ({
            ...state,
            loading: false,
            ReferarlsShippedThisMondyByManufacturer,
        })
    ),
    on(DashboardDeatilsActions.LoadReferarlsShippedThisMondyByManufacturerFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 2-6
    on(DashboardDeatilsActions.LoadMonthlyMenuVisits, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadMonthlyMenuVisitsSuccess, (state, { MonthlyMenuVisits }) => ({
        ...state,
        loading: false,
        MonthlyMenuVisits,
    })),
    on(DashboardDeatilsActions.LoadMonthlyMenuVisitsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 2-7
    on(DashboardDeatilsActions.LoadHollySmokesThisMonth, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadHollySmokesThisMonthSuccess, (state, { HollySmokesThisMonth }) => ({
        ...state,
        loading: false,
        HollySmokesThisMonth,
    })),
    on(DashboardDeatilsActions.LoadHollySmokesThisMonthFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 3-1
    on(DashboardDeatilsActions.LoadCgmTotalActiveCgmPatientsThisYear, state => ({ ...state, loading: true })),
    on(
        DashboardDeatilsActions.LoadCgmTotalActiveCgmPatientsThisYearSuccess,
        (state, { CgmTotalActiveCgmPatientsThisYear }) => ({
            ...state,
            loading: false,
            CgmTotalActiveCgmPatientsThisYear,
        })
    ),
    on(DashboardDeatilsActions.LoadCgmTotalActiveCgmPatientsThisYearFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 3-2
    on(DashboardDeatilsActions.LoadActivecmnExpiration14Days, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadActivecmnExpiration14DaysSuccess, (state, { ActivecmnExpiration14Days }) => ({
        ...state,
        loading: false,
        ActivecmnExpiration14Days,
    })),
    on(DashboardDeatilsActions.LoadActivecmnExpiration14DaysFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 3-3
    on(DashboardDeatilsActions.LoadTotalPendingCgmReferrals, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadTotalPendingCgmReferralsSuccess, (state, { TotalPendingCgmReferrals }) => ({
        ...state,
        loading: false,
        TotalPendingCgmReferrals,
    })),
    on(DashboardDeatilsActions.LoadTotalPendingCgmReferralsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 3-4
    on(DashboardDeatilsActions.LoadAverageDaysFromReferralEntryToActiveStatus, state => ({ ...state, loading: true })),
    on(
        DashboardDeatilsActions.LoadAverageDaysFromReferralEntryToActiveStatusSuccess,
        (state, { AverageDaysFromReferralEntryToActiveStatus }) => ({
            ...state,
            loading: false,
            AverageDaysFromReferralEntryToActiveStatus,
        })
    ),
    on(DashboardDeatilsActions.LoadAverageDaysFromReferralEntryToActiveStatusFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 3-5
    on(DashboardDeatilsActions.LoadPercentCgmReferralSturnedinToActivePatients, state => ({ ...state, loading: true })),
    on(
        DashboardDeatilsActions.LoadPercentCgmReferralSturnedinToActivePatientsSuccess,
        (state, { PercentCgmReferralSturnedinToActivePatients }) => ({
            ...state,
            loading: false,
            PercentCgmReferralSturnedinToActivePatients,
        })
    ),
    on(DashboardDeatilsActions.LoadPercentCgmReferralSturnedinToActivePatientsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 3-6
    on(DashboardDeatilsActions.LoadPatientsUsingAnswersReorderPortal, state => ({ ...state, loading: true })),
    on(
        DashboardDeatilsActions.LoadPatientsUsingAnswersReorderPortalSuccess,
        (state, { PatientsUsingAnswersReorderPortal }) => ({
            ...state,
            loading: false,
            PatientsUsingAnswersReorderPortal,
        })
    ),
    on(DashboardDeatilsActions.LoadPatientsUsingAnswersReorderPortalFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 3-7
    on(DashboardDeatilsActions.LoadTotalRspAccounts, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadTotalRspAccountsSuccess, (state, { TotalRspAccounts }) => ({
        ...state,
        loading: false,
        TotalRspAccounts,
    })),
    on(DashboardDeatilsActions.LoadTotalRspAccountsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 3-8
    on(DashboardDeatilsActions.LoadRetentionRate, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadRetentionRateSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        retentionRate: data,
    })),
    on(DashboardDeatilsActions.LoadRetentionRateFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // COUNTER 2-2
    on(DashboardDeatilsActions.LoadCgmOrdersProcessedThisMonth, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadCgmOrdersProcessedThisMonthSuccess, (state, { CgmOrdersProcessedThisMonth }) => ({
        ...state,
        loading: false,
        CgmOrdersProcessedThisMonth,
    })),
    on(DashboardDeatilsActions.LoadCgmOrdersProcessedThisMonthFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(DashboardDeatilsActions.LoadCgmAverageServiceLongevity, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadCgmAverageServiceLongevitySuccess, (state, { CgmPatientLongevityThisMonth }) => ({
        ...state,
        loading: false,
        CgmPatientLongevityThisMonth,
    })),
    on(DashboardDeatilsActions.LoadCgmAverageServiceLongevityFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(DashboardDeatilsActions.LoadActivePatientLongevityThisMonth, state => ({ ...state, loading: true })),
    on(
        DashboardDeatilsActions.LoadActivePatientLongevityThisMonthSuccess,
        (state, { activePatientLongevityThisMonth }) => ({ ...state, loading: false, activePatientLongevityThisMonth })
    ),
    on(DashboardDeatilsActions.LoadActivePatientLongevityThisMonthFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // COUNTER 4-1
    on(DashboardDeatilsActions.LoadDashboardGoals, state => ({ ...state, loading: true })),
    on(DashboardDeatilsActions.LoadDashboardGoalsSuccess, (state, { Goals }) => ({ ...state, loading: false, Goals })),
    on(DashboardDeatilsActions.LoadDashboardGoalsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;

// COUNTER 1-1
export const selectReordersConfirmedTodayByManufacturer = (state: State) => state.ReordersConfirmedTodayByManufacturer;

// COUNTER 1-2
export const selectReferarlsEnteredTodayByManufacturer = (state: State) => state.ReferarlsEnteredTodayByManufacturer;

// COUNTER 1-3
export const selectLoadDailyMenuVisits = (state: State) => state.DailyMenuVisits;

// COUNTER 1-4
export const selectLoadNewCgmReferralsShippedToday = (state: State) => state.NewCgmReferralShippedToday;

// COUNTER 1-5
export const selectLoadPendingCgmReferralsReconciled = (state: State) => state.PendingCgmReferralsReconciled;

// COUNTER 1-6
export const selectDocManagementKpi = (state: State) => state.DocManagementKpi;

// COUNTER 2-1
export const selectTotalOrdersProcessedThisMonth = (state: State) => state.TotalOrdersProcessedThisMonth;

// COUNTER 2-1 *** THIS IS GOING AWAY
export const selectReordersThisMonth = (state: State) => state.ReordersThisMonth;

// COUNTER 2-2
export const selectInvitationsThisMonth = (state: State) => state.InvitationsThisMonth;

// COUNTER 2-2a NEW
export const selectReordersThisMonthBreakdown = (state: State) => state.ReordersThisMonthBreakdown;

// COUNTER 2-2b NEW
export const selectReordersThisMonthCategory = (state: State) => state.ReordersThisMonthCategory;

// COUNTER 2-3
export const selectBillingPerformance = (state: State) => state.BillingPerformance;

// COUNTER 2-4
export const selectReferarlsEnteredThisMondyByManufacturer = (state: State) =>
    state.ReferarlsEnteredThisMondyByManufacturer;

// COUNTER 2-5
export const selectReferarlsShippedThisMondyByManufacturer = (state: State) =>
    state.ReferarlsShippedThisMondyByManufacturer;

// COUNTER 2-6
export const selectMonthlyMenuVisits = (state: State) => state.MonthlyMenuVisits;

// COUNTER 2-7
export const selectHollySmokesThisMonth = (state: State) => state.HollySmokesThisMonth;

// COUNTER 3-1
export const selectCgmTotalActiveCgmPatientsThisYear = (state: State) => state.CgmTotalActiveCgmPatientsThisYear;

// COUNTER 3-2
export const selectActivecmnExpiration14Days = (state: State) => state.ActivecmnExpiration14Days;

// COUNTER 3-3
export const selectTotalPendingCgmReferrals = (state: State) => state.TotalPendingCgmReferrals;

// COUNTER 3-4
export const selectAverageDaysFromReferralEntryToActiveStatus = (state: State) =>
    state.AverageDaysFromReferralEntryToActiveStatus;

// COUNTER 3-5
export const selectPercentCgmReferralSturnedinToActivePatients = (state: State) =>
    state.PercentCgmReferralSturnedinToActivePatients;

// COUNTER 3-6
export const selectPatientsUsingAnswersReorderPortal = (state: State) => state.PatientsUsingAnswersReorderPortal;

// COUNTER 3-7
export const selectTotalRspAccounts = (state: State) => state.TotalRspAccounts;

// COUNTER 3-8
export const selectLoadRetentionRate = (state: State) => state.retentionRate;
// COUNTER 2-2
export const selectCgmOrdersProcessedThisMonth = (state: State) => state.CgmOrdersProcessedThisMonth;

export const selectCgmPatientLongevityThisMonth = (state: State) => state.CgmPatientLongevityThisMonth;

export const selectActivePatientLongevityThisMonth = (state: State) => state.activePatientLongevityThisMonth;

// COUNTER 4-1
export const selectGoal = (state: State) => state.Goals;
