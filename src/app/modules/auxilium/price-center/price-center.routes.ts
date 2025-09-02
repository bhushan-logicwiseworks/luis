import { Route } from '@angular/router';
import { PriceCenterComponent } from './containers/price-center-component/price-center.component';
import { PriceCenterTableComponent } from './containers/price-center-table/price-center-table.component';
import providers from './price-center.providers';

export default [
    {
        path: '',
        component: PriceCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'none',
                pathMatch: 'full',
            },
            {
                path: 'none',
                component: PriceCenterTableComponent,
            },
        ],
    },
] as Route[];
