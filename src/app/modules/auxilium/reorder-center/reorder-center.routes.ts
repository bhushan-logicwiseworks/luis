import { Route } from '@angular/router';
import { ReorderCenterComponent } from './containers/reorder-center-component/reorder-center.component';
import { ReorderCenterTableComponent } from './containers/reorder-center-table/reorder-center-table.component';
import { ReorderWizardComponent } from './containers/reorder-center-wizard/reorder-wizard.component';
import providers from './reorder-center.providers';

export default [
    {
        path: '',
        component: ReorderCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'current',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: ReorderCenterTableComponent,
            },
        ],
    },
    {
        path: 'reorder/:id',
        component: ReorderWizardComponent,
        providers: providers,
    },
] as Route[];
