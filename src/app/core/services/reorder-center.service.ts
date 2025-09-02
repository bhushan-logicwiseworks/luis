import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    ContactResult,
    NextOrderSummary,
} from 'app/shared/interfaces/auxilium/patient-center/patient-next-order-summary.interface';
import { Observable } from 'rxjs';
import { Patient } from '../../shared/interfaces/auxilium/patient-center/patient.interface';
import { Backend } from './backend';

@Injectable({
    providedIn: 'root',
})
export class ReorderCenterService {
    constructor(private http: HttpClient) {}

    /*
  getpatient
  alternateShipToAddress
  getPatientInsurance
  getPatientDoctor
  savePatient
  saveAlternateShipToAddress
  savePatientDoctor
  * */

    getPatient(id): Observable<Patient> {
        return this.http.get<Patient>(Backend.getpatient(id));
    }

    getAlternateShipToAddress(id): Observable<any> {
        return this.http.get(Backend.alternateShipToAddress(id));
    }

    getPatientInsurance(id): Observable<any> {
        return this.http.get(Backend.getInsurance(id));
    }

    getPatientDoctor(id): Observable<any> {
        return this.http.get(Backend.getPatientDoctor(id));
    }

    getNextOrderDates(id): Observable<any> {
        return this.http.get(Backend.getNextOrderDates(id));
    }

    getPatientNotes(id): Observable<any> {
        return this.http.get(Backend.getContactNotes(id));
    }

    getReorderProducts(id): Observable<any> {
        return this.http.get(Backend.getReorderProducts(id));
    }

    getPrismAuthorization(id): Observable<any> {
        return this.http.get(Backend.getPrismAuthorization(id));
    }

    prismAuthorization(id): Observable<any> {
        return this.http.post(Backend.prismAuthorization(id), null);
    }

    saveAlternateShipToAddress(address): Observable<any> {
        return this.http.post(Backend.saveAlternateShipToAddress, address);
    }

    savePatientDoctor(doctor): Observable<any> {
        return this.http.post(Backend.savePatientDoctor, doctor);
    }

    processReorder(nextOrderSummary: NextOrderSummary) {
        return this.http.post<NextOrderSummary>(Backend.processreorder, nextOrderSummary);
    }

    processContact(contactResult: ContactResult) {
        return this.http.post<ContactResult>(Backend.processcontact, contactResult);
    }

    sendVisitNotes(patid) {
        return this.http.post<ContactResult>(Backend.sendvisitnotes(patid), null);
    }

    sendSWO(patid) {
        return this.http.post<ContactResult>(Backend.sendswo(patid), null);
    }

    checkPatientEligibility(patid): Observable<any> {
        return this.http.get(Backend.checkpatienteligibility(patid));
    }

    sendReorderText(patid) {
        return this.http.post<ContactResult>(Backend.sendreordertext(patid), '');
    }

    sendReorderEmail(patid) {
        return this.http.post<ContactResult>(Backend.sendreorderemail(patid), '');
    }
}
