import { Route } from '@angular/router';
import { UserCenterProfilePageComponent } from './components/user-center-profile-page/user-center-profile-page.component';
import { UserSettingsComponent } from './containers/user-settings.component';

export default [
    {
        path: 'settings',
        component: UserSettingsComponent,
    },
    {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full',
    },
    {
        path: 'profile',
        component: UserCenterProfilePageComponent,
    },
] as Route[];
