import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActiveCMGPatientLongevityDisplay } from 'app/shared/interfaces/auxilium/dashboard/dashboard.interface';
import { Observable } from 'rxjs';
import { Backend } from './backend';

@Injectable({
    providedIn: 'root',
})
export class DashboardApiService {
    constructor(private http: HttpClient) {}

    // COUNTER 1-1
    getReordersConfirmedTodayByManufacturer(): Observable<any[]> {
        return this.http.get<any[]>(Backend.reordersconfirmedtodaybymanufacturer);
    }

    // COUNTER 1-2
    getReferarlsEnteredTodayByManufacturer(): Observable<any[]> {
        return this.http.get<any[]>(Backend.cgmreferralsenteredtodaybymanufacturer);
    }

    // COUNTER 1-3
    getDailyMenuVisits(): Observable<any[]> {
        return this.http.get<any[]>(Backend.dailymenuvisits);
    }

    // COUNTER 1-4
    getNewCGMReferralsShippedToday(): Observable<any[]> {
        return this.http.get<any[]>(Backend.newcgmreferralsshippedtoday);
    }

    // COUNTER 1-5
    getPendingCGMPatientReferralsReconciled(): Observable<any[]> {
        return this.http.get<any[]>(Backend.pendingcgmreferralsreconciled);
    }

    // COUNTER 1-6
    getDocManagementKpi(): Observable<any[]> {
        return this.http.get<any[]>(Backend.docmanagementkpi);
    }

    // COUNTER 2-1
    getTotalOrdersProcessedThisMonth(): Observable<any[]> {
        return this.http.get<any[]>(Backend.totalordersprocessedthismonth);
    }

    // COUNTER 2-1 *** THIS IS GOING AWAY
    getReordersThisMonth(): Observable<any[]> {
        return this.http.get<any[]>(Backend.reordersthismonth);
    }

    // COUNTER 2-2
    getReorderInvitationsThisMonth(): Observable<any[]> {
        return this.http.get<any[]>(Backend.invitationsthismonth);
    }

    // COUNTER 2-2 NEW
    getCGMOrdersProcessedThisMonth(): Observable<any[]> {
        return this.http.get<any[]>(Backend.cgmordersprocessedthismonth);
    }

    // COUNTER 2-2a NEW
    getReordersThisMonthBreakdown(): Observable<any[]> {
        return this.http.get<any[]>(Backend.reordersthismonthBreakdown);
    }

    // COUNTER 2-2b NEW
    getReordersThisMonthCategory(): Observable<any[]> {
        return this.http.get<any[]>(Backend.reordersthismonthCategory);
    }

    // COUNTER 2-3
    getBillingPerformance(): Observable<any[]> {
        return this.http.get<any[]>(Backend.billingperformance);
    }

    // COUNTER 2-4
    getReferarlsEnteredThisMondyByManufacturer(): Observable<any[]> {
        return this.http.get<any[]>(Backend.cgmreferralsenteredthismonthbymanufacturer);
    }

    // COUNTER 2-5
    getReferarlsShippedThisMondyByManufacturer(): Observable<any[]> {
        return this.http.get<any[]>(Backend.cgmreferralsshippedthismonthbymanufacturer);
    }

    // COUNTER 2-6
    getMonthlyMenuVisits(): Observable<any[]> {
        return this.http.get<any[]>(Backend.monthlymenuvisits);
    }

    // COUNTER 2-7
    getHollySmokesThisMonth(): Observable<any[]> {
        return this.http.get<any[]>(Backend.hollysmokesthismonth);
    }

    // COUNTER 3-1
    getCGMTotalActivePatientsThisYear(): Observable<any[]> {
        return this.http.get<any[]>(Backend.cgmtotalactivecgmpatientsthisyear);
    }

    // COUNTER 3-2
    getActiveCMNExpiration14Days(): Observable<any[]> {
        return this.http.get<any[]>(Backend.activecmnexpiration14days);
    }

    // COUNTER 3-3
    getTotalPendingCGMReferrals(): Observable<any[]> {
        return this.http.get<any[]>(Backend.totalpendingcgmreferrals);
    }

    // COUNTER 3-4
    getAverageDaysFromReferralEntryToActiveStatus(): Observable<any[]> {
        return this.http.get<any[]>(Backend.averagedaysfromreferralentrytoactivestatus);
    }

    // COUNTER 3-5
    getPercentCGMReferralsTurnedIntoActivePatients(): Observable<any[]> {
        return this.http.get<any[]>(Backend.percentcgmreferralsturnedintoactivepatients);
    }

    // COUNTER 3-6
    getPatientsUsingReorderPortal(): Observable<any[]> {
        return this.http.get<any[]>(Backend.patientsusinganswersreorderportal);
    }

    // COUNTER 3-7
    getTotalRSPAccounts(): Observable<any[]> {
        return this.http.get<any[]>(Backend.totalrspaccounts);
    }

    // COUNTER 3-8
    getRetentionRate(): Observable<any[]> {
        return this.http.get<any[]>(Backend.retentionRate);
    }

    getCGMAverageServiceLongevity(): Observable<ActiveCMGPatientLongevityDisplay[]> {
        return this.http.get<ActiveCMGPatientLongevityDisplay[]>(Backend.cgmAverageServiceLongevity);
    }

    getActivePatientLongevityThisMonth(): Observable<ActiveCMGPatientLongevityDisplay[]> {
        return this.http.get<ActiveCMGPatientLongevityDisplay[]>(Backend.activePatientLongevityThisMonth);
    }

    // COUNTER 4-1
    getGoals(): Observable<any[]> {
        return this.http.get<any[]>(Backend.dashboardGoals);
    }
}
