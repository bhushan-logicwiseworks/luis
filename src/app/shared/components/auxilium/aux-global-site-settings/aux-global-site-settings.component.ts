import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Scheme, Theme, Themes } from '@aux/config/auxilium.app.config';
import { FuseConfigService } from '@fuse/services/config';
import { AuthService } from 'app/core/auth/auth.service';
import { AppConfig } from 'app/core/config/app.config';
import { Layout } from 'app/layout/layout.types';
import { environment } from 'environments/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { Subject, takeUntil } from 'rxjs';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
const firebaseConfig = environment.firebase;
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

@Component({
    selector: 'aux-global-site-settings',
    templateUrl: './aux-global-site-settings.component.html',
    styleUrls: ['./aux-global-site-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        MatIcon,
        MatIconButton,
        MatTooltip,
        MatButton,
    ],
})
export class GlobalSiteSettingsComponent {
    config: AppConfig;
    layout: Layout;
    scheme: 'dark' | 'light';
    theme: string;
    themes: Themes;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    @Output() closeDrawer = new EventEmitter<any>();
    @Input() showHeader: boolean = true;
    @Input() isUserSetting: boolean = false;
    selectedTheme: string;
    selectedScheme: string;

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _fuseConfigService: FuseConfigService,
        private auth: AngularFireAuth,
        private authService: AuthService,

        private db: AngularFireDatabase
    ) {
        // this.authService.initializeThemeConfig()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._fuseConfigService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: AppConfig) => {
            this.config = config;
            this.selectedTheme = config.theme;
            this.selectedScheme = config.scheme;
        });
    }

    handleSaveThemes() {
        this.authService.createInitialSetup(this.selectedTheme, this.selectedScheme);
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
     * Set the layout on the config
     *
     * @param layout
     */
    setLayout(layout: string): void {
        // Clear the 'layout' query param to allow layout changes
        this._router
            .navigate([], {
                queryParams: {
                    layout: null,
                },
                queryParamsHandling: 'merge',
            })
            .then(() => {
                // Set the config
                this._fuseConfigService.config = { layout };
            });
    }

    /**
     * Set the scheme on the config
     *
     * @param scheme
     */
    setScheme(scheme: Scheme): void {
        this.selectedScheme = scheme;
        this._fuseConfigService.config = { scheme };
    }

    /**
     * Set the theme on the config
     *
     * @param theme
     */
    setTheme(theme: Theme): void {
        this.selectedTheme = theme;
        this._fuseConfigService.config = { theme };
    }
}
