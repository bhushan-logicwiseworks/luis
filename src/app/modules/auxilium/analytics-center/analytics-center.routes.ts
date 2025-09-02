import { Route } from '@angular/router';
import providers from './analytics-center.providers';
import { AnalyticsCenterComponent } from './container/analytics-center/analytics-center.component';

export default [
    {
        path: '',
        component: AnalyticsCenterComponent,
        providers: providers,
    },
] as Route[];
