import { Route } from '@angular/router';
import { MapListSidenavComponent } from './containers/map-center-component/map-center.component';
import { MapListTableComponent } from './containers/map-center-table/map-center-table.component';
import providers from './map-center.providers';

export default [
    {
        path: '',
        component: MapListSidenavComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'active',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: MapListTableComponent,
            },
        ],
    },
] as Route[];
