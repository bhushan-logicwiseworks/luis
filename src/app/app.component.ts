import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import firebase from 'firebase/auth';
import { filter } from 'rxjs';
import { NavigationsService } from './core/services/navigations.service';
import { AuthActions } from './reducers/auth.actions';
import { AuxSearchService } from './shared/aux-service/aux-search.service';
import { LoadingOverlayComponent } from './shared/components/loading-overlay/loading-overlay.component';
import User = firebase.User;

@UntilDestroy()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterModule, LoadingOverlayComponent],
})
export class AppComponent implements OnInit {
    loading: boolean;
    currentRoute: string;
    previousRoute: string;
    private onStorageEventRef: (e: StorageEvent) => void;
    /**
     * Constructor
     */
    constructor(
        private auth: AngularFireAuth,
        private navigationService: NavigationsService,
        private iconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private store: Store,
        private router: Router,
        private auxSearchService: AuxSearchService
    ) {}

    ngOnInit() {
        this.onStorageEventRef = (event: StorageEvent) => {
            if (event.key === 'app_logout_broadcast') {
                this.router.navigate(['/sign-out']);
            }
        };
        window.addEventListener('storage', this.onStorageEventRef);

        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            this.currentRoute = event.url;
            if (this.previousRoute) {
                // check if new url is of center
                const hasCenterUrl = this.currentRoute.includes('centers/');
                /// if no then reset filter as i am going to the page out-side centers
                if (!hasCenterUrl) {
                    this.resetFilters();
                } else {
                    // if yes then compare previous and current-one
                    const currentUrlParts = this.currentRoute.split('/');
                    const previousUrlParts = this.previousRoute.split('/');
                    // if both parts are same then we are on internal page of that center
                    // else we are on different center OR on different page compared to previous URL
                    if (currentUrlParts[1] !== previousUrlParts[1] || currentUrlParts[2] !== previousUrlParts[2]) {
                        this.resetFilters();
                    }
                }
            }
            this.previousRoute = event.url;
        });

        this.iconRegistry.addSvgIcon('US', this.domSanitizer.bypassSecurityTrustResourceUrl('images/flags/US.svg'));
        this.iconRegistry.addSvgIcon('ES', this.domSanitizer.bypassSecurityTrustResourceUrl('images/flags/ES.svg'));

        this.auth.authState.pipe(untilDestroyed(this)).subscribe(user => {
            this.store.dispatch(user ? AuthActions.Login({ user: user.toJSON() as User }) : AuthActions.Logout());
            if (user) {
                this.store.dispatch(AuthActions.GetLoggedInUserID());
            }
        });

        this.auth.idTokenResult.pipe(untilDestroyed(this)).subscribe(idTokenResult => {
            this.store.dispatch(
                idTokenResult
                    ? AuthActions.UpdateIdTokenResult({ idTokenResult })
                    : AuthActions.UpdateIdTokenResult({ idTokenResult: null })
            );
        });
    }

    ngOnDestroy(): void {
        if (this.onStorageEventRef) {
            window.removeEventListener('storage', this.onStorageEventRef);
        }
    }

    resetFilters() {
        // we are removing filter from storage manually. Because from ag-grid component, it will
        // remove the new component filters which should not happen
        this.auxSearchService.resetFilter.next({ resetGrid: true, removeFromStorage: false });
        if (this.auxSearchService.currentComponentFilterKey$.getValue() !== null) {
            this.auxSearchService.saveFilterState({}, this.auxSearchService.currentComponentFilterKey$.getValue());
        }
    }
}
