import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, of, switchMap, take } from 'rxjs';
import { TerritoryTransferActions } from '../../actions/territory-transfer.actions';
import { TerritoryTransferSelectors } from '../../reducers';

@Injectable()
export class LoadPatientDetialsGuard implements CanActivate {
    loadSalesRepsAndCategories() {
        return this.store.select(TerritoryTransferSelectors.selectTerritoryTransferState).pipe(
            take(1),
            switchMap(state => {
                if (!state.salesReps.length) {
                    this.store.dispatch(TerritoryTransferActions.LoadSalesReps());
                }
                if (!state.patientCategory.length) {
                    this.store.dispatch(TerritoryTransferActions.LoadCategories());
                }
                return of(true);
            })
        );
    }

    constructor(private store: Store<any>) {}
    canActivate(): Observable<boolean> {
        // return our Observable stream from above
        return this.loadSalesRepsAndCategories().pipe(
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
