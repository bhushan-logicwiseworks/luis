import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BillTypeCenterIndividualEffects } from './effects/billType-center-individualeffects';
import { BillTypesCenterTableEffects } from './effects/billType-center-table.effects';
import * as fromBillTypeCenter from './reducers';

export default [
    provideState(fromBillTypeCenter.featureKey, fromBillTypeCenter.reducers),
    provideEffects([BillTypesCenterTableEffects, BillTypeCenterIndividualEffects]),
];
