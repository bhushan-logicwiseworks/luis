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
import { ProofOfDeliverySearchComponent } from '../../components/proof-of-delivery-search/proof-of-delivery-search.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { AuxSidebarComponent } from '../../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';
import { RouterOutlet } from '@angular/router';

@UntilDestroy()
@Component({
    selector: 'ac-proof-of-delivery',
    templateUrl: './proof-of-delivery.component.html',
    styleUrls: ['./proof-of-delivery.component.scss'],
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
export class ProofOfDeliveryComponent implements OnInit, OnDestroy {
    drawerMode: 'over' | 'side' = 'side';
    toggleMenu = false;
    drawerOpened: boolean = true;
    menuData: FuseNavigationItem[] = [
        {
            title: 'Actions',
            subtitle: '',
            type: 'group',
            children: [
                {
                    title: 'Search POD',
                    type: 'basic',
                    icon: 'mat_outline:search',
                    function: () => {
                        this.openSearchModal();
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
        private searchService: AuxSearchService,
        private breakpointObserver: BreakpointObserver,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
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

    openSearchModal() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'POD Search',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Ok',
            dynamicComponent: ProofOfDeliverySearchComponent,
            dynamicComponentData: null,
            submitFunction: 'searchShipment',
            enterKeyEnabled: true,
        };
        const modalRef = this.dialog.open(AuxPopupComponent, {
            width: '700px',
            minHeight: 'auto',
            data: popupData,
        });
    }

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }
}
