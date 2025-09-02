import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { GetPatientCategoryResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-category.interface';
import { GetPatientPlaceOfServiceResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-place-service.interface';
import { GetPatientReferralResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-referral.interface';
import { GetDropdownDisplay } from 'app/shared/interfaces/auxilium/patient-center/patient-status.interface';
import { PatientValidation } from 'app/shared/interfaces/auxilium/patient-center/patient-validation.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { GetPatientResponse } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';
import { GetReferralResponse } from 'app/shared/interfaces/auxilium/referral-center/referral.interface';
import { PatientCenterDeatilsActions } from '../actions/patient-details.action';

export const featureKey = 'patient-center';

export interface State extends EntityState<PatientEntity> {
    // additional entities state properties
    loading: boolean;
    error: Error;
    loaded: boolean;
    patient: any;
    salesrep: GetPatientResponse;
    intake: GetPatientResponse;
    patientCategory: GetPatientCategoryResponse;
    patientStatus: GetDropdownDisplay;
    inactiveReason: GetDropdownDisplay;
    patientReferral: GetPatientReferralResponse;
    zipCodeLookup: GetPatientZipCodeLookUp;
    referrals: GetReferralResponse;
    contactMethod: GetPatientCategoryResponse;
    placeOfService: GetPatientPlaceOfServiceResponse;
    patientValidation: PatientValidation;
}
export const adapter: EntityAdapter<PatientEntity> = createEntityAdapter<PatientEntity>({
    selectId: model => model.Id,
});

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    loading: false,
    error: null,
    loaded: false,
    patient: [],
    salesrep: [],
    intake: [],
    patientCategory: [],
    patientStatus: [],
    inactiveReason: [],
    patientReferral: [],
    zipCodeLookup: undefined,
    referrals: [],
    contactMethod: [],
    placeOfService: [],
    patientValidation: null,
});

export const reducer = createReducer(
    initialState,

    on(PatientCenterDeatilsActions.ResetState, () => {
        return initialState;
    }),

    on(PatientCenterDeatilsActions.LoadPatientDetails, state => ({ ...state, loading: true, patient: null })),
    on(PatientCenterDeatilsActions.LoadPatientDetailsSuccess, (state, { patient }) => ({
        ...state,
        loading: false,
        patient,
    })),
    on(PatientCenterDeatilsActions.LoadPatientDetailsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDeatilsActions.LoadPatientSalesRep, state => ({ ...state, loading: true })),
    on(PatientCenterDeatilsActions.LoadPatientSalesRepSuccess, (state, { salesrep }) => ({
        ...state,
        loading: false,
        salesrep,
    })),
    on(PatientCenterDeatilsActions.LoadPatientSalesRepFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDeatilsActions.LoadIntakeDropDown, state => ({ ...state, loading: true })),
    on(PatientCenterDeatilsActions.LoadIntakeDropDownSuccess, (state, { intake }) => ({
        ...state,
        loading: false,
        intake,
    })),
    on(PatientCenterDeatilsActions.LoadIntakeDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDeatilsActions.LoadPatientCategoryDropDown, state => ({ ...state, loading: true })),
    on(PatientCenterDeatilsActions.LoadPatientCategoryDropDownSuccess, (state, { patientCategory }) => ({
        ...state,
        loading: false,
        patientCategory,
    })),
    on(PatientCenterDeatilsActions.LoadPatientCategoryDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDeatilsActions.LoadPatientStatusDropDown, state => ({ ...state, loading: true })),
    on(PatientCenterDeatilsActions.LoadPatientStatusDropDownSuccess, (state, { patientStatus }) => ({
        ...state,
        loading: false,
        patientStatus,
    })),
    on(PatientCenterDeatilsActions.LoadPatientStatusDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDeatilsActions.LoadInactiveReasonDropDown, state => ({ ...state, loading: true })),
    on(PatientCenterDeatilsActions.LoadInactiveReasonDropDownSuccess, (state, { inactiveReason }) => ({
        ...state,
        loading: false,
        inactiveReason,
    })),
    on(PatientCenterDeatilsActions.LoadInactiveReasonDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDeatilsActions.LoadPatientReferralDropDown, state => ({ ...state, loading: true })),
    on(PatientCenterDeatilsActions.LoadPatientReferralDropDownSuccess, (state, { patientReferral }) => ({
        ...state,
        loading: false,
        patientReferral,
    })),
    on(PatientCenterDeatilsActions.LoadPatientReferralDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDeatilsActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(PatientCenterDeatilsActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(PatientCenterDeatilsActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDeatilsActions.LoadPatientContactMethodDropDown, state => ({ ...state, loading: true })),
    on(PatientCenterDeatilsActions.LoadPatientContactMethodDropDownSuccess, (state, { contactMethod }) => ({
        ...state,
        loading: false,
        contactMethod,
    })),
    on(PatientCenterDeatilsActions.LoadPatientContactMethodDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDeatilsActions.LoadPatientReferrals, state => ({ ...state, loading: true })),
    on(PatientCenterDeatilsActions.LoadPatientReferralsSuccess, (state, { referrals }) => ({
        ...state,
        loading: false,
        referrals,
    })),
    on(PatientCenterDeatilsActions.LoadPatientReferralsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDeatilsActions.LoadPlaceOfServiceDropDown, state => ({ ...state, loading: true })),
    on(PatientCenterDeatilsActions.LoadPlaceOfServiceDropDownSuccess, (state, { placeOfService }) => ({
        ...state,
        loading: false,
        placeOfService,
    })),
    on(PatientCenterDeatilsActions.LoadPlaceOfServiceDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(PatientCenterDeatilsActions.LoadPatientValidation, state => ({ ...state, loading: true })),
    on(PatientCenterDeatilsActions.LoadPatientValidationSuccess, (state, { patientValidation }) => ({
        ...state,
        loading: false,
        patientValidation,
    })),
    on(PatientCenterDeatilsActions.LoadPatientValidationFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPatientDetails = (state: State) => state.patient;
export const selectPatientSalesRep = (state: State) => state.salesrep;
export const selectPatientIntake = (state: State) => state.intake;
export const selectPatientCategory = (state: State) => state.patientCategory;
export const selectPatientStatus = (state: State) => state.patientStatus;
export const selectInactiveReason = (state: State) => state.inactiveReason;
export const selectPatientReferral = (state: State) => state.patientReferral;
export const selectPatientCityState = (state: State) => state.zipCodeLookup;
export const selectPatientReferrals = (state: State) => state.referrals;
export const selectPatientContactMethod = (state: State) => state.contactMethod;
export const selectPlaceOfService = (state: State) => state.placeOfService;
export const selectPatientValidation = (state: State) => state.patientValidation;
