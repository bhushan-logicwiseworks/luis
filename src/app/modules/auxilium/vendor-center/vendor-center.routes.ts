import { Route } from '@angular/router';
import { VenderCenterComponent } from './containers/vendor-center-component/vendor-center.component';
import { VenderCenterTableComponent } from './containers/vendor-center-table/vendor-center-table.component';
import providers from './vendor-center.providers';

export default [
    {
        path: '',
        component: VenderCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                component: VenderCenterTableComponent,
            },
        ],
    },
] as Route[];
