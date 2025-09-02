import { createAction, props } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';

const AddPatientDemographics = createAction(
    '[Patient Demographics/API] Add Patient Demographics',
    props<{ patient: PatientEntity }>()
);
const AddPatientDemographicsSuccess = createAction(
    '[Patient Demographics/API] Add Patient Demographics Success',
    props<{ demographics: PatientEntity }>()
);
const AddPatientDemographicsFailure = createAction(
    '[Patient Demographics/API] Add Patient Demographics Failure',
    props<{ error: Error }>()
);

const getReferCode = createAction('[Patient Demographics/API] Get Refer Code', props<{ id: number }>());
const getReferCodeSuccess = createAction(
    '[Patient Demographics/API] Get Refer Code Success',
    props<{ referCode: string }>()
);
const getReferCodeFailure = createAction(
    '[Patient Demographics/API] Get Refer Code Failure',
    props<{ error: Error }>()
);

const LoadBranchDropDown = createAction('[Patient API] Load Branch DropDown');
const LoadBranchDropDownSuccess = createAction(
    '[Patient API] Load Branch DropDown Success',
    props<{ branch: GetBranchListResponse }>()
);
const LoadBranchDropDownFailure = createAction('[Patient API] Load Branch DropDown Failure', props<{ error: Error }>());

const LoadPrismAuthorization = createAction(
    '[Patient Demographics/API] Get Patient Prism Authorization Demographics',
    props<{ id: number }>()
);
const LoadPrismAuthorizationSuccess = createAction(
    '[Patient Demographics/API] Get Patient Prism Authorization Demographics Success',
    props<{ authPrism: any }>()
);
const LoadPrismAuthorizationFailure = createAction(
    '[Patient Demographics/API] Get Patient Prism Authorization Demographics Failure',
    props<{ error: Error }>()
);

const prismAuthorization = createAction('[Prism] Prism Authorization Demographics', props<{ id: number }>());
const prismAuthorizationSuccess = createAction(
    '[API] Prism Authorization Demographics Success',
    props<{ id: number }>()
);
const prismAuthorizationFailure = createAction(
    '[API] Prism Authorization Demographics Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[Patient ContactType/API] Refresh');

const ResetState = createAction('[Patient Demographics/API] Reset State');

export const PatientDemographicsActions = {
    AddPatientDemographics,
    AddPatientDemographicsSuccess,
    AddPatientDemographicsFailure,
    getReferCode,
    getReferCodeSuccess,
    getReferCodeFailure,
    LoadBranchDropDown,
    LoadBranchDropDownSuccess,
    LoadBranchDropDownFailure,
    LoadPrismAuthorization,
    LoadPrismAuthorizationSuccess,
    LoadPrismAuthorizationFailure,
    prismAuthorization,
    prismAuthorizationSuccess,
    prismAuthorizationFailure,
    ResetState,
    Refresh,
};
