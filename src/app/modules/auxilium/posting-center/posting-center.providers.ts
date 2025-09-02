import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { CurrencyPipe } from '@angular/common';
import { DateTimeFormatPipe } from '../../../shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PostingCenterTableEffects } from './effects/posting-center-table-effects';
import * as fromReferralCenter from './reducers';

export default [
    provideState(fromReferralCenter.featureKey, fromReferralCenter.reducers),
    provideEffects([PostingCenterTableEffects]),
    CurrencyPipe,
    DateTimeFormatPipe,
];
