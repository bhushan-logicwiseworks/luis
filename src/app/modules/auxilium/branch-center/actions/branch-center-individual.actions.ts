import { createAction, props } from '@ngrx/store';
import { BranchRepDisplay } from 'app/shared/interfaces/auxilium/branch-center/branchrep.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';

const LoadBranch = createAction('[BranchCenter Table/API] Load BranchRep');
const LoadBranchSuccess = createAction(
    '[BranchCenter Table/API] Load BranchRep Success',
    props<{ branch: BranchRepDisplay }>()
);
const LoadBranchFailure = createAction('[BranchCenter Table/API] Load BranchRep Failure', props<{ error: Error }>());

const AddBranch = createAction('[BranchRepCenter Create/API] Add BranchRep', props<{ branch: BranchRepDisplay }>());
const AddBranchSuccess = createAction(
    '[BranchRepCenter Create/API] Add BranchRep Success',
    props<{ branch: BranchRepDisplay }>()
);
const AddBranchFailure = createAction('[BranchRepCenter Create/API] Add BranchRep Failure', props<{ error: Error }>());

const UpdateBranch = createAction(
    '[BranchRepCenter Update/API] Update BranchRep',
    props<{ branch: BranchRepDisplay }>()
);
const UpdateBranchSuccess = createAction(
    '[BranchRepCenter Update/API] Update BranchRep Success',
    props<{ branch: BranchRepDisplay }>()
);
const UpdateBranchFailure = createAction(
    '[BranchRepCenter Update/API] Update BranchRep Failure',
    props<{ error: Error }>()
);

const LoadCityAndStateDropDown = createAction(
    '[BranchRepCenter Update/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[BranchRepCenter Update/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[BranchRepCenter Update/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

export const BranchCenterIndividualActions = {
    LoadBranch,
    LoadBranchFailure,
    LoadBranchSuccess,
    AddBranch,
    AddBranchSuccess,
    AddBranchFailure,
    UpdateBranch,
    UpdateBranchSuccess,
    UpdateBranchFailure,
    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,
};
