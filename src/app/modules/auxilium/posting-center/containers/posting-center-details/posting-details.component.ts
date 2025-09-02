import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TitleService } from 'app/modules/auxilium/patient-center/services/title.service';
import { combineLatest, delay, Subject, switchMap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { AvatarModule } from 'ngx-avatars';
import { FuseVerticalNavigationComponent } from '../../../../../../@fuse/components/navigation/vertical/vertical.component';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { Remits835Display } from '../../../../../shared/interfaces/auxilium/bill-center/remits-835.interface';
import { PostingCenterTableActions } from '../../actions/posting-center-table.action';
import { PostingCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-posting-details',
    templateUrl: './posting-details.component.html',
    styleUrls: ['./posting-details.component.scss'],
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
        MatIconButton,
        AvatarModule,
        RouterOutlet,
        AsyncPipe,
    ],
})
export class PostingDetailsComponent {
    postingDetails: Remits835Display;
    title: string;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    menuData: FuseNavigationItem[];
    eobId: number;

    loading$ = this.store.select(PostingCenterTableSelectors.selectLoading).pipe(delay(500));
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(PostingCenterTableSelectors.selectEOBById))
    );
    selectEOBInfo$ = this.store.select(PostingCenterTableSelectors.selectEOBInfo);
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
            // {
            //     title: 'Servicing Actions',
            //     type: 'group',
            //     children: [
            //         {
            //             title: 'Demographics',
            //             type: 'basic',
            //             icon: 'heroicons_outline:location-marker',
            //             link: './demographics',
            //             classes: {
            //                 wrapper: 'padding-style',
            //             },
            //         },
            //     ],
            // },
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
                this.eobId = Number(this.route.snapshot.paramMap.get('id'));
                this.store.dispatch(PostingCenterTableActions.LoadEOBById({ eobid: this.eobId }));
                this.store.dispatch(PostingCenterTableActions.LoadEOBDetails({ id: this.eobId }));
            });

        this.selectEOBInfo$.pipe(untilDestroyed(this)).subscribe(data => {
            this.postingDetails = data;
            // console.log(this.postingDetails);
        });
        this.actions$
            .pipe(ofType(PostingCenterTableActions.Refresh), untilDestroyed(this))
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

    getCustomInitials(name: string): string {
        if (!name || typeof name !== 'string') return '';
        const result = name.replace(/-/g, ' ').trim();
        return result;
    }
}
