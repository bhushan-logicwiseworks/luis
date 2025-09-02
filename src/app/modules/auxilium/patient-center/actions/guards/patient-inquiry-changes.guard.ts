import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { PatientInquiryChangesSelectors } from '../../reducers';
import { PatientInquiryChangesActions } from '../patient-inquiry-changes.action';

@Injectable({
    providedIn: 'root',
})
export class PatientInquiryChangesGuard implements CanActivate {
    loadInTakeAndSalesPerson(route) {
        return this.store.select(PatientInquiryChangesSelectors.selectPatientInquiryChangesState).pipe(
            take(1),
            switchMap(state => {
                if (!state.printstatus.length) {
                    this.store.dispatch(PatientInquiryChangesActions.PrintStatusDropDown());
                }

                if (!state.billType.length) {
                    this.store.dispatch(PatientInquiryChangesActions.BillTypeDropdown());
                }

                if (!state.claimType.length) {
                    this.store.dispatch(PatientInquiryChangesActions.ClaimTypeDropdown());
                }

                if (!state.pwkMethod.length) {
                    this.store.dispatch(PatientInquiryChangesActions.PwkMethodDropdown());
                }

                if (!state.tranType.length) {
                    this.store.dispatch(PatientInquiryChangesActions.TranTypeDropdown());
                }

                if (!state.pwkType.length) {
                    this.store.dispatch(PatientInquiryChangesActions.PwkTypeDropdown());
                }

                if (!state.salesrep.length) {
                    this.store.dispatch(PatientInquiryChangesActions.LoadPatientSalesRep());
                }

                if (!state.billTo.length) {
                    this.store.dispatch(PatientInquiryChangesActions.BillTo({ patientId: route.parent.params['id'] }));
                }

                if (!state.icdCode.length) {
                    this.store.dispatch(PatientInquiryChangesActions.IcdCode({ patientId: route.parent.params['id'] }));
                }

                if (!state.physician.length) {
                    this.store.dispatch(
                        PatientInquiryChangesActions.Physician({ patientId: route.parent.params['id'] })
                    );
                }

                return of(true);
            })
        );
    }
    constructor(private store: Store<any>) {}
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        // return our Observable stream from above
        return this.loadInTakeAndSalesPerson(route).pipe(
            // if it was successful, we can return Observable.of(true)
            switchMap(() => {
                return of(true);
            }),
            // otherwise, something went wrong
            catchError(err => {
                console.log('Error', err);
                return of(false);
            })
        );
    }
}
