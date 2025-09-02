import { BooleanInput } from '@angular/cdk/coercion';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthSelectors } from 'app/reducers';
import { GetImage } from '../../../shared/pipes/auxilium/aux-getimage.pipe';

@UntilDestroy()
@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'user',
    imports: [MatMenuTrigger, MatMenu, MatMenuItem, MatDivider, MatIcon, AsyncPipe, GetImage],
})
export class UserComponent implements OnInit, OnDestroy {
    /* eslint-disable @typescript-eslint/naming-convention */
    static ngAcceptInputType_showAvatar: BooleanInput;
    /* eslint-enable @typescript-eslint/naming-convention */

    @Input() showAvatar: boolean = true;
    name$ = this.store.select(AuthSelectors.selectName);
    profilePicture$ = this.store.select(AuthSelectors.selectLoggedInUserPic);
    firebaseAuth = inject(Auth);

    /**
     * Constructor
     */
    constructor(
        private store: Store,
        private _router: Router,
        private _authService: AuthService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {}

    /**
     * On destroy
     */
    ngOnDestroy(): void {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the user status
     *
     * @param status
     */
    // updateUserStatus(status: string): void
    // {
    //     // Return if user is not available
    //     if ( !this.user )
    //     {
    //         return;
    //     }

    //     // Update the user
    //     this._userService.update({
    //         ...this.user,
    //         status
    //     }).subscribe();
    // }

    /**
     * Profile
     */
    profile(): void {
        this._router.navigate(['/user-center/profile']);
    }

    /**
     * Settings
     */
    settings(): void {
        this._router.navigate(['/user-center/settings']);
    }

    /**
     * Sign out
     */
    async signOut(): Promise<void> {
        await this.firebaseAuth.signOut();
        // Remove access token
        localStorage.clear();
        // Broadcast logout to other tabs
        // localStorage.setItem('app_logout_broadcast', Date.now().toString());
        // Navigate to sign-out page
        this._router.navigate(['/sign-out']);
    }
}
