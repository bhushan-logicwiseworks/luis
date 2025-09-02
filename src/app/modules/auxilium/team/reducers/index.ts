import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromEmployeeCenterTable from './team-center.reducer';

export const featureKey = 'team-center';

export interface TeamCenterTableState {
    [fromEmployeeCenterTable.featureKey]: fromEmployeeCenterTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: TeamCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: TeamCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromEmployeeCenterTable.featureKey]: fromEmployeeCenterTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, TeamCenterTableState>(featureKey);

/**
 * EmployeeCenter Table Selectors
 */
export namespace TeamCenterTableSelectors {
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
