import { Route } from '@angular/router';
import providers from './access-center.providers';
import { AccessCenterComponent } from './containers/access-center-component/access-center.component';
import { AccessCenterTableComponent } from './containers/access-center-table/access-center-table.component';

export default [
    {
        path: '',
        component: AccessCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'active',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: AccessCenterTableComponent,
            },
        ],
    },
] as Route[];
