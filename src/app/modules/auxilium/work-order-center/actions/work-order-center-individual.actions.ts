import { createAction, props } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { DropdownDisplay } from 'app/shared/interfaces/auxilium/patient-center/patient-status.interface';
import { GetPatientResponse } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';
import { GetBatchEligibility } from 'app/shared/interfaces/auxilium/work-order-center/batch-eligibility-response.interface';
import { WorkOrderDisplay } from 'app/shared/interfaces/auxilium/work-order-center/work-order-center.interface';

const LoadWorkOrderDetails = createAction(
    '[WorkOrderCenter Indivisual/API] Load WorkOrderRep ',
    props<{ id: number }>()
);
const LoadWorkOrderDetailsSuccess = createAction(
    '[WorkOrderCenter Indivisual/API] Load WorkOrderRep Success',
    props<{ workrep: WorkOrderDisplay }>()
);
const LoadWorkOrderDetailsFailure = createAction(
    '[WorkOrderCenter Indivisual/API] Load WorkOrderRep Failure',
    props<{ error: Error }>()
);

const AddworkOrder = createAction(
    '[WorkOrderCenter Create/API] Add WorkOrderRep',
    props<{ workorder: WorkOrderDisplay }>()
);
const AddworkOrderSuccess = createAction(
    '[WorkOrderCenter Create/API] Add WorkOrderRep Success',
    props<{ workorder: WorkOrderDisplay }>()
);
const AddworkOrderFailure = createAction(
    '[WorkOrderCenter Create/API] Add WorkOrderRep Failure',
    props<{ error: Error }>()
);

const LoadworkSalesRep = createAction('[WorkOrderCenter /API] Load Work Order SalesReps');
const LoadworkSalesRepSuccess = createAction(
    '[WorkOrderCenter /API] Load Work Order SalesReps Success',
    props<{ salesrep: GetPatientResponse }>()
);
const LoadworkSalesRepFailure = createAction(
    '[WorkOrderCenter /API] Load Work Order SalesReps Failure',
    props<{ error: Error }>()
);

const getItemCode = createAction('[WorkOrderCenter /API] Get Item Code', props<{ id: number }>());
const getItemCodeSuccess = createAction('[WorkOrderCenter /API] Get Item Code Success', props<{ itemcode: string }>());
const getItemCodeFailure = createAction('[WorkOrderCenter /API] Get Item Code Failure', props<{ error: Error }>());

const BillTypeDropdown = createAction('[WorkOrderCenter /API] Load workorder BillType DropDown');
const BillTypeDropdownSuccess = createAction(
    '[WorkOrderCenter /API] Load workorder BillType DropDown Success',
    props<{ billType: DropdownDisplay[] }>()
);
const BillTypeDropdownFailure = createAction(
    '[WorkOrderCenter /API] Load workorder BillType DropDown Failure',
    props<{ error: Error }>()
);

const LoadPayorDetails = createAction('[WorkOrderCenter Table/API] Load Payor Details', props<{ id: number[] }>());
const LoadPayorDetailsSuccess = createAction(
    '[WorkOrderCenter Table/API] Load Payor Details Success',
    props<{ payorsDetail: Payor }>()
);
const LoadPayorDetailsFailure = createAction(
    '[WorkOrderCenter Table/API] Load Payor Details Failure',
    props<{ error: Error }>()
);

const getReferCode = createAction('[WorkOrderCenter /API] Get Refer Code', props<{ id: number }>());
const getReferCodeSuccess = createAction(
    '[WorkOrderCenter /API] Get Refer Code Success',
    props<{ referCode: string }>()
);
const getReferCodeFailure = createAction('[WorkOrderCenter /API] Get Refer Code Failure', props<{ error: Error }>());

const LoadBranchDropDown = createAction('[WorkOrderCenter API] Load Branch DropDown');
const LoadBranchDropDownSuccess = createAction(
    '[WorkOrderCenter API] Load Branch DropDown Success',
    props<{ branch: GetBranchListResponse }>()
);
const LoadBranchDropDownFailure = createAction(
    '[WorkOrderCenter API] Load Branch DropDown Failure',
    props<{ error: Error }>()
);

const GetBatchEligibility = createAction(
    '[WorkOrderCenter/API] Get Batch Eligibility',
    props<{ startDate: Date; endDate: Date }>()
);
const FilterBatchEligibilityRecords = createAction(
    '[WorkOrderCenter/API] Filter Batch Eligibility Records',
    props<{ startDate: Date; endDate: Date }>()
);
const GetBatchEligibilitySuccess = createAction(
    '[WorkOrderCenter/API] Get Batch Eligibility Success',
    props<{ eligibility: GetBatchEligibility }>()
);
const GetBatchEligibilityFailure = createAction(
    '[WorkOrderCenter/API] Get Batch Eligibility Failure',
    props<{ error: Error }>()
);

const ProcessBatchEligibility = createAction(
    '[WorkOrderCenter/API] Process Batch Eligibility',
    props<{ patientIds: number[] }>()
);
const ProcessBatchEligibilitySuccess = createAction(
    '[WorkOrderCenter/API] Process Batch Eligibility Success',
    props<{ eligibility: { patientId: number; isEligible: boolean }[] }>()
);
const ProcessBatchEligibilityFailure = createAction(
    '[WorkOrderCenter/API] Process Batch Eligibility Failure',
    props<{ error: Error }>()
);

const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());
const resetState = createAction('[WorkOrderCenter /API] Reset');

export const WorkOrderCenterIndividualActions = {
    LoadWorkOrderDetails,
    LoadWorkOrderDetailsFailure,
    LoadWorkOrderDetailsSuccess,

    LoadworkSalesRep,
    LoadworkSalesRepSuccess,
    LoadworkSalesRepFailure,

    BillTypeDropdown,
    BillTypeDropdownSuccess,
    BillTypeDropdownFailure,

    getItemCode,
    getItemCodeSuccess,
    getItemCodeFailure,

    AddworkOrder,
    AddworkOrderSuccess,
    AddworkOrderFailure,

    LoadPayorDetails,
    LoadPayorDetailsSuccess,
    LoadPayorDetailsFailure,

    getReferCode,
    getReferCodeSuccess,
    getReferCodeFailure,

    LoadBranchDropDown,
    LoadBranchDropDownSuccess,
    LoadBranchDropDownFailure,

    FilterBatchEligibilityRecords,

    GetBatchEligibility,
    GetBatchEligibilitySuccess,
    GetBatchEligibilityFailure,

    ProcessBatchEligibility,
    ProcessBatchEligibilitySuccess,
    ProcessBatchEligibilityFailure,

    Navigate,
    resetState,
};
