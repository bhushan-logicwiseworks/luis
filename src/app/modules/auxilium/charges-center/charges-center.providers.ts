import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DateTimeFormatPipe } from '../../../shared/pipes/auxilium/aux-datetimeformat.pipe';
import { ChargesCenterTableEffects } from './effects/charges-center-table.effects';
import * as fromChargesCenter from './reducers';

export default [
    provideState(fromChargesCenter.featureKey, fromChargesCenter.reducers),
    provideEffects(ChargesCenterTableEffects),
    DateTimeFormatPipe,
];
