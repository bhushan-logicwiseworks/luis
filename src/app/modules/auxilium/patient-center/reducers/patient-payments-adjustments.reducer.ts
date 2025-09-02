import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientPaymentsAdjustments } from 'app/shared/interfaces/auxilium/patient-center/patient-payments-adjustments.interface';
import { PatientPaymentsAdjustmentsById } from '../../../../shared/interfaces/auxilium/patient-center/patient-payments-adjustments-by-id.interface';
import { DropdownDisplay } from '../../../../shared/interfaces/auxilium/patient-center/patient-status.interface';
import { GetToPatientDefaultResponse } from '../../../../shared/interfaces/auxilium/patient-center/patient-to-patient-default.interface';
import { PatientPaymentAdjustmentsActions } from '../actions/patient-payments-adjustments.action';

export const patientsFeatureKey = 'patient-payments-adjustments';

export interface State extends LoadingState {
    data: PatientPaymentsAdjustments[];
    PaymentAdjustmentdata: PatientPaymentsAdjustmentsById;
    paymentType: DropdownDisplay[];
    toPatientDefault: GetToPatientDefaultResponse;
    insuranceRank2: string | null; // Changed from GetInsuranceRank2Response to string | null
}

const initialState: State = {
    loading: false,
    error: null,
    data: [],
    paymentType: [],
    PaymentAdjustmentdata: null,
    toPatientDefault: [],
    insuranceRank2: null, // Changed from [] to null
};

export const reducer = createReducer(
    initialState,
    on(PatientPaymentAdjustmentsActions.LoadPaymentAdjustments, state => ({
        ...state,
        loading: true,
        error: null,
        data: [],
    })),
    on(PatientPaymentAdjustmentsActions.LoadPaymentAdjustmentsSuccess, (state, { data }) => ({
        ...state,
        loading: false,
        data,
    })),
    on(PatientPaymentAdjustmentsActions.LoadPaymentAdjustmentsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    // Load Payment Adjustments by ID
    on(PatientPaymentAdjustmentsActions.LoadPaymentAdjustmentsId, state => ({
        ...state,
        loading: true,
        error: null,
        PaymentAdjustmentdata: null,
    })),
    on(PatientPaymentAdjustmentsActions.LoadPaymentAdjustmentsIdSuccess, (state, { PaymentAdjustmentdata }) => ({
        ...state,
        loading: false,
        PaymentAdjustmentdata,
    })),
    on(PatientPaymentAdjustmentsActions.LoadPaymentAdjustmentsIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientPaymentAdjustmentsActions.PaymentTypeDropdown, state => ({ ...state, loading: true })),
    on(PatientPaymentAdjustmentsActions.PaymentTypeDropdownSuccess, (state, { paymentType }) => ({
        ...state,
        loading: false,
        paymentType,
    })),
    on(PatientPaymentAdjustmentsActions.PaymentTypeDropdownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // Load To Patient Default
    on(PatientPaymentAdjustmentsActions.LoadToPatientDefault, state => ({
        ...state,
        loading: true,
        error: null,
        toPatientDefault: null,
    })),
    on(PatientPaymentAdjustmentsActions.LoadToPatientDefaultSuccess, (state, { toPatientDefault }) => ({
        ...state,
        loading: false,
        toPatientDefault,
    })),
    on(PatientPaymentAdjustmentsActions.LoadToPatientDefaultFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    // Load Insurance Rank 2
    on(PatientPaymentAdjustmentsActions.LoadInsuranceRank2, state => ({
        ...state,
        loading: true,
        error: null,
        insuranceRank2: null,
    })),
    on(PatientPaymentAdjustmentsActions.LoadInsuranceRank2Success, (state, { insuranceRank2 }) => {
        console.log('Reducer received:', insuranceRank2); // Debug log
        return {
            ...state,
            loading: false,
            insuranceRank2,
        };
    }),
    on(PatientPaymentAdjustmentsActions.LoadInsuranceRank2Failure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPaymentAdjustments = (state: State) => state.data;
export const selectPaymentAdjustmentsById = (state: State) => state.PaymentAdjustmentdata;
export const selectPaymentTypeDropdown = (state: State) => state.paymentType;
export const selectToPatientDefault = (state: State) => state.toPatientDefault;
export const selectInsuranceRank2 = (state: State) => state.insuranceRank2;
