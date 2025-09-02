import { AsyncPipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthSelectors } from 'app/reducers';
import { GlobalSiteSettingsComponent } from '../../../../shared/components/auxilium/aux-global-site-settings/aux-global-site-settings.component';
import { LoadingOverlayComponent } from '../../../../shared/components/loading-overlay/loading-overlay.component';
import { UserCenterAccountComponent } from '../components/user-center-account/user-center-account.component';
import { UserCenterNotificationsComponent } from '../components/user-center-notifications/user-center-notifications.component';
import { UserCenterProfilePictureComponent } from '../components/user-center-profile-picture/user-center-profile-picture.component';
import { UserCenterSecurityComponent } from '../components/user-center-security/user-center-security.component';

@UntilDestroy()
@Component({
    selector: 'user-settings',
    templateUrl: './user-settings.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDrawerContainer,
        MatDrawer,
        MatIconButton,
        MatIcon,
        NgClass,
        MatDrawerContent,
        UserCenterAccountComponent,
        UserCenterSecurityComponent,
        UserCenterNotificationsComponent,
        UserCenterProfilePictureComponent,
        GlobalSiteSettingsComponent,
        LoadingOverlayComponent,
        AsyncPipe,
    ],
})
export class UserSettingsComponent implements OnInit, OnDestroy {
    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'account';
    loading$ = this.store.select(AuthSelectors.selectPicLoading);

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private store: Store,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private authService: AuthService
    ) {
        this.authService.initializeThemeConfig();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Setup available panels
        this.panels = [
            {
                id: 'account',
                icon: 'heroicons_outline:user-circle',
                title: 'Account',
                description: 'Manage your public profile and private information',
            },
            {
                id: 'profilePictures',
                icon: 'heroicons_outline:user-group',
                title: 'Profile Picture',
                description: 'Manage your existing team and change roles/permissions',
            },
            {
                id: 'security',
                icon: 'heroicons_outline:lock-closed',
                title: 'Security',
                description: 'Manage your password and 2-step verification preferences',
            },
            {
                id: 'notifications',
                icon: 'heroicons_outline:bell',
                title: 'Notifications',
                description: "Manage when you'll be notified on which channels",
            },
            {
                id: 'theme',
                icon: 'heroicons_outline:lock-closed',
                title: 'Theme and Layout',
                description: 'Manage global theme and layout options',
            },
        ];

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$.pipe(untilDestroyed(this)).subscribe(({ matchingAliases }) => {
            // Set the drawerMode and drawerOpened
            if (matchingAliases.includes('lg')) {
                this.drawerMode = 'side';
                this.drawerOpened = true;
            } else {
                this.drawerMode = 'over';
                this.drawerOpened = false;
            }

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Navigate to the panel
     *
     * @param panel
     */
    goToPanel(panel: string): void {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if (this.drawerMode === 'over') {
            this.drawer.close();
        }
    }

    /**
     * Get the details of the panel
     *
     * @param id
     */
    getPanelInfo(id: string): any {
        return this.panels.find(panel => panel.id === id);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
