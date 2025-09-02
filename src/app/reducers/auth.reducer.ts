import { createReducer, on } from '@ngrx/store';
import { EmployeeDisplay } from 'app/shared/interfaces/auxilium/employee-center/employee.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import firebase from 'firebase/auth';
import { AuthActions } from './auth.actions';
import User = firebase.User;

export const featureKey = 'auth';

export interface State {
    user: User;
    userMeta: any;
    userRole: any;
    loggedInUser: EmployeeDisplay | null;
    loadingUserDetails: boolean;
    loggedInUserPic: any | null;
    loadingUserPic: boolean;
    idTokenResult: firebase.IdTokenResult;
    error: any;
    message: any;
    zipCodeLookup: GetPatientZipCodeLookUp;
}

const initialState: State = {
    user: null,
    userMeta: null,
    loadingUserDetails: false,
    userRole: null,
    loggedInUser: null,
    idTokenResult: null,
    loggedInUserPic: null,
    loadingUserPic: false,
    error: null,
    message: null,
    zipCodeLookup: null,
};

export const reducer = createReducer(
    initialState,
    on(AuthActions.Login, (state, { user }) => ({
        ...state,
        user: { ...user },
    })),
    on(AuthActions.UpdateUser, (state, { user }) => ({
        ...state,
        user: { ...user },
    })),
    on(AuthActions.UpdateUserMeta, (state, { userMeta }) => ({
        ...state,
        userMeta,
    })),
    on(AuthActions.UpdateUserRole, (state, { userRole }) => ({
        ...state,
        userRole,
    })),
    on(AuthActions.UpdateIdTokenResult, (state, { idTokenResult }) => ({
        ...state,
        idTokenResult,
    })),
    on(AuthActions.Logout, () => initialState),
    on(AuthActions.GetLoggedInUserIDFailure, state => ({
        ...state,
        loadingUserDetails: false,
        loadingUserPic: false,
        loggedInUser: null,
        loggedInUserPic: null,
    })),

    on(AuthActions.GetLoggedInUserDetails, AuthActions.UpdateLoggedInUserDetails, state => ({
        ...state,
        loadingUserDetails: true,
    })),
    on(
        AuthActions.GetLoggedInUserDetailsSuccess,
        AuthActions.UpdateLoggedInUserDetailsSuccess,
        (state, { loggedInUser }) => ({
            ...state,
            loadingUserDetails: false,
            loggedInUser,
        })
    ),
    on(AuthActions.GetLoggedInUserDetailsFailure, AuthActions.UpdateLoggedInUserDetailsFailure, state => ({
        ...state,
        loadingUserDetails: false,
        loggedInUser: null,
    })),

    on(AuthActions.GetLoggedInUserPic, AuthActions.UploadEmployeePic, state => ({ ...state, loadingUserPic: true })),

    on(AuthActions.GetLoggedInUserPicSuccess, AuthActions.UploadEmployeePicSuccess, (state, { loggedInUserPic }) => ({
        ...state,
        loadingUserPic: false,
        loggedInUserPic,
    })),
    on(AuthActions.GetLoggedInUserPicFailure, AuthActions.UploadEmployeePicFailure, state => ({
        ...state,
        loadingUserPic: false,
        loggedInUserPic: null,
    })),
    on(AuthActions.ForgotPasswordFailure, (state, { error }) => ({ ...state, error })),
    on(AuthActions.ForgotPasswordSuccess, (state, { message }) => ({ ...state, message })),

    on(AuthActions.LoadCityAndStateDropDown, state => ({ ...state, loading: true })),
    on(AuthActions.LoadCityAndStateDropDownSuccess, (state, { zipCodeLookup }) => ({
        ...state,
        loading: false,
        zipCodeLookup,
    })),
    on(AuthActions.LoadCityAndStateDropDownFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectUser = (state: State) => state.user;
export const selectUserRole = (state: State) => state.userRole?.role;
export const selectIdTokenResult = (state: State) => state.idTokenResult;
export const selectLoggedInUser = (state: State) => state.loggedInUser;
export const selectLoadingUserDetails = (state: State) => state.loadingUserDetails;
export const selectLoggedInUserPic = (state: State) => state.loggedInUserPic;
export const selectPicLoading = (state: State) => state.loadingUserPic;
export const selectError = (state: State) => state.error;
export const selectForgotPasswordSuccessMessage = (state: State) => state.message;
export const selectUserCityState = (state: State) => state.zipCodeLookup;
