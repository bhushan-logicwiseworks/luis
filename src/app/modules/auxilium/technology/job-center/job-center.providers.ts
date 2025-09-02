import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { JobCenterTableEffects } from './effects/job-center-table.effects';
import { JobIndividualEffects } from './effects/job-individual.effects';
import * as fromJobList from './reducers';

export default [
    provideState(fromJobList.featureKey, fromJobList.reducers),
    provideEffects([JobCenterTableEffects, JobIndividualEffects]),
];
