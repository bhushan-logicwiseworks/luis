import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { LoadPatientDetialsGuard } from './action/guard/load-patient-details.guard';
import { TerritoryTransferEffects } from './effects/territory-transfer.effects';
import * as fromTerritoryTransfer from './reducers';

export default [
    provideState(fromTerritoryTransfer.featureKey, fromTerritoryTransfer.reducers),
    provideEffects([TerritoryTransferEffects]),
    LoadPatientDetialsGuard,
];
