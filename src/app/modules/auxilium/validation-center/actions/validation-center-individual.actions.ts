import { createAction, props } from '@ngrx/store';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { Validation } from 'app/shared/interfaces/auxilium/validation-center/validation.interface';

const AddValidationRep = createAction(
    '[ValidationCenter Create/API] Add Validation',
    props<{ validation: Validation }>()
);
const AddValidationRepSuccess = createAction(
    '[ValidationCenter Create/API] Add Validation Success',
    props<{ validation: Validation }>()
);
const AddValidationRepFailure = createAction(
    '[ValidationCenter Create/API] Add Validation Failure',
    props<{ error: Error }>()
);

const UpdateValidation = createAction(
    '[ValidationCenter Update/API] Update Validation',
    props<{ validation: Validation }>()
);
const UpdateValidationSuccess = createAction(
    '[ValidationCenter Update/API] Update Validation Success',
    props<{ validation: Validation }>()
);
const UpdateValidationFailure = createAction(
    '[ValidationCenter Update/API] Update Validation Failure',
    props<{ error: Error }>()
);

const DeleteValidation = createAction(
    '[ValidationCenter Delete/API] Delete Validation',
    props<{ phy: { id: number } }>()
);
const DeleteValidationSuccess = createAction('[ValidationCenter Delete/API] Delete Validation Success');
const DeleteValidationFailure = createAction(
    '[SalPhysicianCenteresRepCenter Delete/API] Delete Validation Failure',
    props<{ error: Error }>()
);

const LoadCityAndStateDropDown = createAction(
    '[ValidationCenter Table/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[ValidationCenter Table/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[ValidationCenter Table/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);
const Refresh = createAction('[ValidationCenter Table/API] Refresh');

export const ValidationCenterIndividualActions = {
    AddValidationRep,
    AddValidationRepSuccess,
    AddValidationRepFailure,
    UpdateValidation,
    UpdateValidationSuccess,
    UpdateValidationFailure,
    DeleteValidation,
    DeleteValidationSuccess,
    DeleteValidationFailure,
    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,
    Refresh,
};
