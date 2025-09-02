import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromJobCenterTable from './job-center-table.reducer';
import * as fromJobIndividual from './job-individual.reducer';

export const featureKey = 'job-center';

export interface JobCenterTableState {
    [fromJobCenterTable.featureKey]: fromJobCenterTable.State;
    [fromJobIndividual.featureKey]: fromJobIndividual.State;
}

export interface State extends fromRoot.State {
    [featureKey]: JobCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: JobCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromJobCenterTable.featureKey]: fromJobCenterTable.reducer,
        [fromJobIndividual.featureKey]: fromJobIndividual.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, JobCenterTableState>(featureKey);

/**
 * Job Center Table Selectors
 */
export namespace JobCenterTableSelectors {
    const selectJobCenterTableState = createSelector(selectState, state => state[fromJobCenterTable.featureKey]);

    export const selectLoading = createSelector(selectJobCenterTableState, fromJobCenterTable.selectLoading);
    export const selectError = createSelector(selectJobCenterTableState, fromJobCenterTable.selectError);
    export const selectJobCenter = createSelector(selectJobCenterTableState, fromJobCenterTable.selectJobs);
    export const selectActiveJob = createSelector(selectJobCenterTableState, fromJobCenterTable.selectActiveJob);
    export const selectJobHistory = createSelector(selectJobCenterTableState, fromJobCenterTable.selectJobHistory);
}

/**
 * Job Individual Selectors
 */
export namespace JobIndividualSelectors {
    const selectJobIndividualState = createSelector(selectState, state => state[fromJobIndividual.featureKey]);

    export const selectLoading = createSelector(selectJobIndividualState, fromJobIndividual.selectLoading);
    export const selectError = createSelector(selectJobIndividualState, fromJobIndividual.selectError);
    export const selectJobHistoryDetailsById = createSelector(
        selectJobIndividualState,
        fromJobIndividual.selectJobHistoryDetailsById
    );
}
