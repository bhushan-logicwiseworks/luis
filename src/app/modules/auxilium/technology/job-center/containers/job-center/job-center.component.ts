import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fadeInRight400ms } from 'app/core/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'app/core/animations/fade-in-up.animation';
import { growIn400ms } from 'app/core/animations/grow-width-in.animation';
import { scaleIn400ms } from 'app/core/animations/scale-in.animation';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { AuxPopupComponent, PopupData } from 'app/shared/components/auxilium/aux-popup/aux-popup.component';
import { Subject } from 'rxjs';
import { JobIndividualFormComponent } from '../../components/job-individual-form/job-individual-form.component';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDrawerContainer, MatDrawer, MatDrawerContent } from '@angular/material/sidenav';
import { AuxSidebarComponent } from '../../../../../../shared/components/auxilium/aux-sidebar/aux-sidebar.component';
import { RouterOutlet } from '@angular/router';

@UntilDestroy()
@Component({
    selector: 'ac-job-center',
    templateUrl: './job-center.component.html',
    styleUrls: ['./job-center.component.scss'],
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
export class JobCenterComponent implements OnInit, OnDestroy {
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    toggleMenu = false;
    searchCtrl = new UntypedFormControl();

    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    menuData: FuseNavigationItem[] = [
        {
            title: 'Actions',
            subtitle: 'Add Job',
            type: 'group',
            children: [
                {
                    title: 'Add Job',
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
            title: 'Browse',
            type: 'group',
            children: [
                {
                    title: 'All Jobs',
                    type: 'basic',
                    icon: 'mat_outline:all_inclusive',
                    link: './all',
                },
            ],
        },
        /* {
            title: 'By Type',
            type: 'group',
            children: [
                {
                    title: 'Hourly',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    classes: {
                        icon: labelColorDefs['blue'].text,
                        wrapper: 'padding-style'
                    },
                    link: './hourly'
                },
                {
                    title: 'Daily',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    classes: {
                        icon: labelColorDefs['orange'].text,
                        wrapper: 'padding-style'
                    },
                    link: './daily'
                },
                {
                    title: 'Weekly',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    classes: {
                        icon: labelColorDefs['purple'].text,
                        wrapper: 'padding-style'
                    },
                    link: './weekly'
                }
            ]
        },
        {
            title: 'By Status',
            type: 'group',
            children: [
                {
                    title: 'Success',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    classes: {
                        icon: labelColorDefs['green'].text,
                        wrapper: 'padding-style'
                    },
                    link: './success'
                },
                {
                    title: 'Fail',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    classes: {
                        icon: labelColorDefs['red'].text,
                        wrapper: 'padding-style'
                    },
                    link: './fail'
                },
            ]
        }, */
    ];

    constructor(
        private searchService: AuxSearchService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.searchCtrl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(value => this.searchService.search.next(value));
    }

    openCreate() {
        const popupData: PopupData = {
            icon: 'mat_outline:assignment',
            iconColor: 'primary',
            title: 'ADD JOB',
            titleColor: 'text-secondary',
            cancelButtonText: 'Cancel',
            saveButtonText: 'Save',
            dynamicComponent: JobIndividualFormComponent,
            dynamicComponentData: null,
            submitFunction: 'saveJob',
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

    clearFilter() {
        this.searchService.resetFilter.next({ resetGrid: true });
    }

    ngOnDestroy() {
        this.searchService.search.next(null);
    }
}
