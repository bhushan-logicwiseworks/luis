import { createAction, props } from '@ngrx/store';
import { PatientOtherAddress } from 'app/shared/interfaces/auxilium/patient-center/patient-alternate-address.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';

const LoadAlternateAddress = createAction(
    '[Patient AlternateAddress/API] Load AlternateAddress',
    props<{ patientId: PatientOtherAddress['id'] }>()
);
const LoadAlternateAddressSuccess = createAction(
    '[Patient AlternateAddress/API] Load AlternateAddress Success',
    props<{ address: PatientOtherAddress[] }>()
);
const LoadAlternateAddressFailure = createAction(
    '[Patient AlternateAddress/API] Load AlternateAddress Failure',
    props<{ error: Error }>()
);

const AddAlternateAddress = createAction(
    '[Patient AlternateAddress/API] Add AlternateAddress',
    props<{ address: PatientOtherAddress }>()
);
const AddAlternateAddressSuccess = createAction(
    '[Patient AlternateAddress/API] Add AlternateAddress Success',
    props<{ address: PatientOtherAddress[] }>()
);
const AddAlternateAddressFailure = createAction(
    '[Patient AlternateAddress/API] Add AlternateAddress Failure',
    props<{ error: Error }>()
);

const DeleteAlternateAddress = createAction(
    '[Patient AlternateAddress/API] Delete AlternateAddress',
    props<{ address: PatientOtherAddress }>()
);
const DeleteAlternateAddressSuccess = createAction('[Patient AlternateAddress/API] Delete AlternateAddress Success');
const DeleteAlternateAddressFailure = createAction(
    '[Patient AlternateAddress/API] Delete AlternateAddress Failure',
    props<{ error: Error }>()
);

const LoadCityAndStateDropDown = createAction(
    '[Patient AlternateAddress/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[Patient AlternateAddress/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[Patient AlternateAddress/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[Patient AlternateAddress/API] Refresh AlternateAddress');
const ResetState = createAction('[Patient AlternateAddress/API] ResetState AlternateAddress');

export const PatientAlternateAddressActions = {
    LoadAlternateAddress,
    LoadAlternateAddressSuccess,
    LoadAlternateAddressFailure,

    AddAlternateAddress,
    AddAlternateAddressSuccess,
    AddAlternateAddressFailure,

    DeleteAlternateAddress,
    DeleteAlternateAddressSuccess,
    DeleteAlternateAddressFailure,

    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,

    Refresh,
    ResetState,
};
