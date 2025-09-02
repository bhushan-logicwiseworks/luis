import { Route } from '@angular/router';
import { LoadWorkOrderBranchListGuard } from '../work-order-center/guard/branch-list.guard';
import { LoadArHistoryBranchListGuard } from './actions/guards/arHistory-branch-list.guard';
import { LoadDemographicsBranchListGuard } from './actions/guards/demograpic-branch-list.guard';
import { LoadInquiryBranchListGuard } from './actions/guards/inquiry-branch-list.guard';
import { LoadPatientDetialsGuard } from './actions/guards/load-patient-details.guard';
import { PatientInquiryChangesGuard } from './actions/guards/patient-inquiry-changes.guard';
import { PatientArHistoryEditComponent } from './components/patient-ar-history/components/patient-ar-history-edit/patient-ar-history-edit.component';
import { PatientArHistoryTableComponent } from './components/patient-ar-history/patient-ar-history-table/patient-ar-history-table.component';
import { PatientAuditComponent } from './components/patient-audit/patient-audit-table/patient-audit.component';
import { PatientAutomatedEmailsComponent } from './components/patient-automated-emails/patient-automated-emails-table/patient-automated-emails.component';
import { PatientCareManagementTableComponent } from './components/patient-caremanagement/patient-caremanagement-table/patient-caremanagement-table.component';
import { PatientChargeEditComponent } from './components/patient-charges/patient-charge-edit/patient-charge-edit.component';
import { PatientChargesTableComponent } from './components/patient-charges/patient-charges-table/patient-charges-table.component';
import { PatientChecklistsComponent } from './components/patient-checklists/patient-checklists.component';
import { PatientCollectionNotesComponent } from './components/patient-collection-notes/patient-collection-notes-table/patient-collection-notes.component';
import { PatientComplianceComponent } from './components/patient-compliance/patient-compliance-table/patient-compliance.component';
import { PatientContactNotesComponent } from './components/patient-contact-notes/patient-contact-notes-table/patient-contact-notes.component';
import { PatientDemographicsViewComponent } from './components/patient-demographics-view/patient-demographics-view.component';
import { PatientDemographicsComponent } from './components/patient-demographics/patient-demographics.component';
import { PatientDiagnosisCodesTableComponent } from './components/patient-diagnosis-codes/patient-diagnosis-codes-table/patient-diagnosis-codes-table.component';
import { PatientDocumentsComponent } from './components/patient-documents/patient-documents-table/patient-documents.component';
import { PatientEFirstComponent } from './components/patient-efirst/patient-efirst-table/patient-efirst.component';
import { PatientEmergencyContactsTableComponent } from './components/patient-emergency-contacts/patient-emergency-contacts-table/patient-emergency-contacts-table.component';
import { InsurancePaidPatientTableComponent } from './components/patient-events-billing/insurance-paid-patient-table/insurance-paid-patient-table.component';
import { PatientAppealResponseTableComponent } from './components/patient-events-billing/patient-appeal-response-table/patient-appeal-response-table.component';
import { PatientCallsTableComponent } from './components/patient-events-billing/patient-calls-table/patient-calls-table.component';
import { PatientClaimCallsTableComponent } from './components/patient-events-billing/patient-claim-calls-table/patient-claim-calls-table.component';
import { PatientFinancialAssistanceProgramTableComponent } from './components/patient-events-billing/patient-financial-assistance-program-table/patient-financial-assistance-program-table.component';
import { PatientInsuranceRefundsTableComponent } from './components/patient-events-billing/patient-insurance-refunds-table/patient-insurance-refunds-table.component';
import { PatientOpenArReportTableComponent } from './components/patient-events-billing/patient-open-ar-report-table/patient-open-ar-report-table.component';
import { PatientPrimaryAppealDenialsRejectionsTableComponent } from './components/patient-events-billing/patient-primary-appeal-denials-rejections-table/patient-primary-appeal-denials-rejections-table.component';
import { PatientRefundsTableComponent } from './components/patient-events-billing/patient-refunds-table/patient-refunds-table.component';
import { PatientReturnsTableComponent } from './components/patient-events-billing/patient-returns-table/patient-returns-table.component';
import { PatientSecondaryTertiaryAppealsDenialsRejectionsTableComponent } from './components/patient-events-billing/patient-secondary-tertiary-appeals-denials-rejections-table/patient-secondary-tertiary-appeals-denials-rejections-table.component';
import { PatientInquiryChangesEditComponent } from './components/patient-inquiry-changes/patient-inquiry-changes-edit/patient-inquiry-changes-edit.component';
import { PatientInQuiryChangesTableComponent } from './components/patient-inquiry-changes/patient-inquiry-changes-table/patient-inquiry-changes-table.component';
import { PatientOrderHistoryComponent } from './components/patient-order-history/patient-order-history.component';
import { PatientAlternateAddressesComponent } from './components/patient-other-address/patient-alternate-address-table/patient-alternate-addresses.component';
import { PatientPayAdjustComponent } from './components/patient-payments-adjustments/patient-pay-adjust/patient-pay-adjust.component';
import { PatientPaymentsAdjustmentsEditComponent } from './components/patient-payments-adjustments/patient-payments-adjustments-edit/patient-payments-adjustments-edit.component';
import { PatientPaymentsAdjustmentsTableComponent } from './components/patient-payments-adjustments/patient-payments-adjustments-table/patient-payments-adjustments-table.component';
import { PatientSubsequentPaymentsEditComponent } from './components/patient-payments-adjustments/patient-subsequent-payments-edit/patient-subsequent-payments-edit.component';
import { PatientPayorsTableComponent } from './components/patient-payors/patient-payors-table/patient-payors-table.component';
import { PatientPhysiciansTableComponent } from './components/patient-physicians/patient-physicians-table/patient-physicians-table.component';
import { PatientPrefilledEditableSwoComponent } from './components/patient-prefilled-editable-swo/patient-prefilled-editable-swo.component';
import { PatientSensorComponent } from './components/patient-sensor/patient-sensor.component';
import { AddEditPatientWorkorderComponent } from './components/patient-work-order/add-edit-patient-workorder/add-edit-patient-workorder.component';
import { PatientWorkOrderComponent } from './components/patient-work-order/patient-work-order.component';
import { QuickFaxToolComponent } from './components/quick-fax-tool/quick-fax-tool.component';
import { PatientCenterComponent } from './containers/patient-center-component/patient-center.component';
import { PatientDetailsComponent } from './containers/patient-center-details/patient-details.component';
import { PatientCenterTableComponent } from './containers/patient-center-table/patient-center-table.component';
import providers from './patient-center.providers';

export default [
    {
        path: '',
        component: PatientCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'none',
                pathMatch: 'full',
            },
            {
                path: 'none',
                component: PatientCenterTableComponent,
            },
            /* {
                path: 'recent',
                component: PatientCenterTableComponent,
            },
            {
                path: 'pending',
                component: PatientCenterTableComponent,
            },
            {
                path: 'active',
                component: PatientCenterTableComponent,
            },
            {
                path: 'inactive',
                component: PatientCenterTableComponent,
            },
            {
                path: 'deleted',
                component: PatientCenterTableComponent,
            },
            {
                path: 'all',
                component: PatientCenterTableComponent,
            },
            {
                path: 'cgm',
                component: PatientCenterTableComponent,
            },
            {
                path: 'enteral',
                component: PatientCenterTableComponent,
            },
            {
                path: 'incontinence',
                component: PatientCenterTableComponent,
            },
            {
                path: 'ostomy',
                component: PatientCenterTableComponent,
            },
            {
                path: 'urology',
                component: PatientCenterTableComponent,
            },
            {
                path: 'wound',
                component: PatientCenterTableComponent,
            }, */
        ],
    },
    {
        path: ':id/demographics/view',
        component: PatientDetailsComponent,
        children: [{ path: '', component: PatientDemographicsViewComponent }],
    },
    {
        path: ':id',
        canActivate: [
            LoadDemographicsBranchListGuard,
            LoadArHistoryBranchListGuard,
            LoadInquiryBranchListGuard,
            LoadWorkOrderBranchListGuard,
        ],
        component: PatientDetailsComponent,
        providers: providers,
        children: [
            { path: '', redirectTo: 'demographics', pathMatch: 'full' },
            { path: 'demographics', component: PatientDemographicsComponent, canActivate: [LoadPatientDetialsGuard] },
            // { path: 'demographics/view', component: PatientDemographicsViewComponent },
            { path: 'checklists', component: PatientChecklistsComponent, canActivate: [LoadPatientDetialsGuard] },
            { path: 'payors', component: PatientPayorsTableComponent },
            { path: 'alternate-addresses', component: PatientAlternateAddressesComponent },
            { path: 'documents', component: PatientDocumentsComponent },
            { path: 'order-history', component: PatientOrderHistoryComponent },
            { path: 'contact-notes', component: PatientContactNotesComponent },
            { path: 'collection-notes', component: PatientCollectionNotesComponent },
            { path: 'work-order', component: PatientWorkOrderComponent },
            { path: 'work-order/add', component: AddEditPatientWorkorderComponent, pathMatch: 'full' },
            { path: 'work-order/add/:id', component: AddEditPatientWorkorderComponent, pathMatch: 'full' },
            { path: 'sensor-usage-timeline', component: PatientSensorComponent },
            { path: 'prefilled-editable-swo', component: PatientPrefilledEditableSwoComponent },
            { path: 'automated-emails-sent', component: PatientAutomatedEmailsComponent },
            { path: 'efirst', component: PatientEFirstComponent },
            { path: 'quickfaxtool', component: QuickFaxToolComponent },
            { path: 'physicians', component: PatientPhysiciansTableComponent },
            { path: 'diagnosis-codes', component: PatientDiagnosisCodesTableComponent },
            { path: 'additional-contacts', component: PatientEmergencyContactsTableComponent },
            { path: 'ar-history', component: PatientArHistoryTableComponent },
            { path: 'inquiry-changes', component: PatientInQuiryChangesTableComponent },
            { path: 'ar-history/add/:id', component: PatientArHistoryEditComponent },
            {
                path: 'inquiry-changes/add/:id',
                component: PatientInquiryChangesEditComponent,
                canActivate: [PatientInquiryChangesGuard],
            },
            { path: 'compliance', component: PatientComplianceComponent },
            { path: 'caremanagement', component: PatientCareManagementTableComponent },
            { path: 'audit-event', component: PatientAuditComponent },
            { path: 'payments-adjustments', component: PatientPaymentsAdjustmentsTableComponent },
            { path: 'payments-adjustments/add/:id', component: PatientPaymentsAdjustmentsEditComponent },
            { path: 'pay-adjust/add/:id', component: PatientPayAdjustComponent },
            { path: 'charges', component: PatientChargesTableComponent },
            { path: 'charges/add/:id', component: PatientChargeEditComponent },
            { path: 'subsequent-payments/add/:id', component: PatientSubsequentPaymentsEditComponent },
            { path: 'primary', component: PatientPrimaryAppealDenialsRejectionsTableComponent },
            { path: 'secondary', component: PatientSecondaryTertiaryAppealsDenialsRejectionsTableComponent },
            { path: 'insurancerefunds', component: PatientInsuranceRefundsTableComponent },
            { path: 'patientrefunds', component: PatientRefundsTableComponent },
            { path: 'insurancepaid', component: InsurancePaidPatientTableComponent },
            { path: 'returns', component: PatientReturnsTableComponent },
            { path: 'patientcalls', component: PatientCallsTableComponent },
            { path: 'claimcalls', component: PatientClaimCallsTableComponent },
            { path: 'appeals', component: PatientAppealResponseTableComponent },
            { path: 'openarreport', component: PatientOpenArReportTableComponent },
            { path: 'financialassistance', component: PatientFinancialAssistanceProgramTableComponent },
        ],
    },
] as Route[];
