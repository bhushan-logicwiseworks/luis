import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TitleService } from 'app/modules/auxilium/patient-center/services/title.service';
import { SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';
import { AvatarModule } from 'ngx-avatars';
import { Subject, combineLatest, switchMap } from 'rxjs';
import { FuseVerticalNavigationComponent } from '../../../../../../@fuse/components/navigation/vertical/vertical.component';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { SalesCenterTableActions } from '../../actions/sales-center-table.actions';
import { SalesCenterTableSelectors } from '../../reducers';
@UntilDestroy()
@Component({
    selector: 'app-sales-center-details',
    templateUrl: './sales-center-details.component.html',
    styleUrls: ['./sales-center-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDrawerContainer,
        LoadingOverlayComponent,
        MatDrawer,
        FuseVerticalNavigationComponent,
        MatDrawerContent,
        MatIcon,
        RouterLink,
        AvatarModule,
        MatIconButton,
        RouterOutlet,
        AsyncPipe,
    ],
})
export class SalesCenterDetailsComponent {
    salesDetails: SalesRepDisplay;
    title: string;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    menuData: FuseNavigationItem[];
    salesDetailId: number;

    loading$ = this.store.select(SalesCenterTableSelectors.selectLoading).pipe();
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(SalesCenterTableSelectors.selectSalesRepById))
    );
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private store: Store,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private actions$: Actions,
        private titleService: TitleService
    ) {
        this.menuData = [
            {
                title: 'Servicing Actions',
                type: 'group',
                children: [
                    {
                        title: 'Demographics',
                        type: 'basic',
                        icon: 'heroicons_outline:location-marker',
                        link: './demographics',
                        classes: {
                            wrapper: 'padding-style',
                        },
                    },
                ],
            },
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);
        this.titleService.value$.pipe(untilDestroyed(this)).subscribe(value => {
            setTimeout(() => {
                this.title = value;
            });
        });
        combineLatest([this.route.paramMap])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.salesDetailId = Number(this.route.snapshot.paramMap.get('id'));
                this.store.dispatch(SalesCenterTableActions.LoadSalesById({ id: this.salesDetailId }));
            });

        this.data$.pipe(untilDestroyed(this)).subscribe((data: any) => {
            if (data) {
                this.salesDetails = data;
            }
        });
        this.actions$
            .pipe(ofType(SalesCenterTableActions.Refresh), untilDestroyed(this))
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

    /**
     * On destroy
     */
    ngOnDestroy(): void {}
}
