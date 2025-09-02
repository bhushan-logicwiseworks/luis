import { Route } from '@angular/router';
import { DrillDownTableComponent } from './containers/drilldown-table/drilldown-table.component';
import { OnboardingCenterKpiComponent } from './containers/onboarding-center-kpi/onboarding-center-kpi.component';
import providers from './onboarding-center.providers';
export default [
    {
        path: 'drilldown/:id',
        component: DrillDownTableComponent,
        providers: providers,
    },
    {
        path: '',
        component: OnboardingCenterKpiComponent,
        providers: providers,
    },
] as Route[];
