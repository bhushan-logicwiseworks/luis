import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { map, Observable, shareReplay } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { AuxSidebarComponent } from '../../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';
import { RouterOutlet } from '@angular/router';

@UntilDestroy()
@Component({
    selector: 'app-Compliance-center',
    templateUrl: './Compliance-center.component.html',
    styleUrl: './Compliance-center.component.scss',
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
export class ComplianceCenterComponent implements OnInit, OnDestroy {
    toggleMenu = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;

    menuData: FuseNavigationItem[] = [
        {
            title: 'Actions',
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
            title: 'Filters ',
            type: 'group',
            children: [
                {
                    title: 'ALL',
                    type: 'basic',
                    icon: 'mat_outline:all_inclusive',
                    link: './all',
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
        private breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit(): void {
        this.searchCtrl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(value => this.searchService.search.next(value));

        this._fuseMediaWatcherService.onMediaChange$.pipe(untilDestroyed(this)).subscribe(({ matchingAliases }) => {
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
