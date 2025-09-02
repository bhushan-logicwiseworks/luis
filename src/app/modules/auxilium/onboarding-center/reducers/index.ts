import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromDrillDownTable from './drilldown-table.reducer';

export const featureKey = 'patients';

export interface PatientsState {
    [fromDrillDownTable.featureKey]: fromDrillDownTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: PatientsState;
}

export function reducers(state: PatientsState | undefined, action: Action) {
    return combineReducers({
        [fromDrillDownTable.featureKey]: fromDrillDownTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, PatientsState>(featureKey);

/**
 * DrillDown Table Selectors
 */
export namespace DrillDownTableSelectors {
    const selectDrilldownTableState = createSelector(selectState, state => state[fromDrillDownTable.featureKey]);

    export const selectLoading = createSelector(selectDrilldownTableState, fromDrillDownTable.selectLoading);
    export const selectError = createSelector(selectDrilldownTableState, fromDrillDownTable.selectError);
    export const selectPatients = createSelector(selectDrilldownTableState, fromDrillDownTable.selectPatients);
}
