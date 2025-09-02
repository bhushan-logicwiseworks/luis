import { Route } from '@angular/router';
import { IcdCodeDetailsComponent } from './components/icdcode-details/icdcode-details.component';
import { IcdCodeCenterComponent } from './containers/icdcode-center-component/icdcode-center.component';
import { IcdCodeCenterDetailsComponent } from './containers/icdcode-center-details/icdcode-center-details.component';
import { IcdCodeCenterTableComponent } from './containers/icdcode-center-table/icdcode-center-table.component';
import providers from './icdcode-center.providers';

export default [
    {
        path: '',
        component: IcdCodeCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                component: IcdCodeCenterTableComponent,
            },
        ],
    },
    {
        path: ':id',
        component: IcdCodeCenterDetailsComponent,
        children: [
            { path: '', redirectTo: 'icdcode-details', pathMatch: 'full' },
            { path: 'icdcode-details', component: IcdCodeDetailsComponent },
        ],
    },
] as Route[];
