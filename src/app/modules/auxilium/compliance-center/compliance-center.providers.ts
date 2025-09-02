import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ComplianceCenterTableEffects } from './effects/compliance-center-table.effects';
import * as fromJobList from './reducers';

export default [
    provideState(fromJobList.featureKey, fromJobList.reducers),
    provideEffects(ComplianceCenterTableEffects),
];
