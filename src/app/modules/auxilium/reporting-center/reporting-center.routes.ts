import { Route } from '@angular/router';
import { ReportingCenterComponent } from './containers/reporting-center-component/reporting-center.component';
import { ReportingCenterTableComponent } from './containers/reporting-center-table/reporting-center-table.component';
import providers from './reporting-center.providers';

export default [
    {
        path: '',
        component: ReportingCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'none',
                pathMatch: 'full',
            },
            {
                path: 'none',
                component: ReportingCenterTableComponent,
            },
            {
                path: 'recent',
                component: ReportingCenterTableComponent,
            },
            {
                path: 'pending',
                component: ReportingCenterTableComponent,
            },
            {
                path: 'active',
                component: ReportingCenterTableComponent,
            },
            {
                path: 'inactive',
                component: ReportingCenterTableComponent,
            },
            {
                path: 'deleted',
                component: ReportingCenterTableComponent,
            },
            {
                path: 'all',
                component: ReportingCenterTableComponent,
            },
            {
                path: 'cgm',
                component: ReportingCenterTableComponent,
            },
            {
                path: 'enteral',
                component: ReportingCenterTableComponent,
            },
            {
                path: 'incontinence',
                component: ReportingCenterTableComponent,
            },
            {
                path: 'ostomy',
                component: ReportingCenterTableComponent,
            },
            {
                path: 'urology',
                component: ReportingCenterTableComponent,
            },
            {
                path: 'wound',
                component: ReportingCenterTableComponent,
            },
        ],
    },
] as Route[];
