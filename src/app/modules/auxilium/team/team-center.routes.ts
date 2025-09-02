import { Route } from '@angular/router';
import { TeamCenterComponent } from './containers/team-center-component/team-center.component';
import { TeamCenterProfileComponent } from './containers/team-center-profile/team-center-profile.component';
import providers from './team-center.providers';

export default [
    {
        path: '',
        component: TeamCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'active',
                pathMatch: 'full',
            },
            {
                path: 'active',
                component: TeamCenterProfileComponent,
            },
            {
                path: 'inactive',
                component: TeamCenterProfileComponent,
            },
            {
                path: 'all',
                component: TeamCenterProfileComponent,
            },
        ],
    },
] as Route[];
