import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import { AppName } from 'app/shared/components/auxilium/appName';
import * as fromRoot from '../../../../reducers';
import * as fromEmployeeDemographics from './employee-center-demographics.reducer';
import * as fromEmployeeCenterDetails from './employee-center-details.reducer';
import * as fromEmployeeCenterIndividual from './employee-center-individual.reducer';
import * as fromEmployeeSecurity from './employee-center-security.reducer';
import * as fromEmployeeCenterTable from './employee-center-table.reducer';

export const featureKey = 'employee-center';

export interface EmployeeCenterTableState {
    [fromEmployeeCenterTable.featureKey]: fromEmployeeCenterTable.State;
    [fromEmployeeCenterIndividual.featureKey]: fromEmployeeCenterIndividual.State;
    [fromEmployeeCenterDetails.featureKey]: fromEmployeeCenterDetails.State;
    [fromEmployeeDemographics.featureKey]: fromEmployeeDemographics.State;
    [fromEmployeeSecurity.featureKey]: fromEmployeeSecurity.State;
}

export interface State extends fromRoot.State {
    [featureKey]: EmployeeCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: EmployeeCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromEmployeeCenterTable.featureKey]: fromEmployeeCenterTable.reducer,
        [fromEmployeeCenterIndividual.featureKey]: fromEmployeeCenterIndividual.reducer,
        [fromEmployeeCenterDetails.featureKey]: fromEmployeeCenterDetails.reducer,
        [fromEmployeeDemographics.featureKey]: fromEmployeeDemographics.reducer,
        [fromEmployeeSecurity.featureKey]: fromEmployeeSecurity.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, EmployeeCenterTableState>(featureKey);

/**
 * EmployeeCenter Table Selectors
 */
export namespace EmployeeCenterTableSelectors {
    const selectEmployeeCenterTableState = createSelector(
        selectState,
        state => state[fromEmployeeCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectEmployeeCenterTableState, fromEmployeeCenterTable.selectLoading);
    export const selectError = createSelector(selectEmployeeCenterTableState, fromEmployeeCenterTable.selectError);
    export const selectEmployees = createSelector(
        selectEmployeeCenterTableState,
        fromEmployeeCenterTable.selectEmployees
    );
}

/**
 * EmployeeCenter Individual Selectors
 */
export namespace EmployeeCenterIndividualSelectors {
    const selectEmployeeCenterIndividualState = createSelector(
        selectState,
        state => state[fromEmployeeCenterIndividual.featureKey]
    );

    export const selectLoading = createSelector(
        selectEmployeeCenterIndividualState,
        fromEmployeeCenterIndividual.selectLoading
    );
    export const selectEmployee = createSelector(
        selectEmployeeCenterIndividualState,
        fromEmployeeCenterIndividual.selectEmployee
    );
    export const selectError = createSelector(
        selectEmployeeCenterIndividualState,
        fromEmployeeCenterIndividual.selectError
    );
}

/**
 * EmployeeCenter Details Selectors
 */
export namespace EmployeeCenterDetailsSelectors {
    const selectEmployeeCenterDetailsState = createSelector(
        selectState,
        state => state[fromEmployeeCenterDetails.featureKey]
    );

    export const selectLoading = createSelector(
        selectEmployeeCenterDetailsState,
        fromEmployeeCenterDetails.selectLoading
    );
    export const selectError = createSelector(selectEmployeeCenterDetailsState, fromEmployeeCenterDetails.selectError);
    export const selectEmployeeDetails = createSelector(
        selectEmployeeCenterDetailsState,
        fromEmployeeCenterDetails.selectEmployeeDetails
    );
    export const selectEmployeeCityState = createSelector(
        selectEmployeeCenterDetailsState,
        fromEmployeeCenterDetails.selectEmployeeCityState
    );
}

/**
 * Employee Demographics Selectors
 */
export namespace EmployeeDemographicsSelectors {
    const selectEmployeeDemographicsState = createSelector(
        selectState,
        state => state[fromEmployeeDemographics.featureKey]
    );

    export const selectLoading = createSelector(
        selectEmployeeDemographicsState,
        fromEmployeeDemographics.selectLoading
    );
    export const selectError = createSelector(selectEmployeeDemographicsState, fromEmployeeDemographics.selectError);
    export const selectdemographics = createSelector(
        selectEmployeeDemographicsState,
        fromEmployeeDemographics.selectdemographics
    );
}

/**
 * Employee Security Selectors
 */
export namespace EmployeeSecuritySelectors {
    const selectSecurityState = createSelector(selectState, state => state[fromEmployeeSecurity.featureKey]);

    export const selectLoading = createSelector(selectSecurityState, fromEmployeeSecurity.selectLoading);
    export const selectError = createSelector(selectSecurityState, fromEmployeeSecurity.selectError);
    export const selectselect = createSelector(selectSecurityState, fromEmployeeSecurity.selectsecurity);
    export const selectEmployeeAccess = createSelector(selectSecurityState, fromEmployeeSecurity.selectEmployeeAccess);
    export const selectEmployeeAccessByFilter = createSelector(selectEmployeeAccess, entities => {
        return entities?.filter(entity => {
            return AppName.some(
                res => res.name.toLowerCase() === entity.appName.toLowerCase() && res.type === 'public'
            );
        });
    });
}
