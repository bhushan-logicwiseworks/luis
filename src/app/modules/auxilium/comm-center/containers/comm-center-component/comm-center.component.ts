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
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CommCenterCreateComponent } from '../../components/comm-center-create/comm-center-create.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { AuxSidebarComponent } from '../../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';
import { RouterOutlet } from '@angular/router';

@UntilDestroy()
@Component({
    selector: 'ac-comm-center',
    templateUrl: './comm-center.component.html',
    styleUrls: ['./comm-center.component.scss'],
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
export class CommCenterComponent implements OnInit, OnDestroy {
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
                    title: 'Create Task',
                    type: 'basic',
                    icon: 'heroicons_outline:plus-circle',
                    function: () => {
                        this.openCreate();
                    },
                    classes: {
                        wrapper: 'padding-style',
                    },
                },
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
            title: 'MY WORK',
            type: 'group',
            children: [
                {
                    title: 'My Inbox',
                    type: 'basic',
                    icon: 'heroicons_outline:mail',
                    link: './my-inbox',
                    classes: {
                        wrapper: 'padding-style',
                    },
                },
            ],
        },
        {
            title: 'BROWSE',
            type: 'group',
            children: [
                {
                    title: 'Unassigned',
                    type: 'basic',
                    icon: 'heroicons_outline:x-circle',
                    link: './unassigned',
                    classes: {
                        wrapper: 'padding-style',
                    },
                },
                {
                    title: 'By Owner',
                    type: 'basic',
                    icon: 'heroicons_outline:user-circle',
                    link: './by-owner',
                    classes: {
                        wrapper: 'padding-style',
                    },
                },
                {
                    title: 'Completed',
                    type: 'basic',
                    icon: 'mat_outline:playlist_add_check',
                    link: './completed',
                    classes: {
                        wrapper: 'padding-style',
                    },
                },
                {
                    title: 'Deleted',
                    type: 'basic',
                    icon: 'mat_outline:delete_sweep',
                    link: './deleted',
                    classes: {
                        wrapper: 'padding-style',
                    },
                },
            ],
        },
        {
            title: 'BY SOURCE',
            type: 'group',
            children: [
                {
                    title: 'APP',
                    type: 'basic',
                    icon: 'heroicons_outline:refresh',
                    link: './app',
                    classes: {
                        wrapper: 'padding-style',
                    },
                },
                {
                    title: 'Fast',
                    type: 'basic',
                    icon: 'heroicons_outline:refresh',
                    link: './fast',
                    classes: {
                        wrapper: 'padding-style',
                    },
                },
                {
                    title: 'Self',
                    type: 'basic',
                    icon: 'heroicons_outline:refresh',
                    link: './self',
                    classes: {
                        wrapper: 'padding-style',
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

    openCreate() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'Create Task',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Create',
            dynamicComponent: CommCenterCreateComponent,
            dynamicComponentData: { patientId: 0 },
            submitFunction: 'submit',
            enterKeyEnabled: true,
        };
        this.dialog
            .open(AuxPopupComponent, {
                width: '800px',
                maxWidth: '100%',
                panelClass: ['animate__animated', 'animate__slideInRight', 'animated', 'custom-container'],
                position: {
                    top: 0 + 'px',
                    right: 0 + 'px',
                },
                height: '100vh',
                data: popupData,
            })
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {});
    }
}
