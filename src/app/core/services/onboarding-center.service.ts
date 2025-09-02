import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetPatientListResponse, OBC } from 'app/shared/interfaces/user/onboardingCenter.interface';
import { Observable } from 'rxjs';
import { Backend } from './backend';

@Injectable({
    providedIn: 'root',
})
export class OnboardingCenterService {
    constructor(private http: HttpClient) {}

    /*
  getkpi1
  getkpi2
  getkpi3
  getkpi4
  getkpi5
  getkpi6
  getkpi7
  getkpi8
  getkpi9
  * */

    getkpi1(): Observable<OBC> {
        return this.http.get<OBC>(Backend.getkpi1);
    }

    getkpi2(): Observable<OBC> {
        return this.http.get<OBC>(Backend.getkpi2);
    }

    getkpi3(): Observable<OBC> {
        return this.http.get<OBC>(Backend.getkpi3);
    }

    getkpi4(): Observable<OBC> {
        return this.http.get<OBC>(Backend.getkpi4);
    }

    getkpi5(): Observable<OBC> {
        return this.http.get<OBC>(Backend.getkpi5);
    }

    getkpi6(): Observable<OBC> {
        return this.http.get<OBC>(Backend.getkpi6);
    }

    getkpi7(): Observable<OBC> {
        return this.http.get<OBC>(Backend.getkpi7);
    }

    getkpi8(): Observable<OBC> {
        return this.http.get<OBC>(Backend.getkpi8);
    }

    getkpi9(): Observable<OBC> {
        return this.http.get<OBC>(Backend.getkpi9);
    }

    getDrillDown(id: string) {
        return this.http.get<GetPatientListResponse>(Backend.getDrillDown(id));
    }
}
