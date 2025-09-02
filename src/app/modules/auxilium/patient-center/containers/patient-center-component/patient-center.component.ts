import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fadeInRight400ms } from 'app/core/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'app/core/animations/fade-in-up.animation';
import { growIn400ms } from 'app/core/animations/grow-width-in.animation';
import { scaleIn400ms } from 'app/core/animations/scale-in.animation';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { Categories } from 'app/shared/components/auxilium/categories';
import { PatientSearchFormComponent } from 'app/shared/components/patient-search-form/patient-search-form.component';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AddNewPatientFormComponent } from '../../components/patient-quick-save/patient-quick-save-form.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { AuxSidebarComponent } from '../../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';

@UntilDestroy()
@Component({
    selector: 'ac-patient-center',
    templateUrl: './patient-center.component.html',
    styleUrls: ['./patient-center.component.scss'],
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
export class PatientCenterComponent implements OnInit, OnDestroy {
    toggleMenu = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    categories = Categories;

    menuData: FuseNavigationItem[] = [
        {
            title: 'Actions',
            subtitle: 'Add Patient',
            type: 'group',
            children: [
                {
                    title: 'Search Patient',
                    type: 'basic',
                    icon: 'mat_outline:search',
                    function: () => {
                        this.openSearchModal();
                    },
                },
                {
                    title: 'Add Patient',
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
                /* {
                    title: 'Recent',
                    type: 'basic',
                    icon: 'mat_outline:access_alarm',
                    link: './recent'
                },
                {
                    title: 'Pending',
                    type: 'basic',
                    icon: 'heroicons_outline:clipboard-check',
                    link: './pending'
                },
                {
                    title: 'Inactive',
                    type: 'basic',
                    icon: 'heroicons_outline:clipboard',
                    link: './inactive'
                },
                {
                    title: 'Deleted',
                    type: 'basic',
                    icon: 'mat_outline:delete',
                    link: './deleted'
                },
                {
                    title: 'Show All',
                    type: 'basic',
                    icon: 'mat_outline:all_inclusive',
                    link: './all'
                }, */
            ],
        },
        /* {
            title: 'Categories',
            icon: 'heroicons_outline:tag',
            type: 'collapsable',
            children: []
        }, */
    ];

    searchCtrl = new UntypedFormControl();
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Tablet, Breakpoints.Handset]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private searchService: AuxSearchService,
        private _matDialog: MatDialog,
        private route: ActivatedRoute,
        private breakpointObserver: BreakpointObserver
    ) {}

    ngOnInit(): void {
        // Loop through the Categories array and build the children array
        /* for (const category of Categories) {
            const child: FuseNavigationItem = {
                title: category.name,
                type: 'basic',
                icon: 'heroicons_outline:tag',
                link: `./${category.name.toLowerCase()}`, // Link to the category page using the lowercase category name
                classes: {
                    icon: category.icon
                }
            };
            this.menuData[2].children.push(child);
        } */

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
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Add New Patient',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Ok',
            dynamicComponent: AddNewPatientFormComponent,
            dynamicComponentData: null,
            submitFunction: 'savePatient',
            enterKeyEnabled: true,
        };
        const modalRef = this._matDialog.open(AuxPopupComponent, {
            width: '700px',
            height: 'auto',
            data: popupData,
        });
    }

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }

    openSearchModal() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Patient Search',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Ok',
            dynamicComponent: PatientSearchFormComponent,
            dynamicComponentData: null,
            submitFunction: 'searchPatient',
            enterKeyEnabled: true,
        };
        const modalRef = this._matDialog.open(AuxPopupComponent, {
            width: '700px',
            height: 'auto',
            data: popupData,
        });
    }
}
