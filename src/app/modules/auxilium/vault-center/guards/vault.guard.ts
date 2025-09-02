import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import * as fromVaultActions from '../actions/vault.actions';
import { VaultsSelectors } from '../reducers';

@Injectable({
    providedIn: 'root',
})
export class VaultGuard implements CanActivate {
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

    checkStore(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.store.select(VaultsSelectors.selectLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(fromVaultActions.loadVaults());
                }
            }),
            switchMap(loaded => {
                if (Number(route.params['vaultId'])) {
                    this.store.dispatch(fromVaultActions.setCurrentVault({ id: Number(route.params['vaultId']) }));
                    return of(loaded);
                } else {
                    this.store.dispatch(fromVaultActions.ResetVaultState());
                }
                return of(true);
            }),
            filter(loaded => !!loaded),
            take(1)
        );
    }
}
