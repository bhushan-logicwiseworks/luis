import { Route } from '@angular/router';
import providers from './company-center.providers';
import { CompanyDemographicsComponent } from './components/company-demographics/company-demographics.component';
import { CompanyCenterComponent } from './containers/company-center-component/company-center.component';
import { CompanyDetailsComponent } from './containers/company-center-details/company-details.component';
import { CompanyCenterTableComponent } from './containers/company-center-table/company-center-table.component';

export default [
    {
        path: '',
        component: CompanyCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                component: CompanyCenterTableComponent,
            },
        ],
    },
    {
        path: ':id',
        component: CompanyDetailsComponent,
        providers: providers,
        children: [
            { path: '', redirectTo: 'demographics', pathMatch: 'full' },
            { path: 'demographics', component: CompanyDemographicsComponent },
        ],
    },
] as Route[];
