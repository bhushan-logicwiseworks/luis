import { Route } from '@angular/router';
import providers from './billing-events-center.providers';
import { AllBillingEventsComponent } from './components/all-billing-events/all-billing-events.component';
import { AppealResponseComponent } from './components/appeal-response/appeal-response.component';
import { ClaimCallsComponent } from './components/claim-calls/claim-calls.component';
import { FinancialAssistanceProgramComponent } from './components/financial-assistance-program/financial-assistance-program.component';
import { InsurancePaidPatientComponent } from './components/insurance-paid-patient/insurance-paid-patient.component';
import { InsuranceRefundsComponent } from './components/insurance-refunds/insurance-refunds.component';
import { OpenArReportComponent } from './components/open-ar-report/open-ar-report.component';
import { PatientCallsComponent } from './components/patient-calls/patient-calls.component';
import { PatientRefundsComponent } from './components/patient-refunds/patient-refunds.component';
import { PrimaryAppealDenialsRejectionsComponent } from './components/primary-appeal-denials-rejections/primary-appeal-denials-rejections.component';
import { ReturnsComponent } from './components/returns/returns.component';
import { SecondaryTertiaryAppealsDenialsRejectionsComponent } from './components/secondary-tertiary-appeals-denials-rejections/secondary-tertiary-appeals-denials-rejections.component';
import { BillingEventsCenterComponent } from './containers/billing-events-center/billing-events-center.component';

export default [
    {
        path: '',
        component: BillingEventsCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full',
            },
            {
                path: 'all',
                component: AllBillingEventsComponent,
            },
            {
                path: 'primary',
                component: PrimaryAppealDenialsRejectionsComponent,
            },
            {
                path: 'secondary',
                component: SecondaryTertiaryAppealsDenialsRejectionsComponent,
            },
            {
                path: 'insurancerefunds',
                component: InsuranceRefundsComponent,
            },
            {
                path: 'patientrefunds',
                component: PatientRefundsComponent,
            },
            {
                path: 'insurancepaid',
                component: InsurancePaidPatientComponent,
            },
            {
                path: 'returns',
                component: ReturnsComponent,
            },
            {
                path: 'patientcalls',
                component: PatientCallsComponent,
            },
            {
                path: 'claimcalls',
                component: ClaimCallsComponent,
            },
            {
                path: 'appeals',
                component: AppealResponseComponent,
            },
            {
                path: 'openarreport',
                component: OpenArReportComponent,
            },
            {
                path: 'financialassistance',
                component: FinancialAssistanceProgramComponent,
            },
        ],
    },
] as Route[];
