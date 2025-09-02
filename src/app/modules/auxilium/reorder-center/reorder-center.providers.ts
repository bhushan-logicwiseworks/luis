import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ReorderCenterTableEffects } from './effects/reorder-center-table.effects';
import { ReorderIndividualEffects } from './effects/reorder-individual.effects';
import { ReorderPatientEffects } from './effects/reorder-patient.effects';
import * as fromReorderCenter from './reducers';

export default [
    provideState(fromReorderCenter.featureKey, fromReorderCenter.reducers),
    provideEffects([ReorderCenterTableEffects, ReorderIndividualEffects, ReorderPatientEffects]),
];
