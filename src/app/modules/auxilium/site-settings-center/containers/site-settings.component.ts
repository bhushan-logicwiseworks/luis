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
import { AuthSelectors } from 'app/reducers';
import { LoadingOverlayComponent } from '../../../../shared/components/loading-overlay/loading-overlay.component';
import { SiteSettingGlobalComponent } from '../components/site-setting-global/site-setting-global.component';
import { SiteSettingPlanComponent } from '../components/site-setting-plan/site-setting-plan.component';
import { SiteSettingsThemeComponent } from '../components/site-settings-theme/site-settings-theme.component';

@UntilDestroy()
@Component({
    selector: 'site-settings',
    templateUrl: './site-settings.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDrawerContainer,
        MatDrawer,
        MatIconButton,
        MatIcon,
        NgClass,
        MatDrawerContent,
        SiteSettingGlobalComponent,
        SiteSettingPlanComponent,
        SiteSettingsThemeComponent,
        LoadingOverlayComponent,
        AsyncPipe,
    ],
})
export class SiteSettingsComponent implements OnInit, OnDestroy {
    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    selectedPanel: string = 'plan';
    loading$ = this.store.select(AuthSelectors.selectPicLoading);

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private store: Store,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {}

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
                id: 'plan',
                icon: 'heroicons_outline:user-circle',
                title: 'Plan & Billing',
                description: 'Manage your subscription plan, payment method and billing information',
            },
            {
                id: 'layout',
                icon: 'heroicons_outline:lock-closed',
                title: 'Theme and Layout',
                description: 'Manage global theme and layout options',
            },
            {
                id: 'global',
                icon: 'heroicons_outline:globe-alt',
                title: 'Global Settings',
                description: 'Manage global settings',
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
