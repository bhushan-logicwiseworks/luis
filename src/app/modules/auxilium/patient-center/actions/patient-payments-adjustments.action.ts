import { createAction, props } from '@ngrx/store';
import { GetInsuranceRank2Response } from '../../../../shared/interfaces/auxilium/patient-center/patient-insurance-rank2.interface';
import { PatientPaymentsAdjustmentsById } from '../../../../shared/interfaces/auxilium/patient-center/patient-payments-adjustments-by-id.interface';
import { PatientPaymentsAdjustments } from '../../../../shared/interfaces/auxilium/patient-center/patient-payments-adjustments.interface';
import { DropdownDisplay } from '../../../../shared/interfaces/auxilium/patient-center/patient-status.interface';
import { GetToPatientDefaultResponse } from '../../../../shared/interfaces/auxilium/patient-center/patient-to-patient-default.interface';
import { Patient } from '../../../../shared/interfaces/auxilium/patient-center/patient.interface';

const LoadPaymentAdjustments = createAction(
    '[Patient PaymentAdjustments/API] Load PaymentAdjustments',
    props<{ patientId: Patient['id'] }>()
);
const LoadPaymentAdjustmentsSuccess = createAction(
    '[Patient PaymentAdjustments/API] Load PaymentAdjustments Success',
    props<{ data: PatientPaymentsAdjustments[] }>()
);
const LoadPaymentAdjustmentsFailure = createAction(
    '[Patient PaymentAdjustments/API] Load PaymentAdjustments Failure',
    props<{ error: Error }>()
);

const LoadPaymentAdjustmentsId = createAction(
    '[Patient PaymentAdjustments/API] Load LoadPaymentAdjustmentsId',
    props<{ PaymentAdjustmentId: number }>()
);
const LoadPaymentAdjustmentsIdSuccess = createAction(
    '[Patient PaymentAdjustments/API] Load LoadPaymentAdjustmentsId Success',
    props<{ PaymentAdjustmentdata: PatientPaymentsAdjustmentsById }>()
);
const LoadPaymentAdjustmentsIdFailure = createAction(
    '[Patient PaymentAdjustments/API] Load LoadPaymentAdjustmentsId Failure',
    props<{ error: Error }>()
);

const AddPaymentAdjustment = createAction(
    '[PaymentAdjustment Create/API] Add PaymentAdjustment',
    props<{ paymentAdjustment: PatientPaymentsAdjustmentsById }>()
);
const AddPaymentAdjustmentSuccess = createAction(
    '[PaymentAdjustment Create/API] Add PaymentAdjustment Success',
    props<{ paymentAdjustment: PatientPaymentsAdjustmentsById }>()
);
const AddPaymentAdjustmentFailure = createAction(
    '[PaymentAdjustment Create/API] Add PaymentAdjustment Failure',
    props<{ error: Error }>()
);

const PaymentTypeDropdown = createAction('[PaymentTypeDropdown Table/API] Load PaymentType DropDown');
const PaymentTypeDropdownSuccess = createAction(
    '[PaymentTypeDropdown Table/API] Load PaymentType DropDown Success',
    props<{ paymentType: DropdownDisplay[] }>()
);
const PaymentTypeDropdownFailure = createAction(
    '[PaymentTypeDropdown Table/API] Load PaymentType DropDown Failure',
    props<{ error: Error }>()
);

const Navigate = createAction('[Router] Navigate', props<{ commands: any[] }>());

const LoadToPatientDefault = createAction('[Patient Payments Adjustments/API] Load To Patient Default');

const LoadToPatientDefaultSuccess = createAction(
    '[Patient Payments Adjustments/API] Load To Patient Default Success',
    props<{ toPatientDefault: GetToPatientDefaultResponse }>()
);

const LoadToPatientDefaultFailure = createAction(
    '[Patient Payments Adjustments/API] Load To Patient Default Failure',
    props<{ error: Error }>()
);

const LoadInsuranceRank2 = createAction(
    '[Patient Payments Adjustments/API] Load Insurance Rank2',
    props<{ patientId: number }>()
);
const LoadInsuranceRank2Success = createAction(
    '[Patient Payments Adjustments/API] Load Insurance Rank2 Success',
    props<{ insuranceRank2: GetInsuranceRank2Response }>()
);
const LoadInsuranceRank2Failure = createAction(
    '[Patient Payments Adjustments/API] Load Insurance Rank2 Failure',
    props<{ error: Error }>()
);

export const PatientPaymentAdjustmentsActions = {
    LoadPaymentAdjustments,
    LoadPaymentAdjustmentsSuccess,
    LoadPaymentAdjustmentsFailure,
    LoadPaymentAdjustmentsId,
    LoadPaymentAdjustmentsIdSuccess,
    LoadPaymentAdjustmentsIdFailure,
    AddPaymentAdjustment,
    AddPaymentAdjustmentSuccess,
    AddPaymentAdjustmentFailure,
    PaymentTypeDropdown,
    PaymentTypeDropdownSuccess,
    PaymentTypeDropdownFailure,
    Navigate,
    LoadToPatientDefault,
    LoadToPatientDefaultSuccess,
    LoadToPatientDefaultFailure,
    LoadInsuranceRank2,
    LoadInsuranceRank2Success,
    LoadInsuranceRank2Failure,
};
