import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';
import { PatientChecklistActions } from '../actions/patient-checklist.action';

export const patientsFeatureKey = 'patient-Checklist';

export interface State extends LoadingState {
    checklist: PatientEntity;
}

const initialState: State = {
    loading: false,
    error: null,
    checklist: null,
};

export const reducer = createReducer(
    initialState,

    on(PatientChecklistActions.AddPatientChecklist, state => ({ ...state, loading: true })),
    on(PatientChecklistActions.AddPatientChecklistSuccess, (state, { checklist }) => ({
        ...state,
        loading: false,
        checklist,
    })),
    on(PatientChecklistActions.AddPatientChecklistFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectChecklist = (state: State) => state.checklist;
