import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CombinedService } from './combined.service';

@Injectable({
    providedIn: 'root',
})
export class CombinedResolver implements Resolve<any> {
    /**
     * Constructor
     */
    constructor(private combinedService: CombinedService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.combinedService.getData();
    }
}
