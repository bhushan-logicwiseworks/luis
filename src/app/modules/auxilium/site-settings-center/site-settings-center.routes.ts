import { Route } from '@angular/router';
import { SiteSettingsComponent } from './containers/site-settings.component';

export default [
    {
        path: 'settings',
        component: SiteSettingsComponent,
    },
    {
        path: '',
        redirectTo: 'settings',
        pathMatch: 'full',
    },
] as Route[];
