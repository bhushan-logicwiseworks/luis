import { createAction, props } from '@ngrx/store';
import { GetAgingReportResponse } from 'app/shared/interfaces/auxilium/bill-center/aging-report.interface';
import { Counter } from 'app/shared/interfaces/auxilium/bill-center/bill-dashboard.interface';
import { BillCenterWorkOrderDisplay } from 'app/shared/interfaces/auxilium/bill-center/work-order.interface';
import { GetClaimsFor837Response } from 'app/shared/interfaces/auxilium/billType-center/claims-for-837.interface';
import { GetHeldItemsReportResponse } from 'app/shared/interfaces/auxilium/billType-center/held-items-report.interface';
import { GetValidationsInformationResponse } from 'app/shared/interfaces/auxilium/billType-center/validations-information.interface';
import { GetChargeResponse } from 'app/shared/interfaces/auxilium/charge-center/charge.interface';

const ResetState = createAction('[BillCenter Table/API] Reset Charge State');

const LoadChargesReadyForClaims = createAction('[BillCenter Table/API] Load Charge');
const LoadChargesReadyForClaimsSuccess = createAction(
    '[BillCenter Table/API] Load Charge Success',
    props<{ charges: GetChargeResponse }>()
);
const LoadChargesReadyForClaimsFailure = createAction(
    '[BillCenter Table/API] Load Charge Failure',
    props<{ error: Error }>()
);

const LoadClaimsReadyForValidation = createAction('[BillCenter Table/API] Load Claims Ready for Validation');
const LoadClaimsReadyForValidationSuccess = createAction(
    '[BillCenter Table/API] Load Claims Ready for Validation Success',
    props<{ validation: GetValidationsInformationResponse }>()
);
const LoadClaimsReadyForValidationFailure = createAction(
    '[BillCenter Table/API] Load Claims Ready for Validation Failure',
    props<{ error: Error }>()
);

const PrepareClaimsForValidation = createAction('[BillCenter Table/API] Prepare Claims for Validation');
const PrepareClaimsForValidationSuccess = createAction(
    '[BillCenter Table/API] Prepare Claims for Validation Success',
    props<{ validation: GetValidationsInformationResponse }>()
);
const PrepareClaimsForValidationFailure = createAction(
    '[BillCenter Table/API] Prepare Claims for Validation Failure',
    props<{ error: Error }>()
);

const LoadHeldItemsReport = createAction('[BillCenter Table/API] Load Held Items Report');
const LoadHeldItemsReportSuccess = createAction(
    '[BillCenter Table/API] Load Held Items Report Success',
    props<{ heldItemsReport: GetHeldItemsReportResponse }>()
);
const LoadHeldItemsReportFailure = createAction(
    '[BillCenter Table/API] Load Held Items Report Failure',
    props<{ error: Error }>()
);

const LoadHeldItemDetails = createAction(
    '[BillCenter Table/API] Load Held Items Report Details',
    props<{ claimId: number }>()
);
const LoadHeldItemDetailsSuccess = createAction(
    '[BillCenter Table/API] Load Held Items Report Details Success',
    props<{ heldItemDetails: GetHeldItemsReportResponse }>()
);
const LoadHeldItemDetailsFailure = createAction(
    '[BillCenter Table/API] Load Held Items Report Details Failure',
    props<{ error: Error }>()
);

const PostConfirmedWorkOrder = createAction(
    '[BillCenter Table/API] Post ConfirmedWorkOrder',
    props<{ patientData: any }>()
);
const PostConfirmedWorkOrderSuccess = createAction('[BillCenter Table/API] Post ConfirmedWorkOrder Success');
const PostConfirmedWorkOrderFailure = createAction(
    '[BillCenter Table/API] Post ConfirmedWorkOrder Failure',
    props<{ error: Error }>()
);

const Createclaimsfromcharges = createAction(
    '[BillCenter Table/API] Createclaimsfromcharges',
    props<{ patientData: any }>()
);
const CreateclaimsfromchargesSuccess = createAction('[BillCenter Table/API] Createclaimsfromcharges Success');
const CreateclaimsfromchargesFailure = createAction(
    '[BillCenter Table/API] Createclaimsfromcharges Failure',
    props<{ error: Error }>()
);

const CreateClaimsFromValidations = createAction(
    '[BillCenter Table/API] CreateClaimsFromValidations',
    props<{ patientData: any }>()
);
const CreateClaimsFromValidationsSuccess = createAction('[BillCenter Table/API] CreateClaimsFromValidations Success');
const CreateClaimsFromValidationsFailure = createAction(
    '[BillCenter Table/API] CreateClaimsFromValidations Failure',
    props<{ error: Error }>()
);

const LoadClaimFor837 = createAction('[BillCenter Table/API] Load Claim For 837');
const LoadClaimFor837Success = createAction(
    '[BillCenter Table/API] Load Claim For 837 Success',
    props<{ claimsFor837: GetClaimsFor837Response }>()
);
const LoadClaimFor837Failure = createAction(
    '[BillCenter Table/API] Load Claim For 837 Failure',
    props<{ error: Error }>()
);

const CreateClaimsFileFor837 = createAction('[BillCenter Table/API] Create ClaimsFiles For 837');
const CreateClaimsFileFor837Success = createAction('[BillCenter Table/API] ClaimsFiles For 837 Success');
const CreateClaimsFileFor837Failure = createAction(
    '[BillCenter Table/API] ClaimsFiles For 837 Failure',
    props<{ error: Error }>()
);

const LoadBillDashBoard = createAction('[BillCenter Table/API] Load Bill Dashboard');
const LoadBillDashBoardSuccess = createAction(
    '[BillCenter Table/API] Load Bill Dashboard Success',
    props<{ dashboard: any }>()
);
const LoadBillDashBoardFailure = createAction(
    '[BillCenter Table/API] Load Bill Dashboard Failure',
    props<{ error: Error }>()
);

const loadDashBoardWorkOrdersAll = createAction('[BillCenter Table/API] Load Dashboard Work Orders All');
const loadDashBoardWorkOrdersAllSuccess = createAction(
    '[BillCenter Table/API] Load Dashboard Work Orders All Success',
    props<{ dashboardWorkOrdersAll: Counter[] }>()
);
const loadDashBoardWorkOrdersAllFailure = createAction(
    '[BillCenter Table/API] Load Work Orders All Failure',
    props<{ error: Error }>()
);

const loadDashBoardWorkOrdersWithPOD = createAction('[BillCenter Table/API] Load Dashboard Work Orders With POD');
const loadDashBoardWorkOrdersWithPODSuccess = createAction(
    '[BillCenter Table/API] Load Dashboard Work Orders With POD Success',
    props<{ dashboardWorkOrdersWithPOD: Counter[] }>()
);
const loadDashBoardWorkOrdersWithPODFailure = createAction(
    '[BillCenter Table/API] Load Work Orders With POD Failure',
    props<{ error: Error }>()
);

const loadDashBoardWorkOrdersWithoutPOD = createAction('[BillCenter Table/API] Load Dashboard Work Orders Without POD');
const loadDashBoardWorkOrdersWithoutPODSuccess = createAction(
    '[BillCenter Table/API] Load Dashboard Work Orders Without POD Success',
    props<{ dashboardWorkOrdersWithoutPOD: Counter[] }>()
);
const loadDashBoardWorkOrdersWithoutPODFailure = createAction(
    '[BillCenter Table/API] Load Dashboard Work Orders Without POD Failure',
    props<{ error: Error }>()
);

const LoadWorkOrdersAll = createAction('[BillCenter Table/API] Load Work Orders All');
const LoadWorkOrdersAllSuccess = createAction(
    '[BillCenter Table/API] Load Work Orders All Success',
    props<{ workOrders: BillCenterWorkOrderDisplay[] }>()
);
const LoadWorkOrdersAllFailure = createAction(
    '[BillCenter Table/API] Load Work Orders All Failure',
    props<{ error: Error }>()
);

const LoadWorkOrdersWithPOD = createAction('[BillCenter Table/API] Load Work Orders With POD');
const LoadWorkOrdersWithPODSuccess = createAction(
    '[BillCenter Table/API] Load Work Orders With POD Success',
    props<{ workOrders: BillCenterWorkOrderDisplay[] }>()
);
const LoadWorkOrdersWithPODFailure = createAction(
    '[BillCenter Table/API] Load Work Orders With POD Failure',
    props<{ error: Error }>()
);

const LoadWorkOrdersWithoutPOD = createAction('[BillCenter Table/API] Load Work Orders Without POD');
const LoadWorkOrdersWithoutPODSuccess = createAction(
    '[BillCenter Table/API] Load Work Orders Without POD Success',
    props<{ workOrders: BillCenterWorkOrderDisplay[] }>()
);
const LoadWorkOrdersWithoutPODFailure = createAction(
    '[BillCenter Table/API] Load Work Orders Without POD Failure',
    props<{ error: Error }>()
);

const LoadAgingReport = createAction('[BillCenter Table/API] Load Aging Report');
const LoadAgingReportSuccess = createAction(
    '[BillCenter Table/API] Load Aging Report Success',
    props<{ aginReports: GetAgingReportResponse }>()
);
const LoadAgingReportFailure = createAction(
    '[BillCenter Table/API] Load Aging Report Failure',
    props<{ error: Error }>()
);

const Refresh = createAction('[BillCenter Table/API] Refresh');

export const BillCenterTableActions = {
    LoadChargesReadyForClaims,
    LoadChargesReadyForClaimsSuccess,
    LoadChargesReadyForClaimsFailure,
    LoadHeldItemsReport,
    LoadHeldItemsReportSuccess,
    LoadHeldItemsReportFailure,
    LoadHeldItemDetails,
    LoadHeldItemDetailsSuccess,
    LoadHeldItemDetailsFailure,
    PostConfirmedWorkOrder,
    PostConfirmedWorkOrderSuccess,
    PostConfirmedWorkOrderFailure,
    Createclaimsfromcharges,
    CreateclaimsfromchargesSuccess,
    CreateclaimsfromchargesFailure,
    LoadClaimsReadyForValidation,
    LoadClaimsReadyForValidationSuccess,
    LoadClaimsReadyForValidationFailure,
    PrepareClaimsForValidation,
    PrepareClaimsForValidationSuccess,
    PrepareClaimsForValidationFailure,
    CreateClaimsFromValidations,
    CreateClaimsFromValidationsSuccess,
    CreateClaimsFromValidationsFailure,
    LoadClaimFor837,
    LoadClaimFor837Success,
    LoadClaimFor837Failure,
    CreateClaimsFileFor837,
    CreateClaimsFileFor837Success,
    CreateClaimsFileFor837Failure,
    LoadBillDashBoard,
    LoadBillDashBoardSuccess,
    LoadBillDashBoardFailure,
    LoadWorkOrdersAll,
    LoadWorkOrdersAllSuccess,
    LoadWorkOrdersAllFailure,
    LoadWorkOrdersWithPOD,
    LoadWorkOrdersWithPODSuccess,
    LoadWorkOrdersWithPODFailure,
    LoadWorkOrdersWithoutPOD,
    LoadWorkOrdersWithoutPODSuccess,
    LoadWorkOrdersWithoutPODFailure,
    loadDashBoardWorkOrdersAll,
    loadDashBoardWorkOrdersAllSuccess,
    loadDashBoardWorkOrdersAllFailure,
    loadDashBoardWorkOrdersWithPOD,
    loadDashBoardWorkOrdersWithPODSuccess,
    loadDashBoardWorkOrdersWithPODFailure,
    loadDashBoardWorkOrdersWithoutPOD,
    loadDashBoardWorkOrdersWithoutPODSuccess,
    loadDashBoardWorkOrdersWithoutPODFailure,
    LoadAgingReport,
    LoadAgingReportSuccess,
    LoadAgingReportFailure,
    Refresh,
    ResetState,
};
