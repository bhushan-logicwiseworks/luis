import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { QuickFaxToolActions } from '../actions/quick-fax-tool.action';

export const featureKey = 'quick-fax';

export interface State extends LoadingState {
    message: string;
    doctorDetails: any;
}

const initialState: State = {
    loading: false,
    error: null,
    message: null,
    doctorDetails: null,
};

export const reducer = createReducer(
    initialState,
    on(QuickFaxToolActions.sendFaxMessage, state => ({ ...state, loading: true })),
    on(QuickFaxToolActions.sendFaxMessageSuccess, (state, { message }) => ({ ...state, loading: false, message })),
    on(QuickFaxToolActions.sendFaxMessageFailure, (state, { error }) => ({ ...state, loading: false, error })),

    on(QuickFaxToolActions.getDoctorDetails, state => ({ ...state, loading: true })),
    on(QuickFaxToolActions.getDoctorDetailsSuccess, (state, { doctorDetails }) => ({
        ...state,
        loading: false,
        doctorDetails,
    })),
    on(QuickFaxToolActions.getDoctorDetailsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectDoctorDetails = (state: State) => state.doctorDetails;
