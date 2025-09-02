import { AuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Route } from '@angular/router';
import { InitialDataResolver, InitialThemeResolver } from 'app/app.resolvers';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { LoadDashboardDetialsGuard } from './modules/admin/dashboards/combined/actions/guards/load-dashboard-details.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/sign-in']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['/dashboards/project']);
// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/dashboards/project'
    { path: '', pathMatch: 'full', redirectTo: '/sign-in' },

    // Redirect signed-in user to the '/dashboards/project'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    // { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboards/project' },

    // Auth routes for guests
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        // canActivate: [AuthGuard],
        data: {
            layout: 'empty',
            authGuardPipe: redirectLoggedInToDashboard,
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import('app/modules/auth/confirmation-required/confirmation-required.routes').then(m => m.default),
            },
            {
                path: 'sign-in',
                loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes').then(m => m.default),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import('app/modules/auth/forgot-password/forgot-password.routes').then(m => m.default),
            },
            {
                path: 'sign-up',
                loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes').then(m => m.default),
            },
        ],
    },
    // Tracking
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'track/:trackingnumber',
                loadChildren: () => import('app/modules/auxilium/tracking/tracking.routes').then(m => m.default),
            },
        ],
    },
    // Auth routes for authenticated users
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        data: {
            layout: 'empty',
            authGuardPipe: redirectUnauthorizedToLogin,
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes').then(m => m.default),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        component: LayoutComponent,
        canMatch: [NoAuthGuard],
        canActivate: [AuthGuard],
        data: {
            authGuardPipe: redirectUnauthorizedToLogin,
        },
        resolve: {
            initialData: InitialDataResolver,
            initialTheme: InitialThemeResolver,
        },
        children: [
            // Dashboards
            {
                path: 'dashboards',
                children: [
                    {
                        path: 'project',
                        canActivate: [LoadDashboardDetialsGuard],
                        loadChildren: () =>
                            import('app/modules/admin/dashboards/combined/combined.routes').then(m => m.default),
                    },
                ],
            },
            // internal-dashboard
            {
                path: 'internal-dashboard',
                loadChildren: () =>
                    import('app/modules/auxilium/internal-dashboard/internal-dashboard.routes').then(m => m.default),
            },

            // Centers
            {
                path: 'centers',
                children: [
                    {
                        path: 'access-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/access-center/access-center.routes').then(m => m.default),
                        title: 'AccessCenter',
                    },
                    {
                        path: 'branch-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/branch-center/branch-center.routes').then(m => m.default),
                        title: 'BranchCenter',
                    },
                    {
                        path: 'code-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/code-center/code-center.routes').then(m => m.default),
                        title: 'CodeCenter',
                    },
                    {
                        path: 'configuration-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/Configuration-center/configuration-center.routes').then(
                                m => m.default
                            ),
                        title: 'Configurationcenter',
                    },
                    {
                        path: 'comm-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/comm-center/comm-center.routes').then(m => m.default),
                        title: 'CommCenter',
                    },
                    {
                        path: 'event-tracking-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/event-tracking/event-tracking.routes').then(m => m.default),
                        title: 'EventTracking',
                    },
                    {
                        path: 'dexcom-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/dexcom-center/dexcom-center.routes').then(m => m.default),
                    },
                    {
                        path: 'employee-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/employee-center/employee-center.routes').then(m => m.default),
                        title: 'EmployeeCenter',
                    },
                    {
                        path: 'identity-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/identity-center/identity-center.routes').then(m => m.default),
                        title: 'IdentityCenter',
                    },
                    {
                        path: 'inventory-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/inventory-center/inventory-center.routes').then(
                                m => m.default
                            ),
                        title: 'InventoryCenter',
                    },

                    {
                        path: 'patient-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/patient-center/patient-center.routes').then(m => m.default),
                        title: 'PatientCenter',
                    },
                    {
                        path: 'payor-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/payor-center/payor-center.routes').then(m => m.default),
                        title: 'PayorCenter',
                    },
                    {
                        path: 'physician-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/physician-center/physician-center.routes').then(
                                m => m.default
                            ),
                        title: 'PhysicianCenter',
                    },
                    {
                        path: 'price-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/price-center/price-center.routes').then(m => m.default),
                        title: 'PriceCenter',
                    },
                    {
                        path: 'referral-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/referral-center/referral-center.routes').then(m => m.default),
                        title: 'ReferralCenter',
                    },
                    {
                        path: 'reorder-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/reorder-center/reorder-center.routes').then(m => m.default),
                        title: 'ReorderCenter',
                    },
                    {
                        path: 'shortcut-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/shortcut-center/shortcut-center.routes').then(m => m.default),
                        title: 'ShortcutCenter',
                    },
                    {
                        path: 'sales-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/sales-center/sales-center.routes').then(m => m.default),
                        title: 'SalesCenter',
                    },
                    {
                        path: 'hotkeys-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/hotKeys-center/hotkeys-center.routes').then(m => m.default),
                    },
                    {
                        path: 'billType-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/billType-center/billType-center.routes').then(m => m.default),
                    },
                    {
                        path: 'charges-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/charges-center/charges-center.routes').then(m => m.default),
                        title: 'ChargesCenter',
                    },
                    {
                        path: 'bill-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/bill-center/bill-center.routes').then(m => m.default),
                        title: 'BillCenter',
                    },
                    {
                        path: 'icdcode-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/icdcode-center/icdcode-center.routes').then(m => m.default),
                    },
                    {
                        path: 'vendor-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/vendor-center/vendor-center.routes').then(m => m.default),
                    },
                    {
                        path: 'work-order-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/work-order-center/work-order-center.routes').then(
                                m => m.default
                            ),
                        title: 'WorkOrderCenter',
                    },
                    {
                        path: 'zipcode-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/zipcode-center/zipcode-center.routes').then(m => m.default),
                    },
                    {
                        path: 'reporting-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/reporting-center/reporting-center.routes').then(
                                m => m.default
                            ),
                        title: 'ReportingCenter',
                    },
                    {
                        path: 'vault-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/vault-center/vault-center.routes').then(m => m.default),
                        title: 'VaultCenter',
                    },
                    {
                        path: 'onboarding-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/onboarding-center/onboarding-center.routes').then(
                                m => m.default
                            ),
                    },
                    {
                        path: 'territory',
                        loadChildren: () =>
                            import('app/modules/auxilium/territory-transfer/territory-transfer.routes').then(
                                m => m.default
                            ),
                    },
                    {
                        path: 'validation-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/validation-center/validation-center.routes').then(
                                m => m.default
                            ),
                    },
                    {
                        path: 'intake-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/intake-center/intake-center.routes').then(m => m.default),
                        title: 'IntakeCenter',
                    },
                    {
                        path: 'compliance-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/compliance-center/compliance-center.routes').then(
                                m => m.default
                            ),
                        title: 'ComplianceCenter',
                    },
                    {
                        path: 'caremanagement-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/caremanagement-center/caremanagement-center.routes').then(
                                m => m.default
                            ),
                        title: 'CareManagementCenter',
                    },
                    {
                        path: 'audit-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/audit-center/audit-center.routes').then(m => m.default),
                        title: 'AuditCenter',
                    },
                    {
                        path: 'company-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/company-center/company-center.routes').then(m => m.default),
                        title: 'CompanyCenter',
                    },
                    {
                        path: 'billing-events-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/billing-events-center/billing-events-center.routes').then(
                                m => m.default
                            ),
                        title: 'BillingEventsCenter',
                    },
                    {
                        path: 'posting-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/posting-center/posting-center.routes').then(m => m.default),
                        title: 'PostingCenter',
                    },
                ],
            },

            // Technology
            {
                path: 'technology',
                children: [
                    {
                        path: 'it-dashboard',
                        loadChildren: () =>
                            import('app/modules/auxilium/technology/itdashboard/itdashboard.routes').then(
                                m => m.default
                            ),
                    },
                    {
                        path: 'job-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/technology/job-center/job-center-routes').then(m => m.default),
                    },
                ],
            },

            // User Center
            {
                path: 'user-center',
                loadChildren: () => import('app/modules/auxilium/user-center/user-center.routes').then(m => m.default),
            },

            // Company
            {
                path: 'company',
                children: [
                    {
                        path: 'abbott-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/abbott-center/abbott-center.routes').then(m => m.default),
                    },
                    {
                        path: 'dexcom-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/dexcom-center/dexcom-center.routes').then(m => m.default),
                    },
                    {
                        path: 'analytics-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/analytics-center/analytics-center.routes').then(
                                m => m.default
                            ),
                    },
                    {
                        path: 'patient-portal',
                        loadChildren: () =>
                            import('app/modules/auxilium/patient-portal/patient-portal.routes').then(m => m.default),
                    },
                    {
                        path: 'license-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/license-center/license-center.routes').then(m => m.default),
                        title: 'LicenseCenter',
                    },
                    {
                        path: 'proof-of-delivery',
                        loadChildren: () =>
                            import(
                                'app/modules/auxilium/proof-of-delivery-center/proof-of-delivery-center.routes'
                            ).then(m => m.default),
                    },
                    {
                        path: 'map-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/map-center/map-center.routes').then(m => m.default),
                    },
                    {
                        path: 'team-center',
                        loadChildren: () => import('app/modules/auxilium/team/team-center.routes').then(m => m.default),
                    },
                    {
                        path: 'retention-rate-center',
                        loadChildren: () =>
                            import('app/modules/auxilium/retention-rate-center/retention-rate-center.routes').then(
                                m => m.default
                            ),
                    },
                    {
                        path: 'site-settings',
                        loadChildren: () =>
                            import('app/modules/auxilium/site-settings-center/site-settings-center.routes').then(
                                m => m.default
                            ),
                    },
                ],
            },

            // Apps
            {
                path: 'apps',
                children: [
                    {
                        path: 'academy',
                        loadChildren: () =>
                            import('app/modules/admin/apps/academy/academy.routes').then(m => m.default),
                    },
                    {
                        path: 'help-center',
                        loadChildren: () =>
                            import('app/modules/admin/apps/help-center/help-center.routes').then(m => m.default),
                    },
                ],
            },

            // 404 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () =>
                    import('app/modules/admin/pages/error/error-404/error-404.routes').then(m => m.default),
            },
            { path: '**', redirectTo: '404-not-found' },
        ],
    },
];
