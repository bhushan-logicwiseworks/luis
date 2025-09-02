import { CurrencyPipe } from '@angular/common';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DateTimeFormatPipe } from '../../../shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PatientCenterDetailsEffects } from '../patient-center/effects/patient-center-details.effects';
import { PatientInquiryChangesEffects } from '../patient-center/effects/patient-inquiry-changes.effects';
import * as fromPatientCenter from './../patient-center/reducers';
import { LoadProductDetialsGuard } from './actions/guards/load-inventory-center-details.guard';
import { ProductCenterDetailsEffects } from './effects/inventory-center-details.effects';
import { InventoryCenterIndividualEffects } from './effects/inventory-center-individualeffects';
import { InventoryCenterLocationListEffects } from './effects/inventory-center-location-list.effects';
import { InventoryCenterPriceListEffects } from './effects/inventory-center-price-list.effects';
import { InventoryCenterTableEffects } from './effects/inventory-center-table.effects';
import { InventoryCenterVendorTableEffects } from './effects/inventory-center-vendor-table.effects';
import * as fromInventoryCenter from './reducers';

export default [
    LoadProductDetialsGuard,
    provideState(fromInventoryCenter.featureKey, fromInventoryCenter.reducers),
    provideState('patient-center', fromPatientCenter.reducers),
    provideEffects([
        InventoryCenterTableEffects,
        InventoryCenterIndividualEffects,
        ProductCenterDetailsEffects,
        PatientCenterDetailsEffects,
        InventoryCenterPriceListEffects,
        InventoryCenterVendorTableEffects,
        InventoryCenterLocationListEffects,
        PatientInquiryChangesEffects,
    ]),
    {
        provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
        useValue: {
            subscriptSizing: 'dynamic',
        },
    },
    CurrencyPipe,
    DateTimeFormatPipe,
];
