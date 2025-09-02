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
import { labelColorDefs } from '../../../../../shared/constants/aux-color-constants';

@UntilDestroy()
@Component({
    selector: 'app-billing-events-center',
    templateUrl: './billing-events-center.component.html',
    styleUrls: ['./billing-events-center.component.scss'],
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
export class BillingEventsCenterComponent {
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
            title: 'Filters',
            type: 'group',
            children: [
                {
                    title: 'ALL',
                    type: 'basic',
                    icon: 'mat_outline:all_inclusive',
                    link: './all',
                    classes: {
                        wrapper: 'padding-style',
                        icon: labelColorDefs['orange'].text + ' aux-icon-size',
                    },
                },
                {
                    title: 'Primary',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    link: './primary',
                    classes: {
                        wrapper: 'padding-style',
                        icon: labelColorDefs['orange'].text + ' aux-icon-size',
                    },
                },
                {
                    title: 'Secondary',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    link: './secondary',
                    classes: {
                        wrapper: 'padding-style',
                        icon: labelColorDefs['orange'].text + ' aux-icon-size',
                    },
                },
                {
                    title: 'Insurance Refunds',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    link: './insurancerefunds',
                    classes: {
                        wrapper: 'padding-style',
                        icon: labelColorDefs['orange'].text + ' aux-icon-size',
                    },
                },
                {
                    title: 'Patient Refunds',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    link: './patientrefunds',
                    classes: {
                        wrapper: 'padding-style',
                        icon: labelColorDefs['orange'].text + ' aux-icon-size',
                    },
                },
                {
                    title: 'Insurance Paid',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    link: './insurancepaid',
                    classes: {
                        wrapper: 'padding-style',
                        icon: labelColorDefs['orange'].text + ' aux-icon-size',
                    },
                },
                {
                    title: 'Returns',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    link: './returns',
                    classes: {
                        wrapper: 'padding-style',
                        icon: labelColorDefs['orange'].text + ' aux-icon-size',
                    },
                },
                {
                    title: 'Patient Calls',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    link: './patientcalls',
                    classes: {
                        wrapper: 'padding-style',
                        icon: labelColorDefs['orange'].text + ' aux-icon-size',
                    },
                },
                {
                    title: 'Claim Calls',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    link: './claimcalls',
                    classes: {
                        wrapper: 'padding-style',
                        icon: labelColorDefs['orange'].text + ' aux-icon-size',
                    },
                },
                {
                    title: 'Appeals',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    link: './appeals',
                    classes: {
                        wrapper: 'padding-style',
                        icon: labelColorDefs['orange'].text + ' aux-icon-size',
                    },
                },
                {
                    title: 'Open AR Report',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    link: './openarreport',
                    classes: {
                        wrapper: 'padding-style',
                        icon: labelColorDefs['orange'].text + ' aux-icon-size',
                    },
                },
                {
                    title: 'Financial Assistance',
                    type: 'basic',
                    icon: 'heroicons_outline:tag',
                    link: './financialassistance',
                    classes: {
                        wrapper: 'padding-style',
                        icon: labelColorDefs['orange'].text + ' aux-icon-size',
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
