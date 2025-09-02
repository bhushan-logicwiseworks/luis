import { createReducer, on } from '@ngrx/store';
import { GetIntakesResponse } from 'app/shared/interfaces/auxilium/intake-center/intake.interface';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { IntakeCenterTableActions } from '../actions/intake-center-table.actions';

export const featureKey = 'intake-center-table';

export interface State extends LoadingState {
    Intakes: GetIntakesResponse;
}

// interface IdEntity {
//   id: number;
// }

const initialState: State = {
    loading: false,
    error: null,
    Intakes: [],
};

export const reducer = createReducer(
    initialState,
    on(IntakeCenterTableActions.resetState, () => initialState),

    on(IntakeCenterTableActions.LoadIntake, state => ({ ...initialState, loading: true })),
    on(IntakeCenterTableActions.LoadIntakeSuccess, (state, { Intakes }) => ({ ...state, loading: false, Intakes })),
    on(IntakeCenterTableActions.LoadIntakeFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectIntakes = (state: State) => state.Intakes;
