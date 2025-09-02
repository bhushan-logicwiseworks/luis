import { createReducer, on } from '@ngrx/store';
import * as fromReorderPatientActions from '../actions/reorder-patient.actions';

export const reorderPatientFeatureKey = 'reorderPatient';

export interface ReorderPatientState {
    loading: boolean;
    loaded: boolean;
    patient: any;
    alternateShipToAddress: any;
    insurance: any;
    doctor: any;
    datesEtc: any;
    patientNotes: any;
    error: Error;
    reorderProducts: any;
    prismAuthorization: any;
}

export const initialState: ReorderPatientState = {
    patient: null,
    alternateShipToAddress: null,
    insurance: null,
    doctor: null,
    datesEtc: null,
    patientNotes: null,
    loading: false,
    loaded: false,
    error: null,
    reorderProducts: null,
    prismAuthorization: null,
};

export const reducer = createReducer(
    initialState,
    on(fromReorderPatientActions.loadReorderPatientData, state => ({ ...initialState, loading: true })),
    on(
        fromReorderPatientActions.loadReorderPatientDataSuccess,
        (state, { insurance, patient, alternateShipToAddress, doctor, datesEtc, patientNotes, reorderProducts }) => ({
            ...state,
            loading: false,
            loaded: true,
            error: null,
            insurance,
            patient,
            alternateShipToAddress,
            doctor,
            datesEtc,
            patientNotes,
            reorderProducts,
        })
    ),
    on(fromReorderPatientActions.loadReorderPatientDataFailure, (state, { error }) => ({
        ...state,
        loading: false,
        loaded: false,
        error,
    }))
);
