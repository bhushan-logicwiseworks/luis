import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { Observable, map, shareReplay } from 'rxjs';
import { ItemPriceSearchFormComponent } from '../../components/item-price-search-form/item-price-search-form.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { AuxSidebarComponent } from '../../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';
import { RouterOutlet } from '@angular/router';

@UntilDestroy()
@Component({
    selector: 'app-price-center',
    templateUrl: './price-center.component.html',
    styleUrls: ['./price-center.component.scss'],
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
export class PriceCenterComponent {
    toggleMenu = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    menuData: FuseNavigationItem[] = [
        {
            title: 'Actions',
            subtitle: 'Add new Price',
            type: 'group',
            children: [
                {
                    title: 'Search Item Price List',
                    type: 'basic',
                    icon: 'mat_outline:search',
                    function: () => {
                        this.openSearchModal();
                    },
                },
                {
                    title: 'Add Item Price',
                    type: 'basic',
                    icon: 'heroicons_outline:plus-circle',
                    function: () => {
                        this.openCreate();
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
                    title: 'None',
                    type: 'basic',
                    icon: 'mat_outline:cancel_presentation',
                    link: './none',
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

    openCreate() {}

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }

    openSearchModal() {
        // const modalRef = this.dialog.open(ItemPriceSearchFormComponent, {
        //     width: '700px',
        // })

        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Item Search',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Ok',
            dynamicComponent: ItemPriceSearchFormComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: 'searchItem',
            enterKeyEnabled: true,
        };
        const modalRef = this.dialog.open(AuxPopupComponent, {
            width: '700px',
            height: 'auto',
            data: popupData,
        });
        // modalRef
        // .afterClosed()
        // .pipe(untilDestroyed(this))
        // .subscribe((result) => {
        //   console.log('Dialog closed with result:', result);
        // });
    }
}
