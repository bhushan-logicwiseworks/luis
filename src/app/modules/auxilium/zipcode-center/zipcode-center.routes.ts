import { Route } from '@angular/router';
import { ZipCodeCenterComponent } from './containers/zipcode-center-component/zipcode-center.component';
import { ZipCodeCenterTableComponent } from './containers/zipcode-center-table/zipcode-center-table.component';
import providers from './zipcode-center.providers';

export default [
    {
        path: '',
        component: ZipCodeCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                component: ZipCodeCenterTableComponent,
            },
        ],
    },
] as Route[];
