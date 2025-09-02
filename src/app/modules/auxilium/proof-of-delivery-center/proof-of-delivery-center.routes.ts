import { Route } from '@angular/router';
import { ProofOfDeliveryComponent } from './containers/proof-of-delivery-component/proof-of-delivery.component';
import { ProofOfDeliveryTableComponent } from './containers/proof-of-delivery-table/proof-of-delivery-table.component';
import providers from './proof-of-delivery-center.providers';

export default [
    {
        path: '',
        component: ProofOfDeliveryComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'none',
                pathMatch: 'full',
            },
            {
                path: 'none',
                component: ProofOfDeliveryTableComponent,
            },
        ],
    },
] as Route[];
