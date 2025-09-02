import { Route } from '@angular/router';
import { RetentionRateCenterComponentComponent } from './containers/retention-rate-center-component/retention-rate-center-component.component';
import { RetentionRateCenterTableComponent } from './containers/retention-rate-center-table/retention-rate-center-table.component';
import providers from './retention-rate-center.providers';

export default [
    {
        path: '',
        component: RetentionRateCenterComponentComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full',
            },
            {
                path: 'all',
                component: RetentionRateCenterTableComponent,
            },
        ],
    },
] as Route[];
