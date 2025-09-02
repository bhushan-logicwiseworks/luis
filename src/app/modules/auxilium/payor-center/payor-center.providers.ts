import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { PatientCenterDetailsEffects } from '../patient-center/effects/patient-center-details.effects';
import { Payor1500DataEffects } from './effects/payor-1500-data.effects';
import { Payor837DataEffects } from './effects/payor-837-data.effects';
import { PayorBillOptionEffects } from './effects/payor-bill-option.effects';
import { PayorCenterDetailsEffects } from './effects/payor-center-details.effects';
import { PayorCenterTableEffects } from './effects/payor-center-table.effects';
import { PayorBillInfoEffects } from './effects/payor-demographics.effects';
import * as fromPayorCenter from './reducers';

export default [
    provideState(fromPayorCenter.featureKey, fromPayorCenter.reducers),
    provideEffects([
        PayorCenterTableEffects,
        PayorCenterDetailsEffects,
        PatientCenterDetailsEffects,
        PayorBillInfoEffects,
        PayorBillOptionEffects,
        Payor837DataEffects,
        Payor1500DataEffects,
    ]),
];
