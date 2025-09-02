import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { LicenseCenterTableActions } from '../actions/license-center-table.actions';
import { LicenseCenterTableSelectors } from '../reducers';

@Injectable({
    providedIn: 'root',
})
export class LicenseFolderGuard implements CanActivate {
    constructor(
        private store: Store,
        private route: ActivatedRoute
    ) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.checkStore(route).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(route: ActivatedRouteSnapshot) {
        return this.store.select(LicenseCenterTableSelectors.selectLicenseById).pipe(
            switchMap(loaded => {
                if (!loaded) {
                    this.store.dispatch(LicenseCenterTableActions.LoadLicensesById({ id: route.params.id }));
                    return of(true);
                }
                return of(true);
            }),
            filter(loaded => !!loaded)
        );
    }
}
