import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { PatientCenterPayorsEffects } from '../patient-center/effects/patient-center-payors.effects';
import { CompanyCenterIndividualEffects } from './effects/company-center-individualeffects';
import { CompanyCenterTableEffects } from './effects/company-center-table.effects';
import * as fromCompanyCenter from './reducers';

export default [
    provideState(fromCompanyCenter.featureKey, fromCompanyCenter.reducers),
    provideEffects([CompanyCenterTableEffects, CompanyCenterIndividualEffects, PatientCenterPayorsEffects]),
];
