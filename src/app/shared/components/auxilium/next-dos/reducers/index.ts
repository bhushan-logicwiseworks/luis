import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NextDosState } from './next-dos.reducer';
export namespace NextDosSelectors {
    export const selectNextDosState = createFeatureSelector<NextDosState>('nextDos');
    export const selectLoading = createSelector(selectNextDosState, (state: NextDosState) => state.loading);
}
