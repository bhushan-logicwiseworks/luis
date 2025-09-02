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
import { ICDCodeDisplay } from 'app/shared/interfaces/auxilium/icdcode-center/icdcode.interface';
import { AvatarModule } from 'ngx-avatars';
import { combineLatest, Subject, switchMap } from 'rxjs';
import { FuseVerticalNavigationComponent } from '../../../../../../@fuse/components/navigation/vertical/vertical.component';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { IcdCodesCenterIndividualActions } from '../../actions/icdcode-center-individual.actions';
import { IcdCodeCenterTableActions } from '../../actions/icdcode-center-table.actions';
import { IcdCodesCenterIndividualSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-icdcode-center-details',
    templateUrl: './icdcode-center-details.component.html',
    styleUrls: ['./icdcode-center-details.component.scss'],
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
export class IcdCodeCenterDetailsComponent {
    icdCodeDetails: ICDCodeDisplay;
    title: string;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    menuData: FuseNavigationItem[];
    icdCodeId: number;

    loading$ = this.store.select(IcdCodesCenterIndividualSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(IcdCodesCenterIndividualSelectors.selectIcdCodeById))
    );
    EmployeeCenterDetailsSelectors;
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
                        title: 'icdcode-details',
                        type: 'basic',
                        icon: 'heroicons_outline:location-marker',
                        link: './icdcode-details',
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
        this.title = this.router.url.split('/')[5];
        this.titleService.setValue(this.title);
        this.titleService.value$.pipe(untilDestroyed(this)).subscribe(value => {
            setTimeout(() => {
                this.title = value;
            });
        });
        combineLatest([this.route.paramMap])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.icdCodeId = Number(this.route.snapshot.paramMap.get('id'));
                this.store.dispatch(IcdCodesCenterIndividualActions.LoadIcdCodeById({ id: this.icdCodeId.toString() }));
            });

        this.data$.pipe(untilDestroyed(this)).subscribe((result: any) => {
            if (result) {
                this.icdCodeDetails = result.value;
            }
        });
        this.actions$
            .pipe(ofType(IcdCodeCenterTableActions.Refresh), untilDestroyed(this))
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
