import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ZipCodeCenterIndividualEffects } from './effects/zipcode-center-individualeffects';
import { ZipCodeCenterTableEffects } from './effects/zipcode-center-table.effects';
import * as fromSalesCenter from './reducers';

export default [
    provideState(fromSalesCenter.featureKey, fromSalesCenter.reducers),
    provideEffects(ZipCodeCenterTableEffects, ZipCodeCenterIndividualEffects),
];
