import { Route } from '@angular/router';
import { LoadPayorDetialsGuard } from './actions/guards/load-payor-details.guard';
import { LoadPayorBranchListGuard } from './actions/guards/payor-branch-list.guard';
import { PayorCenter1500DataComponent } from './components/payor-center-1500-data/payor-center-1500-data.component';
import { PayorCenter837DataComponent } from './components/payor-center-837-data/payor-center-837-data.component';
import { PayorCenterBillOptionsComponent } from './components/payor-center-bill-options/payor-center-bill-options.component';
import { PayorDemographicsComponent } from './components/payor-demographics/payor-demographics.component';
import { PayorOverrideComponent } from './components/payor-override/payor-override.component';
import { PayorCenterComponent } from './containers/payor-center-component/payor-center.component';
import { PayorCenterDetailsComponent } from './containers/payor-center-details/payor-center-details.component';
import { PayorCenterTableComponent } from './containers/payor-center-table/payor-center-table.component';
import providers from './payor-center.providers';

export default [
    {
        path: '',
        component: PayorCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                component: PayorCenterTableComponent,
            },
            {
                path: 'payor-override',
                component: PayorOverrideComponent,
            },
        ],
    },
    {
        path: ':id',
        canActivate: [LoadPayorBranchListGuard],
        component: PayorCenterDetailsComponent,
        providers: providers,
        children: [
            { path: '', redirectTo: 'demographics', pathMatch: 'full' },
            { path: 'demographics', component: PayorDemographicsComponent, canActivate: [LoadPayorDetialsGuard] },
            { path: 'bill-options', component: PayorCenterBillOptionsComponent, canActivate: [LoadPayorDetialsGuard] },
            { path: '837-data', component: PayorCenter837DataComponent, canActivate: [LoadPayorDetialsGuard] },
            { path: '1500-data', component: PayorCenter1500DataComponent, canActivate: [LoadPayorDetialsGuard] },
        ],
    },
] as Route[];
