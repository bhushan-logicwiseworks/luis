import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { EmployeeDisplay } from 'app/shared/interfaces/auxilium/employee-center/employee.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { EmployeeCenterDeatilsActions } from '../actions/employee-center-details.action';

export const featureKey = 'employee-center';

export interface State extends EntityState<EmployeeDisplay> {
    // additional entities state properties
    loading: boolean;
    error: Error;
    loaded: boolean;
    employee: any;
    zipCodeLookup: GetPatientZipCodeLookUp;
}
export const adapter: EntityAdapter<EmployeeDisplay> = createEntityAdapter<EmployeeDisplay>({
    selectId: model => model.id,
});

export const initialState: State = adapter.getInitialState({
    // additional entity state properties
    loading: false,
    error: null,
    loaded: false,
    employee: [],
    zipCodeLookup: undefined,
});

export const reducer = createReducer(
    initialState,

    on(EmployeeCenterDeatilsActions.ResetState, () => {
        return initialState;
    }),

    on(EmployeeCenterDeatilsActions.LoadEmployeeDetails, state => ({ ...state, loading: true })),
    on(EmployeeCenterDeatilsActions.LoadEmployeeDetailsSuccess, (state, { employee }) => ({
        ...state,
        loading: false,
        employee,
    })),
    on(EmployeeCenterDeatilsActions.LoadEmployeeDetailsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(EmployeeCenterDeatilsActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(EmployeeCenterDeatilsActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(EmployeeCenterDeatilsActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectEmployeeDetails = (state: State) => state.employee;
export const selectEmployeeCityState = (state: State) => state.zipCodeLookup;
