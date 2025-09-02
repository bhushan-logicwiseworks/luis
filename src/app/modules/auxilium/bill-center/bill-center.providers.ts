import { CurrencyPipe } from '@angular/common';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DateTimeFormatPipe } from '../../../shared/pipes/auxilium/aux-datetimeformat.pipe';
import { BillCenterTableEffects } from './effects/bill-center-table-effects';
import * as fromBillCenter from './reducers';

export default [
    provideState(fromBillCenter.featureKey, fromBillCenter.reducers),
    provideEffects(BillCenterTableEffects),
    CurrencyPipe,
    DateTimeFormatPipe,
];
