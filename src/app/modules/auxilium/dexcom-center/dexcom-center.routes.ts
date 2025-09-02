import { Route } from '@angular/router';
import { DexcomCenterComponent } from './containers/dexcom-center-component/dexcom-center.component';
import { DexcomCenterTableComponent } from './containers/dexcom-center-table/dexcom-center-table.component';
import providers from './dexcom-center.providers';

export default [
    {
        path: '',
        component: DexcomCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: DexcomCenterTableComponent,
            },
        ],
    },
] as Route[];
