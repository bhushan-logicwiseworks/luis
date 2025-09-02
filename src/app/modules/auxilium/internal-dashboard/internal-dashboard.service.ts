import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Backend } from 'app/core/services/backend';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class InternalDashboardService {
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    /*
  // COUNTERS
  */

    getColumnData(): Observable<any[]> {
        let cgmpatientsshippedtoday = this._httpClient.get(Backend.cgmpatientsshippedtodayV1);
        let cgmreferralsenteredtoday = this._httpClient.get(Backend.cgmreferralsenteredtodayV1);
        let newcgmreferralsshippedtoday = this._httpClient.get(Backend.newcgmreferralsshippedtodayV1);
        let pendingcgmreferralsreconciled = this._httpClient.get(Backend.pendingcgmreferralsreconciledV1);
        let cgmpatientsshippedthismonth = this._httpClient.get(Backend.cgmpatientsshippedthismonthV1);
        let newcgmreferralsshippedthismonth = this._httpClient.get(Backend.newcgmreferralsshippedthismonthV1);
        let billingperformance = this._httpClient.get(Backend.billingperformanceV1);
        let pendingcgmreferralsreconciledthismonth = this._httpClient.get(
            Backend.pendingcgmreferralsreconciledthismonthV1
        );
        let cgmreferralsenteredthismonth = this._httpClient.get(Backend.cgmreferralsenteredthismonthV1);
        let cgmtotalactivecgmpatientsthisyear = this._httpClient.get(Backend.cgmtotalactivecgmpatientsthisyearV1);
        let totalpendingcgmreferrals = this._httpClient.get(Backend.totalpendingcgmreferralsV1);
        let activecmnexpiration14days = this._httpClient.get(Backend.activecmnexpiration14daysV1);
        let averagedaysfromreferralentrytoactivestatus = this._httpClient.get(
            Backend.averagedaysfromreferralentrytoactivestatusV1
        );
        let percentcgmreferralsturnedintoactivepatients = this._httpClient.get(
            Backend.percentcgmreferralsturnedintoactivepatientsV1
        );
        let patientsusinganswersreorderportal = this._httpClient.get(Backend.patientsusinganswersreorderportalV1);
        // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
        return forkJoin([
            cgmpatientsshippedtoday,
            cgmreferralsenteredtoday,
            newcgmreferralsshippedtoday,
            pendingcgmreferralsreconciled,
            cgmpatientsshippedthismonth,
            newcgmreferralsshippedthismonth,
            billingperformance,
            pendingcgmreferralsreconciledthismonth,
            cgmreferralsenteredthismonth,
            cgmtotalactivecgmpatientsthisyear,
            totalpendingcgmreferrals,
            activecmnexpiration14days,
            averagedaysfromreferralentrytoactivestatus,
            percentcgmreferralsturnedintoactivepatients,
            patientsusinganswersreorderportal,
        ]);
    }
}
