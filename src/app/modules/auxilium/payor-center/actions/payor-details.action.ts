import { createAction, props } from '@ngrx/store';
import { GetCommonDropDownResponse } from 'app/shared/interfaces/auxilium/inventory-center/common-product-dropdown.interface';
import { GetPatientResponse } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';

const ResetState = createAction('[PayorCenter Details/API] Reset Patient Details State');

const LoadPriceCodeDropDown = createAction('[PayorCenter Table/API] Load Price Code DropDown');
const LoadPriceCodeDropDownSuccess = createAction(
    '[PayorCenter Table/API] Load Price Code DropDown Success',
    props<{ priceCode: GetCommonDropDownResponse }>()
);
const LoadPriceCodeDropDownFailure = createAction(
    '[PayorCenter Table/API] Load Price Code DropDown Failure',
    props<{ error: Error }>()
);

const LoadPrimaryBillFormDropDown = createAction('[PayorCenter Detail/API] Load Primary Bill Form DropDown');
const LoadPrimaryBillFormDropDownSuccess = createAction(
    '[PayorCenter Detail/API] Load Primary Bill Form DropDown Success',
    props<{ primaryBillForm: GetCommonDropDownResponse }>()
);
const LoadPrimaryBillFormDropDownFailure = createAction(
    '[PayorCenter Detail/API] Load Primary Bill Form DropDown Failure',
    props<{ error: Error }>()
);

const LoadPayorTypeDropDown = createAction('[PayorCenter Detail/API] Load Payor Type DropDown');
const LoadPayorTypeDropDownSuccess = createAction(
    '[PayorCenter Detail/API] Load Payor Type DropDown Success',
    props<{ payorType: GetCommonDropDownResponse }>()
);
const LoadPayorTypeDropDownFailure = createAction(
    '[PayorCenter Detail/API] Load Payor Type DropDown Failure',
    props<{ error: Error }>()
);

const LoadBoxOneDropDown = createAction('[PayorCenter Detail/API] Load Box1 DropDown');
const LoadBoxOneDropDownSuccess = createAction(
    '[PayorCenter Detail/API] Load Box1 DropDown Success',
    props<{ boxOne: GetCommonDropDownResponse }>()
);
const LoadBoxOneDropDownFailure = createAction(
    '[PayorCenter Detail/API] Load Box1 DropDown Failure',
    props<{ error: Error }>()
);

const LoadFinancialClassDown = createAction('[PayorCenter Detail/API] Financial Class DropDown');
const LoadFinancialClassDownSuccess = createAction(
    '[PayorCenter Detail/API] Financial Class DropDown Success',
    props<{ financialclass: GetCommonDropDownResponse }>()
);
const LoadFinancialClassDownFailure = createAction(
    '[PayorCenter Detail/API] Financial Class DropDown Failure',
    props<{ error: Error }>()
);

const LoadClaimIndicatorDropDown = createAction('[PayorCenter Detail/API] Claim Indicator DropDown');
const LoadClaimIndicatorDropDownSuccess = createAction(
    '[PayorCenter Detail/API] Claim Indicator DropDown Success',
    props<{ claimindicator: GetCommonDropDownResponse }>()
);
const LoadClaimIndicatorDropDownFailure = createAction(
    '[PayorCenter Detail/API] Claim Indicator DropDown Failure',
    props<{ error: Error }>()
);

const LoadClearinghouseDropDown = createAction('[PayorCenter Detail/API] Load Clearinghouse DropDown');
const LoadClearinghouseDropDownSuccess = createAction(
    '[PayorCenter Detail/API] Load Clearinghouse DropDown Success',
    props<{ clearinghouse: GetCommonDropDownResponse }>()
);
const LoadClearinghouseDropDownFailure = createAction(
    '[PayorCenter Detail/API] Load Clearinghouse DropDown Failure',
    props<{ error: Error }>()
);

const LoadPatientSalesRep = createAction('[PayorCenter Detail/API] Load Payor SalesReps');
const LoadPatientSalesRepSuccess = createAction(
    '[PayorCenter Detail/API] Load Payor SalesReps Success',
    props<{ salesrep: GetPatientResponse }>()
);
const LoadPatientSalesRepFailure = createAction(
    '[PayorCenter Detail/API] Load Payor SalesReps Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[PayorCenter Deatils/API] Refresh');

export const PayorCenterDeatilsActions = {
    LoadPriceCodeDropDown,
    LoadPriceCodeDropDownSuccess,
    LoadPriceCodeDropDownFailure,

    LoadPatientSalesRep,
    LoadPatientSalesRepSuccess,
    LoadPatientSalesRepFailure,

    LoadPrimaryBillFormDropDown,
    LoadPrimaryBillFormDropDownSuccess,
    LoadPrimaryBillFormDropDownFailure,

    LoadPayorTypeDropDown,
    LoadPayorTypeDropDownSuccess,
    LoadPayorTypeDropDownFailure,

    LoadBoxOneDropDown,
    LoadBoxOneDropDownSuccess,
    LoadBoxOneDropDownFailure,

    LoadFinancialClassDown,
    LoadFinancialClassDownSuccess,
    LoadFinancialClassDownFailure,

    LoadClaimIndicatorDropDown,
    LoadClaimIndicatorDropDownSuccess,
    LoadClaimIndicatorDropDownFailure,

    LoadClearinghouseDropDown,
    LoadClearinghouseDropDownSuccess,
    LoadClearinghouseDropDownFailure,

    Refresh,
    ResetState,
};
