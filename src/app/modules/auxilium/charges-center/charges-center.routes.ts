import { Route } from '@angular/router';
import providers from './charges-center.providers';
import { ChargesCenterTableComponent } from './containers/charges-center-table/charges-center-table.component';
import { ChargesCenterComponent } from './containers/charges-center/charges-center.component';

export default [
    {
        path: '',
        component: ChargesCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'confirmed-orders',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: ChargesCenterTableComponent,
            },
        ],
    },
] as Route[];
