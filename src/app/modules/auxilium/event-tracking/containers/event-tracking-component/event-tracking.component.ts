import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fadeInRight400ms } from 'app/core/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'app/core/animations/fade-in-up.animation';
import { growIn400ms } from 'app/core/animations/grow-width-in.animation';
import { scaleIn400ms } from 'app/core/animations/scale-in.animation';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { MultiselectMenuComponent } from '../../../../../../@fuse/components/navigation/multiselect-menu/multiselect-menu.component';
import { EventTrackingTableComponent } from '../event-tracking-table/event-tracking-table.component';

@UntilDestroy()
@Component({
    selector: 'ac-comm-center',
    templateUrl: './event-tracking.component.html',
    styleUrls: ['./event-tracking.component.scss'],
    animations: [fadeInUp400ms, scaleIn400ms, fadeInRight400ms, growIn400ms],
    imports: [
        MatIcon,
        ReactiveFormsModule,
        MatIconButton,
        MatDrawerContainer,
        MatDrawer,
        MultiselectMenuComponent,
        MatDrawerContent,
        EventTrackingTableComponent,
    ],
})
export class EventTrackingComponent implements OnInit, OnDestroy {
    toggleMenu = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;

    menuData: FuseNavigationItem[] = [
        {
            title: 'Actions',
            subtitle: 'Task, project & team',
            type: 'group',
            children: [
                {
                    title: 'Clear Filter',
                    type: 'basic',
                    icon: 'heroicons_outline:trash',
                    function: () => {
                        this.clearFilter();
                    },
                    classes: {
                        wrapper: 'padding-style',
                    },
                },
            ],
        },
        {
            title: 'FILTER STATUS',
            type: 'group',
            children: [
                {
                    title: 'Information',
                    type: 'basic',
                    icon: 'heroicons_outline:x-circle',
                    link: '/centers/event-tracking-center',
                    meta: {
                        key: 'status',
                        value: 'information',
                    },
                },
                {
                    title: 'Warning',
                    type: 'basic',
                    icon: 'heroicons_outline:user-circle',
                    link: '/centers/event-tracking-center',
                    meta: {
                        key: 'status',
                        value: 'warning',
                    },
                },
                {
                    title: 'Error',
                    type: 'basic',
                    icon: 'heroicons_outline:check-circle',
                    link: '/centers/event-tracking-center',
                    meta: {
                        key: 'status',
                        value: 'error',
                    },
                },
            ],
        },
        {
            title: 'FILTER DATE RANGE',
            type: 'group',
            children: [
                {
                    title: 'Today',
                    type: 'basic',
                    icon: 'heroicons_outline:refresh',
                    link: '/centers/event-tracking-center',
                    meta: {
                        key: 'dateRange',
                        value: 'today',
                    },
                },
                {
                    title: 'This week',
                    type: 'basic',
                    icon: 'heroicons_outline:refresh',
                    link: '/centers/event-tracking-center',
                    meta: {
                        key: 'dateRange',
                        value: 'thisweek',
                    },
                },
                {
                    title: 'This Month',
                    type: 'basic',
                    icon: 'heroicons_outline:refresh',
                    link: '/centers/event-tracking-center',
                    meta: {
                        key: 'dateRange',
                        value: 'thismonth',
                    },
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
        private dialog: MatDialog
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

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }
}
