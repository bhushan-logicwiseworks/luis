import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { PatientArHistorySelectors } from '../../reducers';
import { PatientArHistoryActions } from '../patient-ar-history.action';

@Injectable({
    providedIn: 'root',
})
export class LoadArHistoryBranchListGuard implements CanActivate {
    constructor(private store: Store<any>) {}

    // Method to load the branch list if it's not already available
    loadBranchList(): Observable<boolean> {
        return this.store.select(PatientArHistorySelectors.selectBranch).pipe(
            take(1),
            switchMap(branchList => {
                if (!branchList || branchList.length === 0) {
                    this.store.dispatch(PatientArHistoryActions.LoadBranchDropDown());
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
