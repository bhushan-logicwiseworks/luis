import { createAction, props } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { PatientWorkOrders } from 'app/shared/interfaces/auxilium/patient-center/work-orders.interface';

const LoadWorkOrder = createAction(
    '[Patient LoadWorkOrder/API] Load LoadWorkOrder',
    props<{ patientId: Patient['id'] }>()
);
const LoadWorkOrderSuccess = createAction(
    '[Patient LoadWorkOrder/API] Load LoadWorkOrder Success',
    props<{ data: PatientWorkOrders[] }>()
);
const LoadWorkOrderFailure = createAction(
    '[Patient LoadWorkOrder/API] Load LoadWorkOrder Failure',
    props<{ error: Error }>()
);

const EditGroupWorkEdit = createAction(
    '[Patient EditGroupWorkEdit/API] Edit GroupWorkOrder',
    props<{ patientData: any }>()
);
const EditGroupWorkEditSuccess = createAction('[Patient EditGroupWorkEdit/API] Edit GroupWorkOrder Success');
const EditGroupWorkEditFailure = createAction(
    '[Patient EditGroupWorkEdit/API] Edit GroupWorkOrder Failure',
    props<{ error: Error }>()
);

const ShipWorkOrder = createAction('[Patient ShipWorkOrder/API] Edit ShipWorkOrder', props<{ patientData: any }>());
const ShipWorkOrderSuccess = createAction(
    '[Patient ShipWorkOrder/API] Edit ShipWorkOrder Success',
    props<{ data: PatientWorkOrders[] }>()
);
const ShipWorkOrderFailure = createAction(
    '[Patient ShipWorkOrder/API] Edit ShipWorkOrder Failure',
    props<{ error: Error }>()
);

const ToggleWorkOrderFilter = createAction('[Toggle Work Order] Load LoadWorkOrder Failure');

const SaveSelectedProcessShortcut = createAction(
    '[Patient LoadWorkOrder/API] Load process Shortcut',
    props<{ id: number; patientId: number }>()
);
const SaveSelectedProcessShortcutSuccess = createAction(
    '[Patient LoadWorkOrder/API] Load Selected Process Shortcut Success'
);
const SaveSelectedProcessShortcutFailure = createAction(
    '[Patient LoadWorkOrder/API] Load Selected Process Shortcut Failure',
    props<{ error: Error }>()
);

const LoadBranchDropDown = createAction('[Patient WordOrder API] Load Branch DropDown');
const LoadBranchDropDownSuccess = createAction(
    '[Patient WordOrder API] Load Branch DropDown Success',
    props<{ branch: GetBranchListResponse }>()
);
const LoadBranchDropDownFailure = createAction(
    '[Patient WordOrder API] Load Branch DropDown Failure',
    props<{ error: Error }>()
);

export const PatientWorkOrderActions = {
    LoadWorkOrder,
    LoadWorkOrderSuccess,
    LoadWorkOrderFailure,
    EditGroupWorkEdit,
    EditGroupWorkEditSuccess,
    EditGroupWorkEditFailure,
    ToggleWorkOrderFilter,
    ShipWorkOrder,
    ShipWorkOrderSuccess,
    ShipWorkOrderFailure,
    SaveSelectedProcessShortcut,
    SaveSelectedProcessShortcutSuccess,
    SaveSelectedProcessShortcutFailure,
    LoadBranchDropDown,
    LoadBranchDropDownSuccess,
    LoadBranchDropDownFailure,
};
