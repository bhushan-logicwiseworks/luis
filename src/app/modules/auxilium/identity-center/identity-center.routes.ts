import { Route } from '@angular/router';
import { IdentityCenterComponent } from './containers/identity-center-component/identity-center.component';
import { IdentityCenterTableComponent } from './containers/identity-center-table/identity-center-table.component';
import providers from './identity-center.providers';

export default [
    {
        path: '',
        component: IdentityCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: IdentityCenterTableComponent,
            },
        ],
    },
] as Route[];
