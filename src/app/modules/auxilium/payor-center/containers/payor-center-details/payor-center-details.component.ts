import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';
import { AvatarModule } from 'ngx-avatars';
import { Subject, combineLatest, delay, filter, switchMap } from 'rxjs';
import { FuseVerticalNavigationComponent } from '../../../../../../@fuse/components/navigation/vertical/vertical.component';
import { PayorCenterTableActions } from '../../actions/payor-center-table.actions';
import { PayorCenterTableSelectors } from '../../reducers';
import { TitleService } from '../../services/title.service';
@UntilDestroy()
@Component({
    selector: 'app-payor-center-details',
    templateUrl: './payor-center-details.component.html',
    styleUrls: ['./payor-center-details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDrawerContainer,
        MatDrawer,
        FuseVerticalNavigationComponent,
        MatDrawerContent,
        MatIcon,
        RouterLink,
        MatIconButton,
        AvatarModule,
        RouterOutlet,
    ],
})
export class PayorCenterDetailsComponent {
    payorDetails: Payor;
    title: string;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    menuData: FuseNavigationItem[];
    //   data$ = this.store.select(PayorCenterTableSelectors.selectPayorDetails)
    payorId: number;
    loading$ = this.store.select(PayorCenterTableSelectors.selectLoading).pipe(delay(500));
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(PayorCenterTableSelectors.selectPayorById))
    );

    EmployeeCenterDetailsSelectors;
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: TitleService,
        private store: Store,
        private actions$: Actions
    ) {
        this.menuData = [
            {
                title: 'Actions',
                subtitle: 'Payors tasks, actions & data',
                type: 'group',
                children: [
                    {
                        title: 'Demographics',
                        type: 'basic',
                        icon: 'heroicons_outline:location-marker',
                        link: './demographics',
                    },
                    {
                        title: 'Billing Options',
                        type: 'basic',
                        icon: 'heroicons_outline:location-marker',
                        link: './bill-options',
                    },
                    {
                        title: '837 Data',
                        type: 'basic',
                        icon: 'heroicons_outline:location-marker',
                        link: './837-data',
                    },
                    {
                        title: '1500 Data',
                        type: 'basic',
                        icon: 'heroicons_outline:location-marker',
                        link: './1500-data',
                    },
                ],
            },
        ];
    }

    getCustomInitials(name: string): string {
        if (!name || typeof name !== 'string') return '';
        const result = name.replace(/-/g, ' ').trim();
        return result;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.updateTitleBasedOnUrl();
        // Subscribe to route changes to reload data
        this.router.events
            .pipe(
                untilDestroyed(this),
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => {
                const payorId = Number(this.route.snapshot.paramMap.get('id'));
                if (payorId) {
                    this.store.dispatch(PayorCenterTableActions.LoadPayorById({ id: payorId }));
                }
            });
        combineLatest([this.route.paramMap])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.payorId = Number(this.route.snapshot.paramMap.get('id'));
                this.store.dispatch(PayorCenterTableActions.LoadPayorById({ id: this.payorId }));
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.payorDetails = result;
            }
        });

        this.actions$
            .pipe(ofType(PayorCenterTableActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));

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
        });
    }

    updateTitleBasedOnUrl() {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            const url = event.url;
            this.title = url.split('/')[4];
        });
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);
        this.titleService.value$.pipe(untilDestroyed(this)).subscribe(value => {
            setTimeout(() => {
                this.title = value;
            });
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {}
}
