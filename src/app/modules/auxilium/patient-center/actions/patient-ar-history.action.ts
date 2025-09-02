import { createAction, props } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { PatientArHistoryById } from 'app/shared/interfaces/auxilium/patient-center/patient-ar-history-by-id.interface';
import { PatientArHistory } from 'app/shared/interfaces/auxilium/patient-center/patient-ar-history.interface';
import { DropdownDisplay } from 'app/shared/interfaces/auxilium/patient-center/patient-status.interface';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';

const LoadArHistory = createAction(
    '[Patient LoadArHistory/API] Load LoadArHistory',
    props<{ patientId: Patient['id'] }>()
);
const LoadArHistorySuccess = createAction(
    '[Patient LoadArHistory/API] Load LoadArHistory Success',
    props<{ data: PatientArHistory[] }>()
);
const LoadArHistoryFailure = createAction(
    '[Patient LoadArHistory/API] Load LoadArHistory Failure',
    props<{ error: Error }>()
);

const LoadHistoryById = createAction(
    '[Patient LoadArHistory/API] Load LoadArHistoryById',
    props<{ arHistoryId: number }>()
);
const LoadHistoryByIdSuccess = createAction(
    '[Patient LoadArHistory/API] Load LoadArHistoryById Success',
    props<{ historyData: PatientArHistoryById }>()
);
const LoadHistoryByIdFailure = createAction(
    '[Patient LoadArHistory/API] Load LoadArHistoryById Failure',
    props<{ error: Error }>()
);

const saveArHistory = createAction(
    '[Patient LoadArHistory/API] saveArHistory',
    props<{ arHistory: PatientArHistoryById }>()
);
const saveArHistorySuccess = createAction('[Patient LoadArHistory/API] saveArHistory Success');
const saveArHistoryFailure = createAction(
    '[Patient LoadArHistory/API] saveArHistory Failure',
    props<{ error: Error }>()
);

const BillTypeDropdown = createAction('[BillTypedropdown Table/API] Load BillType DropDown');
const BillTypeDropdownSuccess = createAction(
    '[BillTypedropdown Table/API] Load BillType DropDown Success',
    props<{ billType: DropdownDisplay[] }>()
);
const BillTypeDropdownFailure = createAction(
    '[BillTypedropdown Table/API] Load BillType DropDown Failure',
    props<{ error: Error }>()
);

const LoadBranchDropDown = createAction('[Patient LoadArHistory Details API] Load Branch DropDown');
const LoadBranchDropDownSuccess = createAction(
    '[Patient LoadArHistory Details API] Load Branch DropDown Success',
    props<{ branch: GetBranchListResponse }>()
);
const LoadBranchDropDownFailure = createAction(
    '[Patient LoadArHistory Details API] Load Branch DropDown Failure',
    props<{ error: Error }>()
);

const AmtAdjustedCodeDropdown = createAction('[AmtAdjustedCode Table/API] Load AmtAdjustedCode DropDown');
const AmtAdjustedCodeDropdownSuccess = createAction(
    '[AmtAdjustedCode Table/API] Load AmtAdjustedCode DropDown Success',
    props<{ amtAdjustedCode: DropdownDisplay[] }>()
);
const AmtAdjustedCodeDropdownFailure = createAction(
    '[AmtAdjustedCode Table/API] Load AmtAdjustedCode DropDown Failure',
    props<{ error: Error }>()
);

const DeleteArHistory = createAction(
    '[ArHistory/API] Delete Patient ArHistory',
    props<{ arHistory: PatientArHistory }>()
);
const DeleteArHistorySuccess = createAction('[ArHistory/API] Delete Patient ArHistory Success');
const DeleteArHistoryFailure = createAction(
    '[ArHistory/API] Delete Patient ArHistory Failure',
    props<{ error: Error }>()
);
const Refresh = createAction('[PatientArHistory/API] Refresh');

const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());

export const PatientArHistoryActions = {
    LoadArHistory,
    LoadArHistorySuccess,
    LoadArHistoryFailure,
    LoadHistoryById,
    saveArHistory,
    saveArHistorySuccess,
    saveArHistoryFailure,
    LoadHistoryByIdSuccess,
    LoadHistoryByIdFailure,
    BillTypeDropdown,
    BillTypeDropdownSuccess,
    BillTypeDropdownFailure,
    LoadBranchDropDown,
    LoadBranchDropDownSuccess,
    LoadBranchDropDownFailure,
    AmtAdjustedCodeDropdown,
    AmtAdjustedCodeDropdownSuccess,
    AmtAdjustedCodeDropdownFailure,
    DeleteArHistory,
    DeleteArHistorySuccess,
    DeleteArHistoryFailure,
    Refresh,
    Navigate,
};
