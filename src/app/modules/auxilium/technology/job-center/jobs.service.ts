import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Backend } from 'app/core/services/backend';
import { JobHistory } from 'app/shared/interfaces/auxilium/job-center/job-history.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JobCenterService {
    constructor(private http: HttpClient) {}

    getJobHistory(id): Observable<JobHistory[]> {
        return this.http.get<JobHistory[]>(Backend.getjobhistory(id));
    }
}
