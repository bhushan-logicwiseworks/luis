import { Route } from '@angular/router';
import providers from './branch-center.providers';
import { BranchCenterComponent } from './containers/branch-center-component/branch-center.component';
import { BranchCenterTableComponent } from './containers/branch-center-table/branch-center-table.component';

export default [
    {
        path: '',
        component: BranchCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                component: BranchCenterTableComponent,
            },
        ],
    },
] as Route[];
