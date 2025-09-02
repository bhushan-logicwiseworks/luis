import { createAction, props } from '@ngrx/store';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import { PatientArHistory } from 'app/shared/interfaces/auxilium/patient-center/patient-ar-history.interface';
import {
    BillingEntity,
    DoctorInfo,
    DropdownDisplay,
    ICDCode,
} from 'app/shared/interfaces/auxilium/patient-center/patient-status.interface';
import { GetPatientResponse, Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { WorkOrderDisplay } from '../../../../shared/interfaces/auxilium/work-order-center/work-order-center.interface';

const LoadInquiryChanges = createAction(
    '[Patient LoadInquiryChanges/API] Load LoadInquiryChanges',
    props<{ patientId: Patient['id'] }>()
);
const LoadInquiryChangesSuccess = createAction(
    '[Patient LoadInquiryChanges/API] Load LoadInquiryChanges Success',
    props<{ data: PatientArHistory[] }>()
);
const LoadInquiryChangesFailure = createAction(
    '[Patient LoadInquiryChanges/API] Load LoadInquiryChanges Failure',
    props<{ error: Error }>()
);

const PrintStatusDropDown = createAction('[PrintStatusDropdown Table/API] Load PrintStatus DropDown');
const PrintStatusDropDownSuccess = createAction(
    '[PrintStatusDropdown Table/API] Load PrintStatus DropDown Success',
    props<{ printstatus: DropdownDisplay[] }>()
);
const PrintStatusDropDownFailure = createAction(
    '[PrintStatusDropdown Table/API] Load PrintStatus  DropDown Failure',
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

const TranTypeDropdown = createAction('[TranTypeDropdown Table/API] Load TranType DropDown');
const TranTypeDropdownSuccess = createAction(
    '[TranTypedropdown Table/API] Load TranType DropDown Success',
    props<{ tranType: DropdownDisplay[] }>()
);
const TranTypeDropdownFailure = createAction(
    '[TranTypedropdown Table/API] Load TranType DropDown Failure',
    props<{ error: Error }>()
);

const ClaimTypeDropdown = createAction('[ClaimTypeDropdown Table/API] Load ClaimType DropDown');
const ClaimTypeDropdownSuccess = createAction(
    '[ClaimTypeDropdown Table/API] Load ClaimType DropDown Success',
    props<{ claimType: DropdownDisplay[] }>()
);
const ClaimTypeDropdownFailure = createAction(
    '[ClaimTypeDropdown Table/API] Load ClaimType DropDown Failure',
    props<{ error: Error }>()
);

const PwkTypeDropdown = createAction('[PwkTypeDropdown Table/API] Load PwkType DropDown');
const PwkTypeDropdownSuccess = createAction(
    '[PwkTypeDropdown Table/API] Load PwkType DropDown Success',
    props<{ pwkType: DropdownDisplay[] }>()
);
const PwkTypeDropdownFailure = createAction(
    '[PwkTypeDropdown Table/API] Load PwkType DropDown Failure',
    props<{ error: Error }>()
);

const PwkMethodDropdown = createAction('[PwkMethodDropdown Table/API] Load PwkMethod DropDown');
const PwkMethodDropdownSuccess = createAction(
    '[PwkMethodDropdown Table/API] Load PwkMethod DropDown Success',
    props<{ pwkMethod: DropdownDisplay[] }>()
);
const PwkMethodDropdownFailure = createAction(
    '[PwkMethodDropdown Table/API] Load PwkMethod DropDown Failure',
    props<{ error: Error }>()
);

const BillTo = createAction('[Patient BillTo/API] Load BillTo', props<{ patientId: Patient['id'] }>());
const BillToSuccess = createAction('[Patient BillTo/API] Load BillTo Success', props<{ billTo: BillingEntity[] }>());
const BillToFailure = createAction('[Patient BillTo/API] Load BillTo Failure', props<{ error: Error }>());

const IcdCode = createAction('[Patient IcdCode/API] Load IcdCode', props<{ patientId: Patient['id'] }>());
const IcdCodeSuccess = createAction('[Patient IcdCode/API] Load IcdCode Success', props<{ icdCode: ICDCode[] }>());
const IcdCodeFailure = createAction('[Patient IcdCode/API] Load IcdCode Failure', props<{ error: Error }>());

const Physician = createAction('[Patient Physician/API] Load Physician', props<{ patientId: Patient['id'] }>());
const PhysicianSuccess = createAction(
    '[Patient Physician/API] Load Physician Success',
    props<{ physician: DoctorInfo[] }>()
);
const PhysicianFailure = createAction('[Patient Physician/API] Load Physician Failure', props<{ error: Error }>());

const LoadInquiryChangesId = createAction(
    '[Patient Physician/API] Load LoadInquiryChangesId',
    props<{ arHistoryId: number }>()
);
const LoadInquiryChangesIdSuccess = createAction(
    '[Patient Physician/API] Load LoadInquiryChangesId Success',
    props<{ historyData: PatientArHistory }>()
);
const LoadInquiryChangesIdFailure = createAction(
    '[Patient Physician/API] Load LoadInquiryChangesId Failure',
    props<{ error: Error }>()
);

const LoadPatientSalesRep = createAction('[Patient InquiryChanges/API] Load Payor SalesReps');
const LoadPatientSalesRepSuccess = createAction(
    '[Patient InquiryChanges/API] Load Payor SalesReps Success',
    props<{ salesrep: GetPatientResponse }>()
);
const LoadPatientSalesRepFailure = createAction(
    '[Patient InquiryChanges/API] Load Payor SalesReps Failure',
    props<{ error: Error }>()
);

const LoadBranchDropDown = createAction('[LicenseCenter InquiryChanges/API] Load Branch DropDown');
const LoadBranchDropDownSuccess = createAction(
    '[LicenseCenter InquiryChanges/API] Load Branch DropDown Success',
    props<{ branch: GetBranchListResponse }>()
);
const LoadBranchDropDownFailure = createAction(
    '[LicenseCenter InquiryChanges/API] Load Branch DropDown Failure',
    props<{ error: Error }>()
);

const AddinquiryChanges = createAction(
    '[inquiryChanges Create/API] Add inquiryChanges',
    props<{ inquirychanges: WorkOrderDisplay }>()
);
const AddinquiryChangesSuccess = createAction(
    '[inquiryChanges Create/API] Add inquiryChanges Success',
    props<{ inquirychanges: WorkOrderDisplay }>()
);
const AddinquiryChangesFailure = createAction(
    '[inquiryChanges Create/API] Add inquiryChanges Failure',
    props<{ error: Error }>()
);

const EditGroupInquiryChanges = createAction(
    '[Patient EditGroupInquiryChanges/API] Edit GroupInquiryChanges',
    props<{ patientData: any }>()
);
const EditGroupInquiryChangesSuccess = createAction(
    '[Patient EditGroupInquiryChanges/API] Edit GroupInquiryChanges Success'
);
const EditGroupInquiryChangesFailure = createAction(
    '[Patient EditGroupInquiryChanges/API] Edit GroupInquiryChanges Failure',
    props<{ error: Error }>()
);

const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());

const Refresh = createAction('[PatientInquiryChanges Table/API] Refresh');

export const PatientInquiryChangesActions = {
    LoadInquiryChanges,
    LoadInquiryChangesSuccess,
    LoadInquiryChangesFailure,
    LoadInquiryChangesId,
    LoadInquiryChangesIdSuccess,
    LoadInquiryChangesIdFailure,
    LoadPatientSalesRep,
    LoadPatientSalesRepSuccess,
    LoadPatientSalesRepFailure,
    PrintStatusDropDown,
    PrintStatusDropDownSuccess,
    PrintStatusDropDownFailure,
    BillTypeDropdown,
    BillTypeDropdownSuccess,
    BillTypeDropdownFailure,
    TranTypeDropdown,
    TranTypeDropdownSuccess,
    TranTypeDropdownFailure,
    ClaimTypeDropdown,
    ClaimTypeDropdownSuccess,
    ClaimTypeDropdownFailure,
    PwkTypeDropdown,
    PwkTypeDropdownSuccess,
    PwkTypeDropdownFailure,
    PwkMethodDropdown,
    PwkMethodDropdownSuccess,
    PwkMethodDropdownFailure,
    BillTo,
    BillToSuccess,
    BillToFailure,
    IcdCode,
    IcdCodeSuccess,
    IcdCodeFailure,
    Physician,
    PhysicianSuccess,
    PhysicianFailure,
    LoadBranchDropDown,
    LoadBranchDropDownSuccess,
    LoadBranchDropDownFailure,
    AddinquiryChanges,
    AddinquiryChangesSuccess,
    AddinquiryChangesFailure,
    EditGroupInquiryChanges,
    EditGroupInquiryChangesSuccess,
    EditGroupInquiryChangesFailure,
    Navigate,
    Refresh,
};
