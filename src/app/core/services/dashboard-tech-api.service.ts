import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Backend } from './backend';

@Injectable({
    providedIn: 'root',
})
export class TechDashboardApiService {
    constructor(private http: HttpClient) {}

    // COLUMN 1
    getThreatsByMonth(): Observable<any[]> {
        return this.http.get<any[]>(Backend.threatsbymonth);
    }

    // COLUMN 2
    getThreatPercentage(): Observable<any[]> {
        return this.http.get<any[]>(Backend.threatpercentage);
    }

    // COLUMN 3
    getMonthWithHighestThreat(): Observable<any[]> {
        return this.http.get<any[]>(Backend.monthwithhighestthreat);
    }
}
