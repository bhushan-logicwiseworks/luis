import { Routes } from '@angular/router';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';
import providers from './sign-in.providers';

export default [
    {
        path: '',
        component: AuthSignInComponent,
        providers: providers,
    },
] as Routes;
