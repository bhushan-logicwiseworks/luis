import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromPostingCenterTable from './posting-center-table.reducer';

export const featureKey = 'posting-center';

export interface PostingCenterTableState {
    [fromPostingCenterTable.featureKey]: fromPostingCenterTable.State;
}

export interface State extends fromRoot.State {
    [featureKey]: PostingCenterTableState;
}

/**
 * Reducers
 */
export function reducers(state: PostingCenterTableState | undefined, action: Action) {
    return combineReducers({
        [fromPostingCenterTable.featureKey]: fromPostingCenterTable.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, PostingCenterTableState>(featureKey);

/**
 * PostingCenter Table Selectors
 */
export namespace PostingCenterTableSelectors {
    const selectPostingCenterTableState = createSelector(
        selectState,
        state => state[fromPostingCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectPostingCenterTableState, fromPostingCenterTable.selectLoading);
    export const selectError = createSelector(selectPostingCenterTableState, fromPostingCenterTable.selectError);

    export const selectEOBData = createSelector(selectPostingCenterTableState, fromPostingCenterTable.selectEOBData);
    export const selectEOB = createSelector(selectPostingCenterTableState, fromPostingCenterTable.selectEOB);
    export const selectEOBById = createSelector(selectPostingCenterTableState, fromPostingCenterTable.selectEOBById);
    export const selectPatientEOBById = createSelector(
        selectPostingCenterTableState,
        fromPostingCenterTable.selectPatientEOBById
    );
    export const selectEOBInfo = createSelector(selectPostingCenterTableState, fromPostingCenterTable.selectEOBInfo);
}
