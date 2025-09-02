import { Route } from '@angular/router';
import { InternalDashboardComponent } from './internal-dashboard.component';
import providers from './internal-dashboard.providers';

export default [
    {
        path: '',
        component: InternalDashboardComponent,
        providers: providers,
    },
] as Route[];
