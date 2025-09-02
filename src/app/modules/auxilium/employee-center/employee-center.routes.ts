import { Route } from '@angular/router';
import { EmployeeDemographicsComponent } from './components/employee-demographics/employee-demographics.component';
import { EmployeeSecurityComponent } from './components/employee-security/employee-security.component';
import { EmployeeCenterComponent } from './containers/employee-center-component/employee-center.component';
import { EmployeeDetailsComponent } from './containers/employee-center-details/employee-center-details.component';
import { EmployeeCenterTableComponent } from './containers/employee-center-table/employee-center-table.component';
import providers from './employee-center.providers';

export default [
    {
        path: '',
        component: EmployeeCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'none',
                pathMatch: 'full',
            },
            {
                path: 'none',
                component: EmployeeCenterTableComponent,
            },
            {
                path: 'active',
                component: EmployeeCenterTableComponent,
            },
            {
                path: 'inactive',
                component: EmployeeCenterTableComponent,
            },
            {
                path: 'all',
                component: EmployeeCenterTableComponent,
            },
        ],
    },
    {
        path: ':id',
        component: EmployeeDetailsComponent,
        children: [
            { path: '', redirectTo: 'demographics', pathMatch: 'full' },
            { path: 'demographics', component: EmployeeDemographicsComponent },
            { path: 'security', component: EmployeeSecurityComponent },
        ],
    },
] as Route[];
