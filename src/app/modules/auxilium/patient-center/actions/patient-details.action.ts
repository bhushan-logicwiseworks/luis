import { createAction, props } from '@ngrx/store';
import { GetPatientCategoryResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-category.interface';
import { GetPatientPlaceOfServiceResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-place-service.interface';
import { GetPatientReferralResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-referral.interface';
import { GetDropdownDisplay } from 'app/shared/interfaces/auxilium/patient-center/patient-status.interface';
import { PatientValidation } from 'app/shared/interfaces/auxilium/patient-center/patient-validation.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { GetPatientResponse } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';
import { GetReferralResponse } from 'app/shared/interfaces/auxilium/referral-center/referral.interface';

const ResetState = createAction('[PatientCenter Details/API] Reset Patient Details State');

const LoadPatientDetails = createAction('[PatientCenter Details/API] Load Patient Details ', props<{ id: number }>());
const LoadPatientDetailsSuccess = createAction(
    '[PatientCenter Details/API] Load Patient Details Success',
    props<{ patient: PatientEntity[] }>()
);
const LoadPatientDetailsFailure = createAction(
    '[PatientCenter Details/API] Load Patient Details Failure',
    props<{ error: Error }>()
);

const LoadPatientSalesRep = createAction('[PatientCenter /API] Load Patient SalesReps');
const LoadPatientSalesRepSuccess = createAction(
    '[PatientCenter /API] Load Patient SalesReps Success',
    props<{ salesrep: GetPatientResponse }>()
);
const LoadPatientSalesRepFailure = createAction(
    '[PatientCenter /API] Load Patient SalesReps Failure',
    props<{ error: Error }>()
);

const LoadIntakeDropDown = createAction('[SalesCenter Table/API] Load Intake DropDown');
const LoadIntakeDropDownSuccess = createAction(
    '[SalesCenter Table/API] Load Intake DropDown Success',
    props<{ intake: GetPatientResponse }>()
);
const LoadIntakeDropDownFailure = createAction(
    '[SalesCenter Table/API] Load Intake DropDown Failure',
    props<{ error: Error }>()
);

const LoadPatientCategoryDropDown = createAction('[PatientCenter Detail/API] Load Patientcategory DropDown');
const LoadPatientCategoryDropDownSuccess = createAction(
    '[PatientCenter Detail/API] Load Patientcategory DropDown Success',
    props<{ patientCategory: GetPatientCategoryResponse }>()
);
const LoadPatientCategoryDropDownFailure = createAction(
    '[PatientCenter Detail/API] Load Patientcategory DropDown Failure',
    props<{ error: Error }>()
);

const LoadPatientContactMethodDropDown = createAction(
    '[PatientCenter Detail/API] Load Patientcategory Contact Method DropDown'
);
const LoadPatientContactMethodDropDownSuccess = createAction(
    '[PatientCenter Detail/API] Load Patientcategory Contact Method DropDown Success',
    props<{ contactMethod: GetPatientCategoryResponse }>()
);
const LoadPatientContactMethodDropDownFailure = createAction(
    '[PatientCenter Detail/API] Load Patientcategory Contact Method DropDown Failure',
    props<{ error: Error }>()
);

const LoadPatientStatusDropDown = createAction('[PatientCenter Detail/API] Load Patientstatus DropDown');
const LoadPatientStatusDropDownSuccess = createAction(
    '[PatientCenter Detail/API] Load Patientstatus DropDown Success',
    props<{ patientStatus: GetDropdownDisplay }>()
);
const LoadPatientStatusDropDownFailure = createAction(
    '[PatientCenter Detail/API] Load Patientstatus DropDown Failure',
    props<{ error: Error }>()
);

const LoadInactiveReasonDropDown = createAction('[PatientCenter Detail/API] Load Patient Inactive Reason DropDown');
const LoadInactiveReasonDropDownSuccess = createAction(
    '[PatientCenter Detail/API] Load Patient Inactive Reason DropDown Success',
    props<{ inactiveReason: GetDropdownDisplay }>()
);
const LoadInactiveReasonDropDownFailure = createAction(
    '[PatientCenter Detail/API] Load Patient Inactive Reason DropDown Failure',
    props<{ error: Error }>()
);

const LoadPatientReferralDropDown = createAction('[PatientCenter Detail/API] Load PatientReferral DropDown');
const LoadPatientReferralDropDownSuccess = createAction(
    '[PatientCenter Detail/API] Load PatientReferral DropDown Success',
    props<{ patientReferral: GetPatientReferralResponse }>()
);
const LoadPatientReferralDropDownFailure = createAction(
    '[PatientCenter Detail/API] Load PatientReferral DropDown Failure',
    props<{ error: Error }>()
);

const LoadCityAndStateDropDown = createAction(
    '[PatientCenter Detail/API] Load City and Sate DropDown',
    props<{ zipCode: number }>()
);
const LoadCityAndStateDropDownSuccess = createAction(
    '[PatientCenter Detail/API] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[PatientCenter Detail/API] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

const LoadPatientReferrals = createAction('[[PatientCenter Table/API] Load Referrals');
const LoadPatientReferralsSuccess = createAction(
    '[[PatientCenter Table/API] Load Referrals Success',
    props<{ referrals: GetReferralResponse }>()
);
const LoadPatientReferralsFailure = createAction(
    '[[PatientCenter Table/API] Load Referrals Failure',
    props<{ error: Error }>()
);

const LoadPlaceOfServiceDropDown = createAction('[PatientCenter Detail/API] Load Place Of Service DropDown');
const LoadPlaceOfServiceDropDownSuccess = createAction(
    '[PatientCenter Detail/API] Load Place Of Service DropDown Success',
    props<{ placeOfService: GetPatientPlaceOfServiceResponse }>()
);
const LoadPlaceOfServiceDropDownFailure = createAction(
    '[PatientCenter Detail/API] Load Place Of Service DropDown Failure',
    props<{ error: Error }>()
);

const LoadPatientValidation = createAction(
    '[PatientCenter Details/API] Load Patient Validation',
    props<{ id: number }>()
);
const LoadPatientValidationSuccess = createAction(
    '[PatientCenter Details/API] Load Patient Validation Success',
    props<{ patientValidation: PatientValidation }>()
);
const LoadPatientValidationFailure = createAction(
    '[PatientCenter Details/API] Load Patient Validation Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[PatientCenter Deatils/API] Refresh');

export const PatientCenterDeatilsActions = {
    LoadPatientDetails,
    LoadPatientDetailsSuccess,
    LoadPatientDetailsFailure,
    LoadPatientSalesRep,
    LoadPatientSalesRepSuccess,
    LoadPatientSalesRepFailure,
    LoadIntakeDropDown,
    LoadIntakeDropDownSuccess,
    LoadIntakeDropDownFailure,

    LoadPatientCategoryDropDown,
    LoadPatientCategoryDropDownSuccess,
    LoadPatientCategoryDropDownFailure,

    LoadPatientContactMethodDropDown,
    LoadPatientContactMethodDropDownSuccess,
    LoadPatientContactMethodDropDownFailure,

    LoadPatientStatusDropDown,
    LoadPatientStatusDropDownSuccess,
    LoadPatientStatusDropDownFailure,

    LoadPatientReferralDropDown,
    LoadPatientReferralDropDownSuccess,
    LoadPatientReferralDropDownFailure,

    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,

    LoadInactiveReasonDropDown,
    LoadInactiveReasonDropDownSuccess,
    LoadInactiveReasonDropDownFailure,

    LoadPatientReferrals,
    LoadPatientReferralsSuccess,
    LoadPatientReferralsFailure,

    LoadPlaceOfServiceDropDown,
    LoadPlaceOfServiceDropDownSuccess,
    LoadPlaceOfServiceDropDownFailure,

    LoadPatientValidation,
    LoadPatientValidationSuccess,
    LoadPatientValidationFailure,

    Refresh,
    ResetState,
};
