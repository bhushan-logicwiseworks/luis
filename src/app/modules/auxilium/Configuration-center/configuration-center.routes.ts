import { Route } from '@angular/router';
import providers from './configuration-center.providers';
import { ConfigurationCenterTableComponent } from './containers/configuration-center-table/configuration-center-table.component';
import { ConfigurationCenterComponent } from './containers/configuration-center/configuration-center.component';

export default [
    {
        path: '',
        component: ConfigurationCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                component: ConfigurationCenterTableComponent,
            },
        ],
    },
] as Route[];
