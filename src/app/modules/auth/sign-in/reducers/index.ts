import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromLogin from './login.reducer';

export const featureKey = 'login';

export interface LoginState {
    [fromLogin.featureKey]: fromLogin.State;
}

export interface State extends fromRoot.State {
    [featureKey]: LoginState;
}

export function reducers(state: LoginState | undefined, action: Action) {
    return combineReducers({
        [fromLogin.featureKey]: fromLogin.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, LoginState>(featureKey);

/**
 * Login Selectors
 */
export namespace LoginSelectors {
    const selectLoginState = createSelector(selectState, state => state[fromLogin.featureKey]);

    export const selectLoading = createSelector(selectLoginState, fromLogin.selectLoading);
    export const selectError = createSelector(selectLoginState, fromLogin.selectError);
}
