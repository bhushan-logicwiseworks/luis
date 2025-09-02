import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TitleService } from 'app/modules/auxilium/payor-center/services/title.service';
import { combineLatest } from 'rxjs';
import { FuseVerticalNavigationComponent } from '../../../../../../@fuse/components/navigation/vertical/vertical.component';

@UntilDestroy()
@Component({
    selector: 'work-order-details',
    templateUrl: './work-order-details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDrawerContainer,
        MatDrawer,
        FuseVerticalNavigationComponent,
        MatDrawerContent,
        MatIcon,
        RouterLink,
        MatIconButton,
        RouterOutlet,
    ],
})
export class WorkOrderDetailsComponent implements OnInit, OnDestroy {
    // patientDetails:any
    title: string;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    menuData: FuseNavigationItem[];

    // loading$ = this.store.select(PatientCenterDetailsSelectors.selectLoading);
    // data$ = this.route.paramMap.pipe(
    //     switchMap(paramMap => this.store.select(PatientCenterDetailsSelectors.selectPatientDetails))
    // );
    // EmployeeCenterDetailsSelectors
    // refresh = new Subject();
    // refresh$ = this.refresh.asObservable();
    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: TitleService
    ) {
        this.menuData = [
            {
                title: 'Actions',
                subtitle: '',
                type: 'group',
                children: [
                    {
                        title: 'Add/Edit Work Order',
                        type: 'basic',
                        icon: 'heroicons_outline:location-marker',
                        link: './demographics',
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
                let id = Number(this.route.snapshot.paramMap.get('id'));
                // this.store.dispatch(PatientCenterDeatilsActions.LoadPatientDetails({ id: id }));
            });

        // this.data$.pipe(
        //     untilDestroyed(this)
        // ).subscribe(data => {
        //     this.patientDetails = data;
        // });

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
