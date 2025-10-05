import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Subject, takeUntil } from 'rxjs';
import { FuseLoadingBarComponent } from '../../../../../@fuse/components/loading-bar/loading-bar.component';
import { FuseVerticalNavigationComponent as FuseVerticalNavigationComponent_1 } from '../../../../../@fuse/components/navigation/vertical/vertical.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FuseFullscreenComponent } from '../../../../../@fuse/components/fullscreen/fullscreen.component';
import { SearchComponent } from '../../../common/search/search.component';
import { ShortcutsComponent } from '../../../common/shortcuts/shortcuts.component';
import { MessagesComponent } from '../../../common/messages/messages.component';
import { NotificationsComponent } from '../../../common/notifications/notifications.component';
import { UserComponent } from '../../../common/user/user.component';

@Component({
    selector: 'dense-layout',
    templateUrl: './dense.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [
        FuseLoadingBarComponent,
        FuseVerticalNavigationComponent_1,
        MatIconButton,
        MatIcon,
        FuseFullscreenComponent,
        SearchComponent,
        ShortcutsComponent,
        MessagesComponent,
        NotificationsComponent,
        UserComponent,
        RouterOutlet,
    ],
})
export class DenseLayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    navigation: Navigation;
    navigationAppearance: 'default' | 'dense' = 'dense';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');

                // Change the navigation appearance
                this.navigationAppearance = this.isScreenSmall ? 'default' : 'dense';
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    /**
     * Toggle the navigation appearance
     */
    toggleNavigationAppearance(): void {
        this.navigationAppearance = this.navigationAppearance === 'default' ? 'dense' : 'default';
    }
}
