import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { BillingEventsCenterCreateEffects } from './effects/billing-events-center-create.effects';
import { BillingEventsCenterTableEffects } from './effects/billing-events-center-table-effects';
import * as fromBillingEventsCenter from './reducers';

export default [
    provideState(fromBillingEventsCenter.featureKey, fromBillingEventsCenter.reducers),
    provideEffects([BillingEventsCenterTableEffects, BillingEventsCenterCreateEffects]),
];
