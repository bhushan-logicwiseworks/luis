import { Route } from '@angular/router';
import { ValidationDemographicsComponent } from './components/validation-demographics/validation-demographics.component';
import { ValidationCenterComponent } from './containers/validation-center-component/validation-center.component';
import { ValidationDetailsComponent } from './containers/validation-center-details/validation-details.component';
import { ValidationCenterTableComponent } from './containers/validation-center-table/validation-center-table.component';
import providers from './validation-center.providers';

export default [
    {
        path: '',
        component: ValidationCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                component: ValidationCenterTableComponent,
            },
        ],
    },
    {
        path: ':id',
        component: ValidationDetailsComponent,
        providers: providers,
        children: [
            { path: '', redirectTo: 'validation-details', pathMatch: 'full' },
            { path: 'validation-details', component: ValidationDemographicsComponent },
        ],
    },
] as Route[];
