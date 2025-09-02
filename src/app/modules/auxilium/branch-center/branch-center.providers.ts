import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BranchCenterIndividualEffects } from './effects/branch-center-individualeffects';
import { BranchCenterTableEffects } from './effects/branch-center-table.effects';
import * as fromBranchCenter from './reducers';

export default [
    provideState(fromBranchCenter.featureKey, fromBranchCenter.reducers),
    provideEffects([BranchCenterTableEffects, BranchCenterIndividualEffects]),
];
