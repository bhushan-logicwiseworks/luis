import { Route } from '@angular/router';
import { LoadBranchListGuard } from '../license-center/guards/branch-list.guard';
import { SalesDemographicsComponent } from './components/sales-demographics/sales-demographics.component';
import { SalesCenterComponent } from './containers/sales-center-component/sales-center.component';
import { SalesCenterDetailsComponent } from './containers/sales-center-details/sales-center-details.component';
import { SalesCenterTableComponent } from './containers/sales-center-table/sales-center-table.component';
import providers from './sales-center.providers';

export default [
    {
        path: '',
        canActivate: [LoadBranchListGuard],
        component: SalesCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'active',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: SalesCenterTableComponent,
            },
        ],
    },
    {
        path: ':id',
        canActivate: [LoadBranchListGuard],
        component: SalesCenterDetailsComponent,
        providers: providers,
        children: [
            { path: '', redirectTo: 'demographics', pathMatch: 'full' },
            { path: 'demographics', component: SalesDemographicsComponent },
        ],
    },
] as Route[];
