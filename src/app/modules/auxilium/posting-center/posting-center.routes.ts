import { Route } from '@angular/router';

import { ExplanationOfBenefitsComponent } from './components/explanation-of-benefits/explanation-of-benefits.component';
import { PostingDemographicsComponent } from './components/posting-demographics/posting-demographics.component';
import { PostingCenterComponent } from './containers/posting-center-component/posting-center.component';
import { PostingDetailsComponent } from './containers/posting-center-details/posting-details.component';
import providers from './posting-center.providers';
export default [
    {
        path: '',
        component: PostingCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'eob',
            },
            {
                path: 'eob',
                component: ExplanationOfBenefitsComponent,
            },
        ],
    },
    {
        path: ':id',
        component: PostingDetailsComponent,
        providers: providers,
        children: [
            { path: '', redirectTo: 'eob-patients', pathMatch: 'full' },
            { path: 'eob-patients', component: PostingDemographicsComponent },
        ],
    },
] as Route[];
