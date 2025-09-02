import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TitleService } from 'app/modules/auxilium/patient-center/services/title.service';
import { LicenseFolder } from 'app/shared/interfaces/auxilium/license-center/license-folder-interface';
import { LicenseInfo } from 'app/shared/interfaces/auxilium/license-center/license-info-interface';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, delay, switchMap } from 'rxjs';
import { LicenseCenterIndividualActions } from '../../actions/license-center-individual.actions';
import * as fromLicenseFolderActions from '../../actions/license-folder.action';
import { LicenseCenterIndividualSelectors, LicenseCenterTableSelectors } from '../../reducers';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { FuseVerticalNavigationComponent } from '../../../../../../@fuse/components/navigation/vertical/vertical.component';
import { MatIcon } from '@angular/material/icon';
import { AvatarModule } from 'ngx-avatars';
import { MatIconButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-license-center-details',
    templateUrl: './license-center-details.component.html',
    styleUrls: ['./license-center-details.component.scss'],
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
export class LicenseCenterDetailsComponent {
    licenseDetails: LicenseInfo;
    title: string;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    licenseId: string;

    loading$ = this.store.select(LicenseCenterTableSelectors.selectLoading).pipe(delay(500));
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(LicenseCenterTableSelectors.selectLicenseById))
    );
    licenseFolder$ = this.store.select(LicenseCenterIndividualSelectors.selectLicenseFolderByIdRep);
    menuData$: BehaviorSubject<FuseNavigationItem[]> = new BehaviorSubject([
        {
            title: 'Servicing Actions',
            type: 'group',
            children: [
                {
                    title: 'License',
                    type: 'basic',
                    icon: 'heroicons_outline:location-marker',
                    link: './license-details',
                    classes: {
                        wrapper: 'padding-style',
                    },
                },
            ],
        },
        {
            title: 'Folder',
            type: 'group',
            children: [],
        },
    ]);
    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private store: Store,
        private route: ActivatedRoute,
        private router: Router,
        private actions$: Actions,
        private titleService: TitleService,
        private cdr: ChangeDetectorRef
    ) {}

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

        this.data$.pipe(untilDestroyed(this)).subscribe((result: any) => {
            if (result) {
                this.licenseDetails = result;
                this.store.dispatch(LicenseCenterIndividualActions.AddLicenseFolder({ id: result.state }));
            }
        });

        this.licenseFolder$.pipe(untilDestroyed(this)).subscribe((result: LicenseFolder) => {
            if (result) {
                this.store.dispatch(fromLicenseFolderActions.setFolder({ id: result.vaultId }));
                const menuData = [
                    {
                        title: result.folderName,
                        type: 'basic',
                        link: `./license-folder`,
                        queryParams: {
                            folderId: result.folderId,
                        },
                        icon: 'heroicons_outline:folder',
                        function: () => {
                            this.store.dispatch(fromLicenseFolderActions.setFolder({ id: result.vaultId }));
                        },
                    },
                ];
                const existingMenuData = this.menuData$.getValue();
                existingMenuData[1] = {
                    ...existingMenuData[1],
                    children: cloneDeep(menuData) as FuseNavigationItem[],
                };
                this.menuData$.next(cloneDeep(existingMenuData));
                this.cdr.detectChanges();
            }
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

    /**
     * On destroy
     */
    ngOnDestroy(): void {}
}
