import { Route } from '@angular/router';
import { LoadPatientDetialsGuard } from './action/guard/load-patient-details.guard';
import providers from './territory-transfer.providers';
import { TerritoryTransferComponent } from './territory-transfer/territory-transfer.component';

export default [
    {
        path: '',
        component: TerritoryTransferComponent,
        providers: providers,
        canActivate: [LoadPatientDetialsGuard],
    },
] as Route[];
