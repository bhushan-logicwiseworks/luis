import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuxSidebarComponent } from '../../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';

@UntilDestroy()
@Component({
    selector: 'app-bill-center',
    templateUrl: './bill-center.component.html',
    styleUrls: ['./bill-center.component.scss'],
    imports: [
        CommonModule,
        RouterModule,
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
export class BillCenterComponent {
    toggleMenu = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;

    menuData: FuseNavigationItem[] = [
        {
            title: 'Actions',
            subtitle: 'Clear Filter',
            type: 'group',
            children: [
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
                    title: 'Dashboard',
                    type: 'basic',
                    icon: 'mat_outline:dashboard',
                    link: './dashboard',
                },
                {
                    title: 'WorkOrders',
                    icon: 'heroicons_outline:tag',
                    type: 'collapsable',
                    children: [
                        {
                            title: 'All',
                            type: 'basic',
                            icon: '',
                            link: './work-orders-all',
                        },
                        {
                            title: 'With POD',
                            type: 'basic',
                            icon: '',
                            link: './work-orders-with-pod',
                        },
                        {
                            title: 'Without POD',
                            type: 'basic',
                            icon: '',
                            link: './work-orders-without-pod',
                        },
                    ],
                },
                {
                    title: 'Charges',
                    type: 'basic',
                    icon: 'mat_outline:playlist_add_check',
                    link: './charges-readyfor-claims',
                },
                {
                    title: 'Claims',
                    type: 'basic',
                    icon: 'mat_outline:playlist_add_check',
                    link: './validation-readyfor-claims',
                },
                {
                    title: 'Held Items',
                    type: 'basic',
                    icon: 'mat_outline:playlist_add_check',
                    link: './held-items-report',
                },
                {
                    title: 'Claims For 837',
                    type: 'basic',
                    icon: 'mat_outline:playlist_add_check',
                    link: './claims-for-837',
                },
            ],
        },
        {
            title: 'Reports',
            type: 'group',
            children: [
                {
                    title: 'Aging Report',
                    type: 'basic',
                    icon: 'heroicons_outline:document-duplicate',
                    link: './aging-report',
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
        private auxSearchService: AuxSearchService,
        private breakpointObserver: BreakpointObserver,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.searchCtrl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(value => this.auxSearchService.search.next(value));

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
        this.auxSearchService.search.next(null);
    }

    clearFilter() {
        this.auxSearchService.resetFilter.next({ resetGrid: true });
    }
}
