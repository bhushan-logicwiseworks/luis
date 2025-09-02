import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { AvatarModule } from 'ngx-avatars';
import { combineLatest, map, Subject } from 'rxjs';
import { FuseVerticalNavigationComponent } from '../../../../../../@fuse/components/navigation/vertical/vertical.component';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { InventoryCenterDeatilsActions } from '../../actions/inventory-center-details.action';
import { InventoryCenterIndividualSelectors, InventoryCenterProductSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-inventory-center-details',
    templateUrl: './inventory-center-details.component.html',
    styleUrls: ['./inventory-center-details.component.scss'],
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
        LoadingOverlayComponent,
        RouterOutlet,
        AsyncPipe,
    ],
})
export class InventoryCenterDetailsComponent implements OnInit {
    menuData: FuseNavigationItem[];
    title: string;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    loading$ = this.store.select(InventoryCenterProductSelectors.selectLoading);
    productDetailsList$ = this.store.select(InventoryCenterProductSelectors.selectProductDetails);
    productDetails;
    selectedBranchName: string | null = null;
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    branch$ = this.store.select(InventoryCenterIndividualSelectors.selectBranch).pipe(
        map(data =>
            data.map(result => ({
                id: result.id,
                name: result.name,
                value: result.branchcode,
            }))
        )
    );
    private productId: number;

    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private store: Store,
        private router: Router,
        private actions$: Actions,
        private titleService: TitleService,
        private route: ActivatedRoute
    ) {
        this.menuData = [
            {
                title: 'Actions',
                subtitle: 'Product tasks, actions & data',
                type: 'group',
                children: [
                    {
                        title: 'Details',
                        type: 'basic',
                        icon: 'heroicons_outline:location-marker',
                        link: './details',
                    },
                    {
                        title: 'Pricing',
                        type: 'basic',
                        icon: 'heroicons_outline:location-marker',
                        link: './pricing-list',
                    },
                    {
                        title: 'Vendor',
                        type: 'basic',
                        icon: 'heroicons_outline:location-marker',
                        link: './vendor-list',
                    },
                    {
                        title: 'Locations',
                        type: 'basic',
                        icon: 'heroicons_outline:location-marker',
                        link: './location-list',
                    },
                ],
            },
        ];
    }
    /**
     * On init
     */
    ngOnInit(): void {
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        combineLatest([this.route.paramMap])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.productId = Number(this.route.snapshot.paramMap.get('id'));
                this.store.dispatch(InventoryCenterDeatilsActions.LoadProductDetails({ id: this.productId }));
            });

        this.productDetailsList$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data) {
                this.productDetails = data;
                if (this.productDetails?.branchid) {
                    this.branch$.pipe(untilDestroyed(this)).subscribe(branches => {
                        const match = branches.find(branch => branch.id === this.productDetails.branchid);
                        this.selectedBranchName = match ? match.value : null;
                    });
                }
            }
        });

        this.actions$
            .pipe(ofType(InventoryCenterDeatilsActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));

        this.titleService.value$.pipe(untilDestroyed(this)).subscribe(value => {
            setTimeout(() => {
                this.title = value;
            });
        });

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
}
