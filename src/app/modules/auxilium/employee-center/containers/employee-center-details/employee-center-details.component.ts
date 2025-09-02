import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TitleService } from 'app/modules/auxilium/patient-center/services/title.service';
import { AvatarModule } from 'ngx-avatars';
import { Subject, combineLatest, filter, switchMap } from 'rxjs';
import { FuseVerticalNavigationComponent } from '../../../../../../@fuse/components/navigation/vertical/vertical.component';
import { EmployeeCenterDeatilsActions } from '../../actions/employee-center-details.action';
import { EmployeeCenterDetailsSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'employee-details',
    templateUrl: './employee-center-details.component.html',
    encapsulation: ViewEncapsulation.None,
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
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
    employeeDetails: any;
    title: string;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    menuData: FuseNavigationItem[];

    loading$ = this.store.select(EmployeeCenterDetailsSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(EmployeeCenterDetailsSelectors.selectEmployeeDetails))
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
        private router: Router,
        private actions$: Actions,
        private titleService: TitleService
    ) {
        this.menuData = [
            {
                title: 'Actions',
                subtitle: 'Employee tasks, actions & data',
                type: 'group',
                children: [
                    {
                        title: 'Demographics',
                        type: 'basic',
                        icon: 'heroicons_outline:location-marker',
                        link: './demographics',
                    },
                    {
                        title: 'Security',
                        type: 'basic',
                        icon: 'mat_outline:checklist',
                        link: './security',
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
        this.updateTitleBasedOnUrl();
        combineLatest([this.route.paramMap])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                let id = Number(this.route.snapshot.paramMap.get('id'));
                this.store.dispatch(EmployeeCenterDeatilsActions.LoadEmployeeDetails({ id: id }));
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            //console.log(data,"this is a data")
            this.employeeDetails = data;
        });
        this.actions$
            .pipe(ofType(EmployeeCenterDeatilsActions.Refresh), untilDestroyed(this))
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
