import { Route } from '@angular/router';
import { IntakeCenterComponent } from './containers/intake-center-component/intake-center.component';
import { IntakeCenterTableComponent } from './containers/intake-center-table/intake-center-table.component';
import providers from './intake-center.providers';

export default [
    {
        path: '',
        component: IntakeCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'onboardready',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: IntakeCenterTableComponent,
            },
        ],
    },
] as Route[];
