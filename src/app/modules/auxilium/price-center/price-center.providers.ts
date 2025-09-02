import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { PriceCenterIndividualEffects } from './effects/price-center-individualeffects';
import { PriceCenterTableEffects } from './effects/price-center-table.effects';
import * as fromPriceCenter from './reducers';

export default [
    provideState(fromPriceCenter.featureKey, fromPriceCenter.reducers),
    provideEffects([PriceCenterTableEffects, PriceCenterIndividualEffects]),
];
