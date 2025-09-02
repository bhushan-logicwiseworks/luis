import { Route } from '@angular/router';
import { PhysicianDemographicsComponent } from './components/physician-demographics/physician-demographics.component';
import { PhysicianCenterComponent } from './containers/physician-center-component/physician-center.component';
import { PhysicianDetailsComponent } from './containers/physician-center-details/physician-details.component';
import { PhysicianCenterTableComponent } from './containers/physician-center-table/physician-center-table.component';
import { LoadPhysicianBranchListGuard } from './guard/physician-demograpic-branch-list.guard';
import providers from './physician-center.providers';

export default [
    {
        path: '',
        component: PhysicianCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'active',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: PhysicianCenterTableComponent,
            },
        ],
    },
    {
        path: ':id',
        canActivate: [LoadPhysicianBranchListGuard],
        component: PhysicianDetailsComponent,
        providers: providers,
        children: [
            { path: '', redirectTo: 'demographics', pathMatch: 'full' },
            { path: 'demographics', component: PhysicianDemographicsComponent },
        ],
    },
] as Route[];
