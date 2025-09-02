import { Route } from '@angular/router';
import { PatientPortalComponent } from './containers/patient-portal-component/patient-portal.component';
import { PatientPortalTableComponent } from './containers/patient-portal-table/patient-portal-table.component';
import providers from './patient-portal.providers';

export default [
    {
        path: '',
        component: PatientPortalComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'confirmed',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: PatientPortalTableComponent,
            },
        ],
    },
] as Route[];
