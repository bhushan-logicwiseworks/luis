import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
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
import { EmployeeCenterIndividualAddComponent } from '../../components/employee-center-individual-add/employee-center-individual-add.component';
import { EmployeeSearchComponent } from '../../components/employee-search/employee-search.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { AuxSidebarComponent } from '../../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';
import { RouterOutlet } from '@angular/router';

@UntilDestroy()
@Component({
    selector: 'ac-employee-center',
    templateUrl: './employee-center.component.html',
    styleUrls: ['./employee-center.component.scss'],
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
export class EmployeeCenterComponent implements OnInit, OnDestroy {
    toggleMenu = false;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;

    menuData: FuseNavigationItem[] = [
        {
            title: 'Actions',
            subtitle: 'Add new team memeber',
            type: 'group',
            children: [
                {
                    title: 'Search Employee',
                    type: 'basic',
                    icon: 'mat_outline:search',
                    function: () => {
                        this.openSearchModal();
                    },
                },
                {
                    title: 'Add Employee',
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
                {
                    title: 'Active',
                    type: 'basic',
                    icon: 'heroicons_outline:clipboard-check',
                    link: './active',
                },
                {
                    title: 'Inactive',
                    type: 'basic',
                    icon: 'heroicons_outline:clipboard',
                    link: './inactive',
                },
                {
                    title: 'All',
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
            title: 'Employee Search',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Ok',
            dynamicComponent: EmployeeSearchComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: 'searchEmployee',
            enterKeyEnabled: true,
        };
        const modalRef = this.dialog.open(AuxPopupComponent, {
            width: '700px',
            minHeight: 'auto',
            data: popupData,
        });
    }

    openCreate() {
        const popupData: PopupData = {
            icon: 'mat_outline:edit_note',
            title: 'Add New Employee',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: EmployeeCenterIndividualAddComponent, // Component you want to load dynamically
            dynamicComponentData: null,
            submitFunction: 'saveEmployee',
            enterKeyEnabled: true,
        };
        const dialogRef = this.dialog.open(AuxPopupComponent, {
            width: '700px',
            height: 'auto',
            data: popupData,
        });
        // this.dialog.open(EmployeeCenterIndividualAddComponent, {
        //     width: '700px'
        // });
    }

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }
}
