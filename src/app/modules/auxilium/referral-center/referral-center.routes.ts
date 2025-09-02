import { Route } from '@angular/router';
import { ReferralDemographicsComponent } from './components/referral-demographics/referral-demographics.component';
import { ReferralCenterComponent } from './containers/referral-center-component/referral-center.component';
import { ReferralCenterDetailsComponent } from './containers/referral-center-details/referral-center-details.component';
import { ReferralCenterTableComponent } from './containers/referral-center-table/referral-center-table.component';
import providers from './referral-center.providers';

export default [
    {
        path: '',
        component: ReferralCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: ReferralCenterTableComponent,
            },
        ],
    },
    {
        path: ':id',
        component: ReferralCenterDetailsComponent,
        providers: providers,
        children: [
            { path: '', redirectTo: 'demographics', pathMatch: 'full' },
            { path: 'demographics', component: ReferralDemographicsComponent },
        ],
    },
] as Route[];
