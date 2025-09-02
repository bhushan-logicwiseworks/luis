import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { isNil } from '../../../shared/utils/isNil';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {
    constructor(
        private readonly auth: AngularFireAuth,
        private readonly router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.auth.idTokenResult.pipe(
            map(idTokenResult => {
                if (isNil(idTokenResult) || !idTokenResult.claims.admin) {
                    return false;
                }

                return true;
            }),
            take(1)
        );
    }
}
