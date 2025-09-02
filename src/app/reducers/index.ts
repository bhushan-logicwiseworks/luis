import { InjectionToken } from '@angular/core';
import * as fromRouter from '@ngrx/router-store';
import { DEFAULT_ROUTER_FEATURENAME } from '@ngrx/router-store';
import { Action, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './auth.reducer';
import { metaReducers as clearStateMetaReducers, extraMetaReducers } from './clear-state.metareducer';

export interface State {
    [DEFAULT_ROUTER_FEATURENAME]: fromRouter.RouterReducerState;
    [fromAuth.featureKey]: fromAuth.State;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>('Root Reducers Token', {
    factory: () => ({
        router: fromRouter.routerReducer,
        [fromAuth.featureKey]: fromAuth.reducer,
    }),
});

/**
 * Router Selectors
 */

const selectRouter = createFeatureSelector<State, fromRouter.RouterReducerState>(fromRouter.DEFAULT_ROUTER_FEATURENAME);

/**
 * Auth Selectors
 */
export namespace AuthSelectors {
    const selectAuth = createFeatureSelector<State, fromAuth.State>(fromAuth.featureKey);

    export const selectUser = createSelector(selectAuth, fromAuth.selectUser);
    export const selectUserRole = createSelector(selectAuth, fromAuth.selectUserRole);
    export const selectIdTokenResult = createSelector(selectAuth, fromAuth.selectIdTokenResult);
    export const selectLoggedInUser = createSelector(selectAuth, fromAuth.selectLoggedInUser);
    export const selectLoadingUserDetails = createSelector(selectAuth, fromAuth.selectLoadingUserDetails);
    export const selectLoggedInUserPicResult = createSelector(selectAuth, fromAuth.selectLoggedInUserPic);
    export const selectPicLoading = createSelector(selectAuth, fromAuth.selectPicLoading);
    export const selectIsAdmin = createSelector(selectIdTokenResult, idTokenResult => idTokenResult?.claims?.admin);
    export const selectLoggedInUserPic = createSelector(selectLoggedInUserPicResult, idImages =>
        idImages?.length ? idImages[0]['documentfile'] : null
    );
    export const selectLoggedInUserBackgroundPic = createSelector(selectLoggedInUserPicResult, idImages =>
        idImages?.length ? idImages[1]?.documentfile : null
    );
    export const selectLoggedIn = createSelector(selectUser, user => !!user);
    export const selectName = createSelector(selectUser, user => user?.displayName || user?.email);
    export const selectUserCityState = createSelector(selectAuth, fromAuth.selectUserCityState);
    export const selectForgotPasswordSuccessMessage = createSelector(
        selectAuth,
        fromAuth.selectForgotPasswordSuccessMessage
    );
    export const selectError = createSelector(selectAuth, fromAuth.selectError);
}

export const metaReducers: MetaReducer<State>[] = [
    ...(!environment.production ? [] : []),
    ...clearStateMetaReducers,
    ...extraMetaReducers,
];
