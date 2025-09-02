import { createAction, props } from '@ngrx/store';
import firebase from 'firebase/auth';
import { Credentials } from '../../../../shared/interfaces/user/credentials.interface';

const Login = createAction('[Login Page] Login', props<{ credentials: Credentials }>());
const LoginSuccess = createAction('[Login Page] Login Success', props<{ user: firebase.UserCredential }>());
const LoginFailure = createAction('[Login Page] Login Failure', props<{ error: Error }>());
const RedirectAfterLogin = createAction('[Login Page] Redirect After Login');

export const LoginActions = {
    Login,
    LoginSuccess,
    LoginFailure,
    RedirectAfterLogin,
};
