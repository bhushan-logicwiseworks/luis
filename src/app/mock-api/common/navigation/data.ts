/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
import { labelColorDefs } from 'app/shared/constants/aux-color-constants';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        subtitle: 'Unique dashboard designs',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'dashboards.project',
                title: 'Project',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-check',
                link: '/dashboards/project',
            },
        ],
    },
    // user center
    {
        id: 'user',
        title: 'User Center',
        subtitle: 'Custom made user Center designs',
        type: 'group',
        icon: 'heroicons_outline:document',
        children: [
            {
                id: 'user.user-settings',
                title: 'Settings',
                type: 'basic',
                icon: 'heroicons_outline:cog',
                link: '/user-center/settings',
            },
            {
                id: 'user.user-settings',
                title: 'Profile',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/user-center/profile',
            },
        ].sort((a, b) => a.title.localeCompare(b.title)) as FuseNavigationItem[],
    },
    {
        id: 'iam',
        title: 'IAM',
        subtitle: 'Identity and Access Management',
        type: 'group',
        icon: 'heroicons_outline:lock-closed',
        children: [
            {
                id: 'iam.users',
                title: 'Identity',
                type: 'basic',
                icon: 'mat_outline:manage_accounts',
                link: '/centers/identity-center',
            },
            {
                id: 'iam.access',
                title: 'AccessCenter',
                type: 'basic',
                icon: 'mat_outline:admin_panel_settings',
                link: '/centers/access-center',
            },
        ].sort((a, b) => a.title.localeCompare(b.title)) as FuseNavigationItem[],
    },
    {
        id: 'company',
        title: 'Company',
        subtitle: 'Company',
        type: 'group',
        icon: 'mat_outline:corporate_fare',
        children: [
            {
                id: 'company.abbott',
                title: 'AbbottCenter',
                type: 'basic',
                icon: 'mat_outline:maps_home_work',
                link: '/company/abbott-center',
            },
            {
                id: 'company.dexcom',
                title: 'DexcomCenter',
                type: 'basic',
                icon: 'mat_outline:maps_home_work',
                link: '/company/dexcom-center',
            },
            {
                id: 'company.analytics',
                title: 'AnalyticsCenter',
                type: 'basic',
                icon: 'mat_outline:stacked_bar_chart',
                link: '/company/analytics-center',
            },
            {
                id: 'centers.employee',
                title: 'EmployeeCenter',
                type: 'basic',
                icon: 'mat_outline:people',
                link: '/centers/employee-center',
                classes: {
                    icon: labelColorDefs['green'].text,
                },
            },
            {
                id: 'company.license',
                title: 'LicenseCenter',
                type: 'basic',
                icon: 'mat_outline:admin_panel_settings',
                link: '/company/license-center',
            },
            {
                id: 'company.mapcenter',
                title: 'MapCenter',
                type: 'basic',
                icon: 'mat_outline:map',
                link: '/company/map-center',
            },
            {
                id: 'centers.onboarding',
                title: 'OnboardingCenter',
                type: 'basic',
                icon: 'mat_outline:keyboard',
                link: '/centers/onboarding-center',
            },
            {
                id: 'company.patientportal',
                title: 'Patient Portal',
                type: 'basic',
                icon: 'mat_outline:important_devices',
                link: '/company/patient-portal',
            },
            {
                id: 'company.proofofdelivery',
                title: 'Proof of Delivery',
                type: 'basic',
                icon: 'mat_outline:local_shipping',
                link: '/company/proof-of-delivery',
            },
            {
                id: 'centers.reporting',
                title: 'ReportingCenter',
                type: 'basic',
                icon: 'mat_outline:print',
                link: '/centers/reporting-center',
            },
            {
                id: 'centers.retentionRate',
                title: 'Retention Rate',
                type: 'basic',
                icon: 'mat_outline:keyboard',
                link: '/company/retention-rate-center',
            },
            {
                id: 'centers.sales',
                title: 'SalesCenter',
                type: 'basic',
                icon: 'mat_outline:bar_chart',
                link: '/centers/sales-center',
            },
            {
                id: 'centers.team',
                title: 'Team',
                type: 'basic',
                icon: 'heroicons_outline:user',
                link: '/company/team-center',
            },
            {
                id: 'centers.vault',
                title: 'VaultCenter',
                type: 'basic',
                icon: 'mat_outline:account_balance',
                link: '/centers/vault-center',
                classes: {
                    icon: labelColorDefs['yellow'].text + ' aux-icon-size',
                },
            },
        ].sort((a, b) => a.title.localeCompare(b.title)) as FuseNavigationItem[],
    },
    {
        id: 'centers',
        title: 'Applications',
        subtitle: 'Custom made application designs',
        type: 'group',
        icon: 'heroicons_outline:home',
        classes: {
            icon: labelColorDefs['pink'].text,
        },
        children: [
            {
                id: 'centers.bill',
                title: 'BillCenter',
                type: 'basic',
                icon: 'heroicons_outline:clipboard-document-list',
                link: '/centers/bill-center',
                classes: {
                    icon: labelColorDefs['green'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.billing-events',
                title: 'BillingEventsCenter',
                type: 'basic',
                icon: 'mat_outline:receipt_long',
                link: '/centers/billing-events-center',
                classes: {
                    icon: labelColorDefs['blue'].text + ' aux-icon-size',
                },
            },
            /* {
                id: 'centers.billing',
                title: 'BillingCenter',
                type: 'basic',
                icon: 'mat_outline:receipt_long',
                link: '/centers/billing-center',
            }, */
            {
                id: 'centers.charges',
                title: 'ChargesCenter',
                type: 'basic',
                icon: 'mat_outline:monetization_on',
                link: '/centers/charges-center',
                classes: {
                    icon: labelColorDefs['green'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.intake',
                title: 'IntakeCenter',
                type: 'basic',
                icon: 'mat_outline:all_inbox',
                link: '/centers/intake-center',
            },
            {
                id: 'centers.comm',
                title: 'CommCenter',
                type: 'basic',
                icon: 'mat_outline:move_to_inbox',
                link: '/centers/comm-center',
                classes: {
                    icon: labelColorDefs['blue'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.compliance',
                title: 'ComplianceCenter',
                type: 'basic',
                icon: 'heroicons_outline:exclamation-triangle',
                link: '/centers/compliance-center',
                classes: {
                    icon: labelColorDefs['orange'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.caremanagement',
                title: 'CareManagementCenter',
                type: 'basic',
                icon: 'heroicons_outline:heart',
                link: '/centers/caremanagement-center',
                classes: {
                    icon: labelColorDefs['purple'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.audit',
                title: 'AuditCenter',
                type: 'basic',
                icon: 'heroicons_outline:eye',
                link: '/centers/audit-center',
                classes: {
                    icon: labelColorDefs['green'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.patient',
                title: 'PatientCenter',
                type: 'basic',
                icon: 'mat_outline:local_hotel',
                link: '/centers/patient-center',
                classes: {
                    icon: labelColorDefs['pink'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.payor',
                title: 'PayorCenter',
                type: 'basic',
                icon: 'heroicons_outline:cash',
                link: '/centers/payor-center',
                classes: {
                    icon: labelColorDefs['sky'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.physician',
                title: 'PhysicianCenter',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/centers/physician-center',
                classes: {
                    icon: labelColorDefs['lime'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.posting',
                title: 'PostingCenter',
                type: 'basic',
                icon: 'mat_outline:receipt_long',
                link: '/centers/posting-center',
                classes: {
                    icon: labelColorDefs['red'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.price',
                title: 'PriceCenter',
                type: 'basic',
                icon: 'mat_outline:price_change',
                link: '/centers/price-center',
            },
            {
                id: 'centers.referral',
                title: 'ReferralCenter',
                type: 'basic',
                icon: 'mat_outline:home_work',
                link: '/centers/referral-center',
                classes: {
                    icon: labelColorDefs['lime'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.reorder',
                title: 'ReorderCenter',
                type: 'basic',
                icon: 'mat_outline:autorenew',
                link: '/centers/reorder-center',
                classes: {
                    icon: labelColorDefs['purple'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.shortcut',
                title: 'ShortcutCenter',
                type: 'basic',
                icon: 'mat_outline:shortcut',
                link: '/centers/shortcut-center',
                classes: {
                    icon: labelColorDefs['rose'].text + ' aux-icon-size',
                },
            },
            {
                id: 'centers.workorder',
                title: 'WorkOrderCenter',
                type: 'basic',
                icon: 'mat_outline:inventory',
                link: '/centers/work-order-center',
                classes: {
                    icon: labelColorDefs['orange'].text + ' aux-icon-size',
                },
            },
        ],
        // .sort((a, b) => a.title.localeCompare(b.title)) as FuseNavigationItem[],
    },
    {
        id: 'settings',
        title: 'Settings',
        subtitle: 'Application Settings',
        type: 'group',
        icon: 'mat_outline:settings',
        children: [
            {
                id: 'centers.billType',
                title: 'BillTypeCenter',
                type: 'basic',
                icon: 'mat_outline:keyboard',
                link: '/centers/billType-center',
            },
            {
                id: 'centers.branch',
                title: 'BranchCenter',
                type: 'basic',
                icon: 'mat_outline:holiday_village',
                link: '/centers/branch-center',
            },
            {
                id: 'centers.company',
                title: 'CompanyCenter',
                type: 'basic',
                icon: 'mat_outline:business',
                link: '/centers/company-center',
            },
            {
                id: 'centers.code',
                title: 'CodeCenter',
                type: 'basic',
                icon: 'mat_outline:format_list_numbered',
                link: '/centers/code-center',
            },
            {
                id: 'centers.Configuration',
                title: 'ConfigurationCenter',
                type: 'basic',
                icon: 'mat_outline:settings',
                link: '/centers/configuration-center',
            },
            {
                id: 'centers.hotKeys',
                title: 'HotKeysCenter',
                type: 'basic',
                icon: 'mat_outline:keyboard',
                link: '/centers/hotkeys-center',
            },
            {
                id: 'centers.icdcode',
                title: 'ICDCodeCenter',
                type: 'basic',
                icon: 'mat_outline:qr_code',
                link: '/centers/icdcode-center',
            },
            {
                id: 'centers.inventory',
                title: 'InventoryCenter',
                type: 'basic',
                icon: 'mat_outline:inventory_2',
                link: '/centers/inventory-center',
            },
            {
                id: 'centers.siteSettings',
                title: 'Site Settings',
                type: 'basic',
                icon: 'heroicons_outline:cog',
                link: '/company/site-settings',
            },
            {
                id: 'company.territory',
                title: 'TerritoryTransfer',
                type: 'basic',
                icon: 'mat_outline:compare_arrows',
                link: '/centers/territory',
                classes: {
                    icon: labelColorDefs['red'].text,
                },
            },
            {
                id: 'company.validation',
                title: 'ValidationCenter',
                type: 'basic',
                icon: 'mat_outline:inventory',
                link: '/centers/validation-center',
            },
            {
                id: 'centers.vendor',
                title: 'VendorCenter',
                type: 'basic',
                icon: 'heroicons_outline:truck',
                link: '/centers/vendor-center',
            },
            {
                id: 'centers.zipcode',
                title: 'ZipCodeCenter',
                type: 'basic',
                icon: 'mat_outline:location_on',
                link: '/centers/zipcode-center',
            },
        ],
        // .sort((a, b) => a.title.localeCompare(b.title)) as FuseNavigationItem[],
    },
    {
        id: 'technology',
        title: 'Technology',
        subtitle: 'Technology',
        type: 'group',
        icon: 'mat_outline:computer',
        children: [
            {
                id: 'technology.dashboard',
                title: 'IT Dashboard',
                type: 'basic',
                icon: 'mat_outline:network_check',
                link: '/technology/it-dashboard',
                classes: {
                    icon: labelColorDefs['green'].text,
                },
            },
            {
                id: 'technology.jobcenter',
                title: 'JobCenter',
                type: 'basic',
                icon: 'mat_outline:alarm',
                link: '/technology/job-center',
                classes: {
                    icon: labelColorDefs['blue'].text,
                },
            },
            {
                id: 'centers.comm',
                title: 'EventTrackingCenter',
                type: 'basic',
                icon: 'mat_outline:bug_report',
                link: '/centers/event-tracking-center',
                classes: {
                    icon: labelColorDefs['red'].text,
                },
            },
        ].sort((a, b) => a.title.localeCompare(b.title)) as FuseNavigationItem[],
    },
    {
        id: 'apps',
        title: 'Applications',
        subtitle: 'Custom made application designs',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'apps.academy',
                title: 'Academy',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/apps/academy',
            },
            {
                id: 'apps.help-center',
                title: 'Help Center',
                type: 'collapsable',
                icon: 'heroicons_outline:support',
                link: '/apps/help-center',
                children: [
                    {
                        id: 'apps.help-center.home',
                        title: 'Home',
                        type: 'basic',
                        link: '/apps/help-center',
                        exactMatch: true,
                    },
                    {
                        id: 'apps.help-center.faqs',
                        title: 'FAQs',
                        type: 'basic',
                        link: '/apps/help-center/faqs',
                    },
                    {
                        id: 'apps.help-center.guides',
                        title: 'Guides',
                        type: 'basic',
                        link: '/apps/help-center/guides',
                    },
                    {
                        id: 'apps.help-center.support',
                        title: 'Support',
                        type: 'basic',
                        link: '/apps/help-center/support',
                    },
                ],
            },
        ].sort((a, b) => a.title.localeCompare(b.title)) as FuseNavigationItem[],
    },
    {
        id: 'divider-1',
        type: 'divider',
    },
    {
        id: 'internal-dashboard',
        title: 'Internal Dashboard',
        subtitle: 'Internal dashboard designs',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/internal-dashboard',
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        tooltip: 'Dashboards',
        type: 'aside',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // user center
    {
        id: 'user',
        title: 'User Center',
        tooltip: 'User Center',
        type: 'aside',
        icon: 'heroicons_outline:user',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'iam',
        title: 'IAM',
        tooltip: 'IAM',
        type: 'aside',
        icon: 'heroicons_outline:lock-closed',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'company',
        title: 'Company',
        tooltip: 'Company',
        type: 'aside',
        icon: 'mat_outline:corporate_fare',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'centers',
        title: 'Centers',
        tooltip: 'Centers',
        type: 'aside',
        icon: 'mat_outline:adjust',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'technology',
        title: 'Technology',
        tooltip: 'Technology',
        type: 'aside',
        icon: 'mat_outline:computer',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'settings',
        title: 'Settings',
        tooltip: 'Settings',
        type: 'aside',
        icon: 'mat_outline:settings',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        tooltip: 'Apps',
        type: 'aside',
        icon: 'mat_outline:apps',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'internal-dashboard',
        title: 'Internal Dashboard',
        tooltip: 'Internal Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:template',
        link: '/internal-dashboard',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'DASHBOARDS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // user center
    {
        id: 'user',
        title: 'User Center',
        type: 'aside',
        icon: 'heroicons_outline:user',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // ===
    {
        id: 'iam',
        title: 'IAM',
        tooltip: 'IAM',
        type: 'aside',
        icon: 'heroicons_outline:lock-closed',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'company',
        title: 'Company',
        tooltip: 'Company',
        type: 'aside',
        icon: 'mat_outline:corporate_fare',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'centers',
        title: 'Centers',
        type: 'group',
        icon: 'mat_outline:adjust',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'technology',
        title: 'Technology',
        tooltip: 'Technology',
        type: 'aside',
        icon: 'mat_outline:computer',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'settings',
        title: 'Settings',
        tooltip: 'Settings',
        type: 'aside',
        icon: 'mat_outline:settings',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        tooltip: 'Apps',
        type: 'aside',
        icon: 'mat_outline:apps',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'others',
        title: 'OTHERS',
        type: 'group',
    },
    {
        id: 'internal-dashboard',
        title: 'Internal Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user',
        title: 'User Center',
        type: 'group',
        icon: 'heroicons_outline:user',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'iam',
        title: 'IAM',
        tooltip: 'IAM',
        type: 'aside',
        icon: 'heroicons_outline:lock-closed',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'company',
        title: 'Company',
        tooltip: 'Company',
        type: 'aside',
        icon: 'mat_outline:corporate_fare',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'centers',
        title: 'Centers',
        type: 'group',
        icon: 'mat_outline:adjust',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'technology',
        title: 'Technology',
        tooltip: 'Technology',
        type: 'aside',
        icon: 'mat_outline:computer',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'settings',
        title: 'Settings',
        tooltip: 'Settings',
        type: 'aside',
        icon: 'mat_outline:settings',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        tooltip: 'Apps',
        type: 'aside',
        icon: 'mat_outline:apps',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'internal-dashboard',
        title: 'Internal Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
