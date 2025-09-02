import { Component } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { PayorCenterAddComponent } from '../../components/payor-center-add/payor-center-add.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { AuxSidebarComponent } from '../../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';

@UntilDestroy()
@Component({
    selector: 'ac-payor-center.component',
    templateUrl: './payor-center.component.html',
    styleUrls: ['./payor-center-component.scss'],
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
export class PayorCenterComponent {
    searchCtrl = new UntypedFormControl();
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;

    menuData: FuseNavigationItem[] = [
        {
            title: 'Actions',
            subtitle: 'Add Payor',
            type: 'group',
            children: [
                {
                    title: 'Add Payor',
                    type: 'basic',
                    icon: 'heroicons_outline:plus-circle',
                    function: () => {
                        this.openPayor();
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
                {
                    title: 'Payor Override',
                    type: 'basic',
                    icon: 'heroicons_outline:pencil-alt',
                    link: '/centers/payor-center/payor-override',
                    exactMatch: true,
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
                    link: '/centers/payor-center',
                    exactMatch: true,
                },
            ],
        },
    ];

    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private searchService: AuxSearchService,
        private _matDialog: MatDialog,
        private router: Router
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

    openPayor() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Add New Payor',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Ok',
            dynamicComponent: PayorCenterAddComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: 'save',
            enterKeyEnabled: true,
        };
        const modalRef = this._matDialog.open(AuxPopupComponent, {
            width: '700px',
            minHeight: 'auto',
            data: popupData,
        });
        // this._matDialog.open(PayorCenterAddComponent,{
        //   width: '700px'
        // })
    }

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }
}
