import { Route } from '@angular/router';
import providers from './compliance-center.providers';
import { ComplianceCenterComponent } from './containers/compliance-center-component/compliance-center.component';
import { ComplianceCenterTableComponent } from './containers/compliance-center-table/compliance-center-table.component';

export default [
    {
        path: '',
        component: ComplianceCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: ComplianceCenterTableComponent,
            },
        ],
    },
] as Route[];
