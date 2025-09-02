import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { PatientCenterSensorActions } from '../actions/patient-center-sensor.action';

export const featureKey = 'patient-sensor';

export interface State extends EntityState<any> {
    // additional entities state properties
    loading: boolean;
    error: Error;
    sensor: any;
}
export const adapter: EntityAdapter<any> = createEntityAdapter<any>({
    selectId: model => model.Id,
});

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    loading: false,
    error: null,
    sensor: [],
});

export const reducer = createReducer(
    initialState,

    on(PatientCenterSensorActions.LoadPatientSensor, state => ({ ...state, loading: true })),
    on(PatientCenterSensorActions.LoadPatientSensorSuccess, (state, { sensor }) => ({
        ...state,
        loading: false,
        sensor,
    })),
    on(PatientCenterSensorActions.LoadPatientSensorFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectPatientSensor = (state: State) => state.sensor;
