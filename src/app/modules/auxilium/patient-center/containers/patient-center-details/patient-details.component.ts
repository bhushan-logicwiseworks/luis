import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseConfigService } from '@fuse/services/config';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppConfig } from 'app/core/config/app.config';
import { ApexOptions } from 'app/shared/components/chart/chart.component';
import { gaugeChartOptions } from 'app/shared/constants/aux-gauge-chart-options.constant';
import { PatientValidation } from 'app/shared/interfaces/auxilium/patient-center/patient-validation.interface';
import { AvatarModule } from 'ngx-avatars';
import { combineLatest, delay, Subject, switchMap } from 'rxjs';
import { FuseVerticalNavigationComponent } from '../../../../../../@fuse/components/navigation/vertical/vertical.component';
import { ChartComponent } from '../../../../../shared/components/chart/chart.component';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { PatientCategoryComponent } from '../../../../../shared/components/patient-category/patient-category.component';
import { PatientStatusComponent } from '../../../../../shared/components/patient-status/patient-status.component';
import { labelColorDefs } from '../../../../../shared/constants/aux-color-constants';
import { PatientCenterDeatilsActions } from '../../actions/patient-details.action';
import { PatientCenterDetailsSelectors } from '../../reducers';
import { TitleService } from '../../services/title.service';

@UntilDestroy()
@Component({
    selector: 'patient-details',
    templateUrl: './patient-details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDrawerContainer,
        LoadingOverlayComponent,
        MatDrawer,
        FuseVerticalNavigationComponent,
        MatDrawerContent,
        MatIcon,
        RouterLink,
        MatIconButton,
        AvatarModule,
        PatientStatusComponent,
        PatientCategoryComponent,
        ChartComponent,
        NgClass,
        RouterOutlet,
        AsyncPipe,
        DatePipe,
    ],
})
export class PatientDetailsComponent implements OnInit, OnDestroy {
    patientDetails: any;
    countryFlag: string = 'US';
    title: string;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    menuData: FuseNavigationItem[];
    patientId: number;
    chartOptions: Partial<ApexOptions>;
    gaugeOptions: ApexOptions = {
        ...gaugeChartOptions,
        series: [0],
    };
    patientValidationResp: PatientValidation;
    loading$ = this.store.select(PatientCenterDetailsSelectors.selectLoading).pipe(delay(500));
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(PatientCenterDetailsSelectors.selectPatientDetails))
    );
    patientValidation$ = this.store.select(PatientCenterDetailsSelectors.selectPatientValidation);

    EmployeeCenterDetailsSelectors;
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    /**
     * Constructor
     */
    constructor(
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private store: Store,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private actions$: Actions,
        private _fuseConfigService: FuseConfigService,
        private titleService: TitleService
    ) {
        this.menuData = [
            {
                title: 'Tools',
                subtitle: '',
                classes: {
                    // Match the style of 'Servicing Actions'
                    title: 'uppercase font-bold ' + labelColorDefs['red'].text,
                },
                type: 'collapsable',
                children: [
                    {
                        title: 'Quick Fax Tool',
                        type: 'basic',
                        icon: 'mat_outline:print',
                        link: './quickfaxtool',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['yellow'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Insurance Verification',
                        type: 'basic',
                        icon: 'mat_outline:verified',
                        link: './efirst',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['purple'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Emails & Texts Sent',
                        type: 'basic',
                        icon: 'mat_outline:mark_email_read',
                        link: './automated-emails-sent',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Prefilled/Editable SWO',
                        type: 'basic',
                        icon: 'feather:edit',
                        link: './prefilled-editable-swo',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['pink'].text + ' aux-icon-size',
                        },
                    },
                ],
            },
            {
                title: 'Servicing Actions',
                //subtitle: 'Patient tasks, actions & data',
                type: 'group',
                children: [
                    {
                        title: 'Demographics',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-document-list',
                        link: './demographics',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['red'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Physicians',
                        type: 'basic',
                        icon: 'heroicons_outline:users',
                        link: './physicians',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['lime'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Checklists',
                        type: 'basic',
                        icon: 'mat_outline:checklist',
                        link: './checklists',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['yellow'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Payors',
                        type: 'basic',
                        icon: 'heroicons_outline:cash',
                        link: './payors',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['sky'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Diagnosis Codes',
                        type: 'basic',
                        icon: 'mat_outline:document_scanner',
                        link: './diagnosis-codes',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['purple'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Alternate Addresses',
                        type: 'basic',
                        icon: 'heroicons_outline:home',
                        link: './alternate-addresses',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['teal'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Documents',
                        type: 'basic',
                        icon: 'heroicons_outline:document-duplicate',
                        link: './documents',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['green'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Order History',
                        type: 'basic',
                        icon: 'heroicons_outline:shopping-bag',
                        link: './order-history',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['rose'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Contact Notes',
                        type: 'basic',
                        icon: 'heroicons_outline:annotation',
                        link: './contact-notes',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Work Order',
                        type: 'basic',
                        icon: 'mat_outline:inventory',
                        link: './work-order',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Additional Contacts',
                        type: 'basic',
                        icon: 'mat_outline:health_and_safety',
                        link: './additional-contacts',
                        classes: {
                            wrapper: 'padding-style',
                            icon: 'aux-icon-size',
                        },
                    },
                    {
                        title: 'Compliance',
                        type: 'basic',
                        icon: 'heroicons_outline:exclamation-triangle',
                        link: './compliance',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Care Management',
                        type: 'basic',
                        icon: 'heroicons_outline:heart',
                        link: './caremanagement',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['purple'].text + ' aux-icon-size',
                        },
                    },
                ],
            },
            {
                title: 'Billing Actions',
                subtitle: '',
                type: 'group',
                classes: {
                    // Match the style of 'Tools'
                    title: 'uppercase font-bold ' + labelColorDefs['green'].text,
                },
                children: [
                    {
                        title: 'Charges',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-document-list',
                        link: './charges',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['green'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'AR History',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-document-list',
                        link: './ar-history',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['green'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Inquiry/Changes',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-document-list',
                        link: './inquiry-changes',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['green'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Payments & Adjustments',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-document-list',
                        link: './payments-adjustments',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['green'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Collection Notes',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-document-list',
                        link: './collection-notes',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['green'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Audit Event',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-document-list',
                        link: './audit-event',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['green'].text + ' aux-icon-size',
                        },
                    },
                ],
            },
            {
                title: 'Billing Events',
                subtitle: '',
                type: 'group',
                classes: {
                    // Match the style of 'Tools'
                    title: 'uppercase font-bold ' + labelColorDefs['blue'].text,
                },
                children: [
                    {
                        title: 'Primary',
                        type: 'basic',
                        icon: 'mat_outline:receipt_long',
                        link: './primary',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Secondary',
                        type: 'basic',
                        icon: 'mat_outline:receipt_long',
                        link: './secondary',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Insurance Refunds',
                        type: 'basic',
                        icon: 'mat_outline:receipt_long',
                        link: './insurancerefunds',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Patient Refunds',
                        type: 'basic',
                        icon: 'mat_outline:receipt_long',
                        link: './patientrefunds',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Insurance Paid',
                        type: 'basic',
                        icon: 'mat_outline:receipt_long',
                        link: './insurancepaid',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Returns',
                        type: 'basic',
                        icon: 'mat_outline:receipt_long',
                        link: './returns',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Patient Calls',
                        type: 'basic',
                        icon: 'mat_outline:receipt_long',
                        link: './patientcalls',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Claim Calls',
                        type: 'basic',
                        icon: 'mat_outline:receipt_long',
                        link: './claimcalls',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Appeals',
                        type: 'basic',
                        icon: 'mat_outline:receipt_long',
                        link: './appeals',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Open AR Report',
                        type: 'basic',
                        icon: 'mat_outline:receipt_long',
                        link: './openarreport',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                    {
                        title: 'Financial Assistance',
                        type: 'basic',
                        icon: 'mat_outline:receipt_long',
                        link: './financialassistance',
                        classes: {
                            wrapper: 'padding-style',
                            icon: labelColorDefs['blue'].text + ' aux-icon-size',
                        },
                    },
                ],
            },
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);

        this.titleService.value$.pipe(untilDestroyed(this)).subscribe(value => {
            setTimeout(() => {
                this.title = value;
            });
        });
        combineLatest([this.route.paramMap])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.patientId = Number(this.route.snapshot.paramMap.get('id'));
                this.store.dispatch(PatientCenterDeatilsActions.LoadPatientValidation({ id: this.patientId }));
                this.store.dispatch(PatientCenterDeatilsActions.LoadPatientDetails({ id: this.patientId }));
            });
        this.patientValidation$.pipe(untilDestroyed(this)).subscribe(result => {
            if (result) {
                this.patientValidationResp = result;
                this.updateGaugeOptions();
                this.cdr.markForCheck();
            }
        });

        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            if (data) {
                this.patientDetails = data;
                if (this.patientDetails) {
                    this.getIcon(this.patientDetails!.language);
                }
            }
        });

        this.actions$
            .pipe(ofType(PatientCenterDeatilsActions.Refresh), untilDestroyed(this))
            .subscribe(value => this.refresh.next(value));

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$.pipe(untilDestroyed(this)).subscribe(({ matchingAliases }) => {
            // Set the drawerMode and drawerOpened
            if (matchingAliases.includes('lg')) {
                this.drawerMode = 'side';
                this.drawerOpened = true;
            } else {
                this.drawerMode = 'over';
                this.drawerOpened = false;
            }
        });
    }
    updateGaugeOptions(): void {
        let PercentageColor = '#000000';
        this._fuseConfigService.config$.pipe(untilDestroyed(this)).subscribe((config: AppConfig) => {
            if (config.scheme === 'dark') {
                PercentageColor = '#FFFFFF';
            }
        });
        const percent = this.patientValidationResp?.percent || 0;
        this.gaugeOptions = {
            ...gaugeChartOptions,
            chart: {
                ...gaugeChartOptions.chart,
                height: 150,
                offsetY: -8,
            },
            plotOptions: {
                ...gaugeChartOptions.plotOptions,
                radialBar: {
                    ...gaugeChartOptions.plotOptions.radialBar,
                    dataLabels: {
                        ...gaugeChartOptions.plotOptions.radialBar.dataLabels,
                        value: {
                            ...gaugeChartOptions.plotOptions.radialBar.dataLabels.value,
                            fontSize: '1.2rem',
                            color: PercentageColor,
                        },
                    },
                },
            },
            fill: {
                colors: [this.getGaugeColor(percent)],
            },
        };
    }

    getGaugeColor(value: number): string {
        if (value === 100) {
            // If validation is at 100%, show green
            return '#22c55e';
        } else if (value >= 50 && value <= 99) {
            // Between 50% - 99%, show blue
            return '#FFA500';
        } else {
            // Less than 50%, show red
            return '#FF0000';
        }
    }

    getIcon(language: string) {
        if (language == 'ENGLISH') {
            this.countryFlag = 'US';
        } else if (language == 'SPANISH') {
            this.countryFlag = 'ES';
        } else {
            this.countryFlag = 'US';
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {}
}
