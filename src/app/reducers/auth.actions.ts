import { createAction, props } from '@ngrx/store';
import { EmployeeDisplay } from 'app/shared/interfaces/auxilium/employee-center/employee.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { ResetPassword } from 'app/shared/interfaces/user/credentials.interface';
import firebase from 'firebase/auth';
import User = firebase.User;

const Login = createAction('[Auth] Login', props<{ user: User }>());
const UpdateUser = createAction('[Auth] Update User', props<{ user: User }>());
const UpdateUserMeta = createAction('[Auth] Update User Meta', props<{ userMeta: any }>());
const UpdateUserRole = createAction('[Auth] Update User Role', props<{ userRole: any }>());
const UpdateIdTokenResult = createAction(
    '[Auth] Update Id Token Result',
    props<{ idTokenResult: firebase.IdTokenResult | null }>()
);
const Logout = createAction('[Auth] Logout');
const GetLoggedInUserID = createAction('[Auth] Get LoggedIn User ID');
const GetLoggedInUserIDFailure = createAction('[Auth] Get LoggedIn User ID Failure');

const GetLoggedInUserDetails = createAction('[Auth] Get LoggedIn User Details', props<{ id: number }>());
const GetLoggedInUserDetailsSuccess = createAction(
    '[Auth] Get LoggedIn User Details Success',
    props<{ loggedInUser: EmployeeDisplay }>()
);
const GetLoggedInUserDetailsFailure = createAction(
    '[Auth] Get LoggedIn User Details Failure',
    props<{ loggedInUser: null }>()
);

const UpdateLoggedInUserDetails = createAction(
    '[Auth] Update LoggedIn User Details',
    props<{ loggedInUser: EmployeeDisplay }>()
);
const UpdateLoggedInUserDetailsSuccess = createAction(
    '[Auth] Update LoggedIn User Details Success',
    props<{ loggedInUser: EmployeeDisplay }>()
);
const UpdateLoggedInUserDetailsFailure = createAction(
    '[Auth] Update LoggedIn User Details Failure',
    props<{ loggedInUser: null }>()
);

const GetLoggedInUserPic = createAction('[Auth] Get LoggedIn User Pic', props<{ id: number }>());
const GetLoggedInUserPicSuccess = createAction(
    '[Auth] Get LoggedIn User Pic Success',
    props<{ loggedInUserPic: string[] }>()
);
const GetLoggedInUserPicFailure = createAction(
    '[Auth] Get LoggedIn User Pic Failure',
    props<{ loggedInUserPic: null }>()
);

const UploadEmployeePic = createAction(
    '[Auth] Upload Employee Pic',
    props<{ uploadPic: FormData; documentfile: string; backgroundProfileFile: string }>()
);
const UploadEmployeePicSuccess = createAction(
    '[Auth] Upload Employee Pic Success',
    props<{ loggedInUserPic: any[] }>()
);
const UploadEmployeePicFailure = createAction('[Auth] Upload Employee Pic Failure', props<{ loggedInUser: null }>());

const ForgotPassword = createAction('[Auth] Forgot Password', props<{ ForgotPassword: ResetPassword }>());
const ForgotPasswordSuccess = createAction('[Auth] Forgot Password Success', props<{ message: any }>());
const ForgotPasswordFailure = createAction('[Auth] Forgot Password Failure', props<{ error: Error }>());

const LoadCityAndStateDropDown = createAction('[Auth] Load City and Sate DropDown', props<{ zipCode: number }>());
const LoadCityAndStateDropDownSuccess = createAction(
    '[Auth] Load City and Sate DropDown Success',
    props<{ zipCodeLookup: GetPatientZipCodeLookUp }>()
);
const LoadCityAndStateDropDownFailure = createAction(
    '[Auth] Load City and Sate DropDown Failure',
    props<{ error: Error }>()
);

export const AuthActions = {
    Login,
    UpdateUser,
    UpdateUserMeta,
    UpdateUserRole,
    GetLoggedInUserDetails,
    GetLoggedInUserDetailsSuccess,
    GetLoggedInUserDetailsFailure,
    UpdateLoggedInUserDetails,
    UpdateLoggedInUserDetailsSuccess,
    UpdateLoggedInUserDetailsFailure,
    GetLoggedInUserPic,
    GetLoggedInUserPicSuccess,
    GetLoggedInUserPicFailure,
    UploadEmployeePic,
    UploadEmployeePicSuccess,
    UploadEmployeePicFailure,
    UpdateIdTokenResult,
    GetLoggedInUserID,
    GetLoggedInUserIDFailure,
    ForgotPassword,
    ForgotPasswordSuccess,
    ForgotPasswordFailure,
    LoadCityAndStateDropDown,
    LoadCityAndStateDropDownSuccess,
    LoadCityAndStateDropDownFailure,
    Logout,
};
