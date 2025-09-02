import { Route } from '@angular/router';
import { JobCenterTableComponent } from './containers/job-center-table/job-center-table.component';
import { JobCenterComponent } from './containers/job-center/job-center.component';
import providers from './job-center.providers';

export default [
    {
        path: '',
        component: JobCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: JobCenterTableComponent,
            },
        ],
    },
] as Route[];
