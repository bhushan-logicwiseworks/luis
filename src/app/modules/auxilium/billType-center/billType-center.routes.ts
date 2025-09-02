import { Route } from '@angular/router';
import providers from './billType-center.providers';
import { BillTypeCenterComponent } from './containers/billType-center-component/billType-center.component';
import { BillTypeCenterTableComponent } from './containers/billType-center-table/billType-center-table.component';

export default [
    {
        path: '',
        component: BillTypeCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                component: BillTypeCenterTableComponent,
            },
        ],
    },
] as Route[];
