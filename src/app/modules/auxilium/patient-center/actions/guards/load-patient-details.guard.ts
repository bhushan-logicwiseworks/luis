import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { PatientCenterDeatilsActions } from 'app/modules/auxilium/patient-center/actions/patient-details.action';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { PatientCenterDetailsSelectors } from '../../reducers';

@Injectable()
export class LoadPatientDetialsGuard implements CanActivate {
    loadInTakeAndSalesPerson() {
        return this.store.select(PatientCenterDetailsSelectors.selectPatientCenterDetailsState).pipe(
            take(1),
            switchMap(state => {
                if (!state.intake.length) {
                    this.store.dispatch(PatientCenterDeatilsActions.LoadIntakeDropDown());
                }

                if (!state.patientStatus.length) {
                    this.store.dispatch(PatientCenterDeatilsActions.LoadPatientStatusDropDown());
                }

                if (!state.patientReferral.length) {
                    this.store.dispatch(PatientCenterDeatilsActions.LoadPatientReferralDropDown());
                }

                if (!state.inactiveReason.length) {
                    this.store.dispatch(PatientCenterDeatilsActions.LoadInactiveReasonDropDown());
                }

                if (!state.patientCategory.length) {
                    this.store.dispatch(PatientCenterDeatilsActions.LoadPatientCategoryDropDown());
                }

                if (!state.salesrep.length) {
                    this.store.dispatch(PatientCenterDeatilsActions.LoadPatientSalesRep());
                }

                if (!state.contactMethod.length) {
                    this.store.dispatch(PatientCenterDeatilsActions.LoadPatientContactMethodDropDown());
                }
                if (!state.placeOfService.length) {
                    this.store.dispatch(PatientCenterDeatilsActions.LoadPlaceOfServiceDropDown());
                }
                return of(true);
            })
        );
    }
    constructor(private store: Store<any>) {}
    canActivate(): Observable<boolean> {
        // return our Observable stream from above
        return this.loadInTakeAndSalesPerson().pipe(
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
