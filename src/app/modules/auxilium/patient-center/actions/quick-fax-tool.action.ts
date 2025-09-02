import { createAction, props } from '@ngrx/store';

const sendFaxMessage = createAction(
    '[Patient/API] Send Fax',
    props<{ patientId: number; title: string; message: string }>()
);
const sendFaxMessageSuccess = createAction('[Patient/API] Send Fax Success', props<{ message: any }>());
const sendFaxMessageFailure = createAction('[Patient/API] Send Fax Failure', props<{ error: Error }>());

const getDoctorDetails = createAction('[Patient/API] Get Doctor Details', props<{ patientId: number }>());
const getDoctorDetailsSuccess = createAction(
    '[Patient/API] Get Doctor Details Success',
    props<{ doctorDetails: any }>()
);
const getDoctorDetailsFailure = createAction('[Patient/API] Get Doctor Details Failure', props<{ error: Error }>());

export const QuickFaxToolActions = {
    sendFaxMessage,
    sendFaxMessageSuccess,
    sendFaxMessageFailure,
    getDoctorDetails,
    getDoctorDetailsSuccess,
    getDoctorDetailsFailure,
};
