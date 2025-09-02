import { CurrencyPipe } from '@angular/common';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { DateTimeFormatPipe } from '../../../shared/pipes/auxilium/aux-datetimeformat.pipe';
import { PhoneNumberPipe } from '../../../shared/pipes/auxilium/aux-phonenumber.pipe';
import { PayorCenterDetailsEffects } from '../payor-center/effects/payor-center-details.effects';
import * as fromPayorCenter from '../payor-center/reducers';
import { PatientAlternateAddressEffects } from './effects/patient-alternate-address.effects';
import { PatientArHistoryEffects } from './effects/patient-ar-history.effects';
import { PatientAuditEffects } from './effects/patient-audit.effects';
import { PatientAutomatedEmailsEffects } from './effects/patient-automated-emails.effects';
import { PatientCareManagementEffects } from './effects/patient-caremanagement.effect';
import { PatientCenterDetailsEffects } from './effects/patient-center-details.effects';
import { PatientCenterDiagnosiscodesEffects } from './effects/patient-center-diagnosiscode.effects';
import { PatientCenterPayorsEffects } from './effects/patient-center-payors.effects';
import { PatientCenterPhysiciansEffects } from './effects/patient-center-physicians.effects';
import { PatientCenterSensorEffects } from './effects/patient-center-sensor.effects';
import { PatientCenterTableEffects } from './effects/patient-center-table.effects';
import { PatientChargesEffects } from './effects/patient-charges.effects';
import { PatientChecklistEffects } from './effects/patient-checklist.effects';
import { PatientCollectionNotesEffects } from './effects/patient-collection-notes.effects';
import { PatientComplianceEffects } from './effects/patient-compliance.effects';
import { PatientDemographicsEffects } from './effects/patient-demographics.effects';
import { PatientDocumentsEffects } from './effects/patient-documents.effects';
import { PatientEFirstEffects } from './effects/patient-efirst.effects';
import { PatientEmergencyContactsEffects } from './effects/patient-emergency-contacts.effects';
import { PatientEventsBillingEffects } from './effects/patient-events-billing.effects';
import { PatientInquiryChangesEffects } from './effects/patient-inquiry-changes.effects';
import { PatientNotesEffects } from './effects/patient-notes.effects';
import { PatientOrderEffects } from './effects/patient-order-history.effect';
import { PatientPaymentsAdjustmentsEffects } from './effects/patient-payments-adjustments.effects';
import { PatientSWOEffects } from './effects/patient-prefilled-editable-swo.effects';
import { PatientWorkOrderEffects } from './effects/patient-work-order.effect';
import { QuickFaxToolEffects } from './effects/quick-fax-tool.effects';
import * as fromPatientCenter from './reducers';

export default [
    provideState('payor-center', fromPayorCenter.reducers),
    provideState(fromPatientCenter.featureKey, fromPatientCenter.reducers),
    provideEffects([
        PatientCenterTableEffects,
        PatientCenterDetailsEffects,
        PatientCenterPayorsEffects,
        PatientOrderEffects,
        PatientAlternateAddressEffects,
        PatientDocumentsEffects,
        PatientNotesEffects,
        PatientCollectionNotesEffects,
        PatientDemographicsEffects,
        PatientChecklistEffects,
        PatientWorkOrderEffects,
        PatientCenterSensorEffects,
        PatientCenterDiagnosiscodesEffects,
        PatientCenterPhysiciansEffects,
        QuickFaxToolEffects,
        PatientEmergencyContactsEffects,
        PatientAutomatedEmailsEffects,
        PatientArHistoryEffects,
        PatientEFirstEffects,
        PatientInquiryChangesEffects,
        PatientSWOEffects,
        PatientComplianceEffects,
        PatientCareManagementEffects,
        PayorCenterDetailsEffects,
        PatientAuditEffects,
        PatientPaymentsAdjustmentsEffects,
        PatientChargesEffects,
        PatientEventsBillingEffects,
    ]),
    CurrencyPipe,
    PhoneNumberPipe,
    DateTimeFormatPipe,
];
