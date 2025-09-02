import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { fadeInRight400ms } from 'app/core/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'app/core/animations/fade-in-up.animation';
import { growIn400ms } from 'app/core/animations/grow-width-in.animation';
import { scaleIn400ms } from 'app/core/animations/scale-in.animation';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuxSidebarComponent } from '../../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';
import { WorkOrderCenterTableActions } from '../../actions/work-order-center-table.actions';
import { BatchEligibilityPopupComponent } from '../../components/batch-eligibility-popup/batch-eligibility-popup.component';

@UntilDestroy()
@Component({
    selector: 'ac-work-order-center',
    templateUrl: './work-order-center.component.html',
    styleUrls: ['./work-order-center.component.scss'],
    animations: [fadeInUp400ms, scaleIn400ms, fadeInRight400ms, growIn400ms],
    imports: [
        MatIcon,
        ReactiveFormsModule,
        MatIconButton,
        MatDrawerContainer,
        MatDrawer,
        AuxSidebarComponent,
        MatDrawerContent,
        RouterOutlet,
    ],
})
export class WorkOrderCenterComponent implements OnInit, OnDestroy {
    toggleMenu = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;

    menuData: FuseNavigationItem[] = [
        {
            title: 'Actions',
            subtitle: 'Add new team member',
            type: 'group',
            children: [
                {
                    title: 'Add Work Order',
                    type: 'basic',
                    icon: 'heroicons_outline:plus-circle',
                    function: () => {
                        this.openCreate();
                    },
                },
                {
                    title: 'Batch Eligibility',
                    type: 'basic',
                    icon: 'mat_outline:check_circle',
                    function: () => {
                        this.openBatchEligibilityPopup();
                    },
                },
                {
                    title: 'Clear Filter',
                    type: 'basic',
                    icon: 'heroicons_outline:trash',
                    function: () => {
                        this.clearFilter();
                    },
                },
            ],
        },
        {
            title: 'Filters',
            type: 'group',
            children: [
                {
                    title: 'EPO Ready',
                    type: 'basic',
                    icon: 'bookmark_add',
                    link: './epo',
                },
                {
                    title: 'EPO Sent',
                    type: 'basic',
                    icon: 'bookmark_added',
                    link: './eposent',
                },
                {
                    title: 'M B Lines',
                    type: 'basic',
                    icon: 'assignment',
                    link: './mblines',
                },
                {
                    title: 'P B Lines',
                    type: 'basic',
                    icon: 'assignment',
                    link: './pblines',
                },
                {
                    title: 'P Y Lines',
                    type: 'basic',
                    icon: 'assignment',
                    link: './pylines',
                },
                {
                    title: 'P Y PAST',
                    type: 'basic',
                    icon: 'assignment',
                    link: './pypast',
                },
                {
                    title: 'Monthly Marker',
                    type: 'basic',
                    icon: 'calendar_today',
                    link: './monthlymarker',
                },
                {
                    title: 'Date Variants',
                    type: 'basic',
                    icon: 'calendar_today',
                    link: './datevariants',
                },
                {
                    title: 'Auth Expired/Expiring',
                    type: 'basic',
                    icon: 'calendar_today',
                    link: './authexpiring',
                },
            ],
        },
    ];

    searchCtrl = new UntypedFormControl();

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Handset]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private searchService: AuxSearchService,
        private breakpointObserver: BreakpointObserver,
        private dialog: MatDialog,
        private router: Router,
        private store: Store,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.searchCtrl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(value => this.searchService.search.next(value));

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$.pipe(untilDestroyed(this)).subscribe(({ matchingAliases }) => {
            // Set the drawerMode and drawerOpened if
            if (matchingAliases.includes('lg')) {
                this.drawerMode = 'side';
                this.drawerOpened = true;
            } else {
                this.drawerMode = 'over';
                this.drawerOpened = false;
            }
        });
    }

    ngOnDestroy() {
        this.searchService.search.next(null);
    }

    openCreate() {
        this.router.navigate(['centers/work-order-center/add']);
        // this.dialog.open(WorkOrderAddComponent, {
        //   data: null,
        //   width: '95%',
        //   maxWidth: '100%',
        //   panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
        //   position: {
        //     top: 0 + 'px',
        //     right: 0 + 'px',
        //   },
        //   height: '100vh'
        // });
    }
    openBatchEligibilityPopup() {
        this.dialog.open(BatchEligibilityPopupComponent, {
            width: '500px',
            data: {
                title: 'Batch Eligibility',
                message: 'Enter date range for batch eligibility check.',
                actions: {
                    confirm: { label: 'Submit' },
                    cancel: { label: 'Cancel' },
                },
            },
        });
    }

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
        this.store.dispatch(WorkOrderCenterTableActions.SetWorkOrderSearch({ criteria: null }));
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {},
        });
    }
}
