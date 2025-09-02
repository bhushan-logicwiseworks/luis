import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '../../reducers';

@UntilDestroy()
@Injectable({
    providedIn: 'root',
})
export class AuthorizationService {
    public userRoles;

    constructor(private store: Store) {
        //this.getUserRoles();
    }

    canRead(): boolean {
        const allowed = ['admin', 'manager', 'medauser'];
        return this.checkAuthorization(allowed);
    }

    canEdit(): boolean {
        const allowed = ['admin', 'manager', 'medauser'];
        return this.checkAuthorization(allowed);
    }

    canDelete(): boolean {
        const allowed = ['admin', 'manager'];
        return this.checkAuthorization(allowed);
    }

    isAdmin(): boolean {
        const allowed = ['admin'];
        return this.checkAuthorization(allowed);
    }

    // determines if user has matching role
    private checkAuthorization(allowedRoles: string[]): boolean {
        let resp: boolean = false;
        allowedRoles.forEach(thisAllowedRole => {
            //console.log(thisAllowedRole);
            //console.log(this.userRoles);

            return Object.entries(this.userRoles).forEach(([key, value]) => {
                //console.log(key, thisAllowedRole.toString());

                if (key === thisAllowedRole.toString()) {
                    resp = true;
                }
            });
        });
        return resp;
    }

    getUserRoles() {
        this.store
            .select(AuthSelectors.selectUserRole)
            .pipe(untilDestroyed(this))
            .subscribe(roles => {
                this.userRoles = roles;
            });
    }
}
