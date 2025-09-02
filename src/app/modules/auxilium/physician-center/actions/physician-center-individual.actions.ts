import { createAction, props } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { PhysicianDisplay } from 'app/shared/interfaces/auxilium/physician-center/physician.interface';

const LoadPhysician = createAction('[PhysicianCenter Table/API] Load Physician');
const LoadPhysicianSuccess = createAction(
    '[PhysicianCenter Table/API] Load Physician Success',
    props<{ physician: PhysicianDisplay }>()
);
const LoadPhysicianFailure = createAction(
    '[PhysicianCenter Table/API] Load Physician Failure',
    props<{ error: Error }>()
);

const AddPhysicianRep = createAction(
    '[PhysicianCenter Create/API] Add Physician',
    props<{ physician: PhysicianDisplay }>()
);
const AddPhysicianRepSuccess = createAction(
    '[PhysicianCenter Create/API] Add Physician Success',
    props<{ physician: PhysicianDisplay }>()
);
const AddPhysicianRepFailure = createAction(
    '[PhysicianCenter Create/API] Add Physician Failure',
    props<{ error: Error }>()
);

const UpdatePhysician = createAction(
    '[PhysicianCenter Update/API] Update Physician',
    props<{ physician: PhysicianDisplay }>()
);
const UpdatePhysicianSuccess = createAction(
    '[PhysicianCenter Update/API] Update Physician Success',
    props<{ physician: PhysicianDisplay }>()
);
const UpdatePhysicianFailure = createAction(
    '[PhysicianCenter Update/API] Update Physician Failure',
    props<{ error: Error }>()
);

const DeletePhysician = createAction('[PhysicianCenter Delete/API] Delete Physician', props<{ phy: { id: number } }>());
const DeletePhysicianSuccess = createAction('[PhysicianCenter Delete/API] Delete Physician Success');
const DeletePhysicianFailure = createAction(
    '[SalPhysicianCenteresRepCenter Delete/API] Delete Physician Failure',
    props<{ error: Error }>()
);

const LoadCityAndStateDropDown = createAction(
    '[PhysicianCenter Table/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[PhysicianCenter Table/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[PhysicianCenter Table/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

const LoadBranchDropDown = createAction('[PhysicianCenter Load/API] Load Branch DropDown');
const LoadBranchDropDownSuccess = createAction(
    '[PhysicianCenter Load/API] Load Branch DropDown Success',
    props<{ branch: GetBranchListResponse }>()
);
const LoadBranchDropDownFailure = createAction(
    '[PhysicianCenter Load/API] Load Branch DropDown Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[PhysicianCenter Table/API] Refresh');

export const PhysicianCenterIndividualActions = {
    LoadPhysician,
    LoadPhysicianFailure,
    LoadPhysicianSuccess,
    AddPhysicianRep,
    AddPhysicianRepSuccess,
    AddPhysicianRepFailure,
    UpdatePhysician,
    UpdatePhysicianSuccess,
    UpdatePhysicianFailure,
    DeletePhysician,
    DeletePhysicianSuccess,
    DeletePhysicianFailure,
    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,
    LoadBranchDropDown,
    LoadBranchDropDownSuccess,
    LoadBranchDropDownFailure,
    Refresh,
};
