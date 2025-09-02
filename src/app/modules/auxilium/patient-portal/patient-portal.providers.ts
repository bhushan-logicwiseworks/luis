import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { PatientPortalIndividualEffects } from './effects/patient-portal-individualeffects';
import { PatientPortalTableEffects } from './effects/patient-portal-table.effects';
import * as fromPatientPortal from './reducers';

export default [
    provideState(fromPatientPortal.featureKey, fromPatientPortal.reducers),
    provideEffects([PatientPortalTableEffects, PatientPortalIndividualEffects]),
];
