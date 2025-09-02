import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { PayorCenterDetailSelectors } from '../../reducers';
import { PayorCenterDeatilsActions } from '../payor-details.action';

@Injectable()
export class LoadPayorDetialsGuard implements CanActivate {
    loadPayorDropDown() {
        return this.store.select(PayorCenterDetailSelectors.selectPayorCenterDetailsState).pipe(
            take(1),
            switchMap(state => {
                this.store.dispatch(PayorCenterDeatilsActions.LoadPatientSalesRep());
                if (!state.priceCode.length) {
                    this.store.dispatch(PayorCenterDeatilsActions.LoadPriceCodeDropDown());
                }
                if (!state.primaryBillForm.length) {
                    this.store.dispatch(PayorCenterDeatilsActions.LoadPrimaryBillFormDropDown());
                }
                if (!state.payorType.length) {
                    this.store.dispatch(PayorCenterDeatilsActions.LoadPayorTypeDropDown());
                }
                if (!state.boxOne.length) {
                    this.store.dispatch(PayorCenterDeatilsActions.LoadBoxOneDropDown());
                }
                if (!state.claimindicator.length) {
                    this.store.dispatch(PayorCenterDeatilsActions.LoadClaimIndicatorDropDown());
                }
                if (!state.financialclass.length) {
                    this.store.dispatch(PayorCenterDeatilsActions.LoadFinancialClassDown());
                }
                if (!state.salesrep.length) {
                    this.store.dispatch(PayorCenterDeatilsActions.LoadPatientSalesRep());
                }
                return of(true);
            })
        );
    }
    constructor(private store: Store<any>) {}
    canActivate(): Observable<boolean> {
        // return our Observable stream from above
        return this.loadPayorDropDown().pipe(
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
