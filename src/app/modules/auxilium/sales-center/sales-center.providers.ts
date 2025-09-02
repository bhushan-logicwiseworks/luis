import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { SalesCenterIndividualEffects } from './effects/sales-center-individualeffects';
import { SalesCenterTableEffects } from './effects/sales-center-table.effects';
import * as fromSalesCenter from './reducers';

export default [
    provideState(fromSalesCenter.featureKey, fromSalesCenter.reducers),
    provideEffects([SalesCenterTableEffects, SalesCenterIndividualEffects]),
];
