import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { VendorCenterIndividualEffects } from './effects/vendor-center-individualeffects';
import { VendorCenterTableEffects } from './effects/vendor-center-table.effects';
import * as fromVendorCenter from './reducers';

export default [
    provideState(fromVendorCenter.featureKey, fromVendorCenter.reducers),
    provideEffects(VendorCenterTableEffects, VendorCenterIndividualEffects),
];
