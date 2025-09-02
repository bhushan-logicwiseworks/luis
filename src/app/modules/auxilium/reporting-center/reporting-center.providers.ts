import { CurrencyPipe } from '@angular/common';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DateTimeFormatPipe } from '../../../shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from '../../../shared/pipes/auxilium/aux-phonenumber.pipe';
import { ReportCenterTableEffects } from './effects/report-center-table.effects';
import * as fromReportingCenter from './reducers';

export default [
    provideState(fromReportingCenter.featureKey, fromReportingCenter.reducers),
    provideEffects([ReportCenterTableEffects]),
    CurrencyPipe,
    PhoneNumberPipe,
    DateTimeFormatPipe,
];
