import { Route } from '@angular/router';
import providers from './caremanagement-center.providers';
import { CareManagementCenterComponent } from './containers/caremanagement-center-component/caremanagement-center.component';
import { CareManagementCenterTableComponent } from './containers/caremanagement-center-table/caremanagement-center-table.component';

export default [
    {
        path: '',
        component: CareManagementCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: CareManagementCenterTableComponent,
            },
        ],
    },
] as Route[];
