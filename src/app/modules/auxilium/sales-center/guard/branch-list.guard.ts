import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { SalesCenterIndividualActions } from '../actions/sales-center-individual.actions';
import { SalesCenterIndividualSelectors } from '../reducers';

@Injectable({
    providedIn: 'root',
})
export class LoadBranchListGuard implements CanActivate {
    constructor(private store: Store<any>) {}

    // Method to load the branch list if it's not already available
    loadBranchList(): Observable<boolean> {
        return this.store.select(SalesCenterIndividualSelectors.selectBranch).pipe(
            take(1),
            switchMap(branchList => {
                if (!branchList || branchList.length === 0) {
                    this.store.dispatch(SalesCenterIndividualActions.LoadBranchDropDown());
                }
                return of(true);
            })
        );
    }

    // The canActivate method for the guard
    canActivate(): Observable<boolean> {
        return this.loadBranchList().pipe(
            switchMap(() => of(true)),
            catchError(err => {
                console.error('Error loading branch list:', err);
                return of(false);
            })
        );
    }
}
