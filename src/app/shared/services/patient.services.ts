import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Backend } from '../../core/services/backend';
import { NextOrderSummary } from '../interfaces/auxilium/patient-center/patient-next-order-summary.interface';

@Injectable({
    providedIn: 'root',
})
export class PatientService {
    constructor(private http: HttpClient) {}

    sendcode(patientid) {
        return this.http.post<NextOrderSummary>(Backend.sendcode + patientid, null);
    }
}
