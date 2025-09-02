import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { fadeInRight400ms } from 'app/core/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'app/core/animations/fade-in-up.animation';
import { growIn400ms } from 'app/core/animations/grow-width-in.animation';
import { scaleIn400ms } from 'app/core/animations/scale-in.animation';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ShortcutCenterTableActions } from '../../action/shortcut-center-table.action';
import { AddNewShortcuteComponentComponent } from '../../components/add-new-shortcute-component/add-new-shortcute-component.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { AuxSidebarComponent } from '../../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';
import { RouterOutlet } from '@angular/router';

@UntilDestroy()
@Component({
    selector: 'app-shortcut-center-component',
    templateUrl: './shortcut-center-component.component.html',
    styleUrls: ['./shortcut-center-component.component.scss'],
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
export class ShortcutCenterComponent {
    toggleMenu = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;

    menuData: FuseNavigationItem[] = [
        {
            title: 'Actions',
            subtitle: 'Add new shortcut',
            type: 'group',
            children: [
                {
                    title: 'Add Shortcut',
                    type: 'basic',
                    icon: 'heroicons_outline:plus-circle',
                    function: () => {
                        this.openAddShortcut();
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
        private breakpointObserver: BreakpointObserver,
        private dialog: MatDialog,
        private store: Store
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

    openAddShortcut() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Add New Shortcut',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Add',
            dynamicComponent: AddNewShortcuteComponentComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: 'save',
            enterKeyEnabled: true,
        };
        const dialogRef = this.dialog.open(AuxPopupComponent, {
            width: '50%',
            height: 'auto',
            data: popupData,
        });
        dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(result => {
                this.store.dispatch(ShortcutCenterTableActions.LoadShortcut());
            });
    }

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }
}
