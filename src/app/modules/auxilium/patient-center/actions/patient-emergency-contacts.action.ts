import { createAction, props } from '@ngrx/store';
import {
    GetPatientEmergencyContact,
    PatientEmergencyContact,
} from 'app/shared/interfaces/auxilium/patient-center/patient-emergency-contacts.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';

const LoadEmergencyContacts = createAction(
    '[Patient Emergency Contacts/API] Load Emergency Contacts',
    props<{ patientId: number }>()
);
const LoadEmergencyContactsSuccess = createAction(
    '[Patient Emergency Contacts/API] Load Emergency Contacts Success',
    props<{ emergencyContacts: GetPatientEmergencyContact }>()
);
const LoadEmergencyContactsFailure = createAction(
    '[Patient Emergency Contacts/API] Load Emergency Contacts Failure',
    props<{ error: Error }>()
);

const AddEmergencyContact = createAction(
    '[Patient Emergency Contacts/API] Add Emergency Contact',
    props<{ emergencyContact: PatientEmergencyContact }>()
);
const AddEmergencyContactSuccess = createAction('[Patient Emergency Contacts/API] Add Emergency Contact Success');
const AddEmergencyContactFailure = createAction(
    '[Patient Emergency Contacts/API] Add Emergency Contact Failure',
    props<{ error: Error }>()
);

const DeleteEmergencyContact = createAction(
    '[Patient Emergency Contacts/API] Delete Emergency Contact',
    props<{ emergencyContact: PatientEmergencyContact }>()
);
const DeleteEmergencyContactSuccess = createAction('[Patient Emergency Contacts/API] Delete Emergency Contact Success');
const DeleteEmergencyContactFailure = createAction(
    '[Patient Emergency Contacts/API] Delete Emergency Contact Failure',
    props<{ error: Error }>()
);

const LoadCityAndStateDropDown = createAction(
    '[Patient Emergency Contacts/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[Patient Emergency Contacts/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[Patient Emergency Contacts/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[Patient Emergency Contacts/API] Refresh');
const ResetState = createAction('[Patient Emergency Contacts/API] Reset Emergency Contacts State');

export const EmergencyContactsActions = {
    LoadEmergencyContacts,
    LoadEmergencyContactsSuccess,
    LoadEmergencyContactsFailure,
    AddEmergencyContact,
    AddEmergencyContactSuccess,
    AddEmergencyContactFailure,
    DeleteEmergencyContact,
    DeleteEmergencyContactSuccess,
    DeleteEmergencyContactFailure,
    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,
    Refresh,
    ResetState,
};
