import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { filter, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuseSplashScreenService {
    private _document = inject(DOCUMENT);
    private _router = inject(Router);
    private _authService = inject(AuthService);
    private _isDirectNavigation = false;

    /**
     * Constructor
     */
    constructor() {
        // Check if this is a direct URL navigation (manually entered URL)

        // Check authentication status

        // For authenticated users or those already on sign-in page, use normal behavior
        // Hide it on the first NavigationEnd event
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                this.hide();
            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Show the splash screen
     */
    show(): void {
        // Only show splash screen if not a direct navigation to a protected route
        this._document.body.classList.remove('fuse-splash-screen-hidden');
    }

    /**
     * Hide the splash screen
     */
    hide(): void {
        this._document.body.classList.add('fuse-splash-screen-hidden');
    }
}
