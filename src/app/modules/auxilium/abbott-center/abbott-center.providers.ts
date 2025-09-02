import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AbbottCenterIndividualEffects } from './effects/abbott-center-individualeffects';
import { AbbottCenterTableEffects } from './effects/abbott-center-table.effects';
import * as fromAbbottCenter from './reducers';

export default [
    provideState(fromAbbottCenter.featureKey, fromAbbottCenter.reducers),
    provideEffects(AbbottCenterTableEffects, AbbottCenterIndividualEffects),
];
