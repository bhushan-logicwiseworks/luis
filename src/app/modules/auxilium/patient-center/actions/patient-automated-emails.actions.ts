import { createAction, props } from '@ngrx/store';
import { GetPatientAutomatedEmail } from 'app/shared/interfaces/auxilium/patient-center/patient-automated-emails.interface';

const LoadAutomatedEmails = createAction(
    '[Patient Automated Emails/API] Load Automated Emails',
    props<{ patientId: number }>()
);
const LoadAutomatedEmailsSuccess = createAction(
    '[Patient Automated Emails/API] Load Automated Emails Success',
    props<{ automatedEmails: GetPatientAutomatedEmail }>()
);
const LoadAutomatedEmailsFailure = createAction(
    '[Patient Automated Emails/API] Load Automated Emails Failure',
    props<{ error: Error }>()
);

export const PatientAutomatedEmailsActions = {
    LoadAutomatedEmails,
    LoadAutomatedEmailsSuccess,
    LoadAutomatedEmailsFailure,
};
