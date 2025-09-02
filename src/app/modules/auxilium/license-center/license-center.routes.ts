import { Route } from '@angular/router';
import { LicenseDetailsComponent } from './components/license-details/license-details.component';
import { LicenseFolderComponent } from './components/license-folder/license-folder.component';
import { LicenseCenterComponent } from './containers/license-center-component/license-center.component';
import { LicenseCenterDetailsComponent } from './containers/license-center-details/license-center-details.component';
import { LicenseCenterTableComponent } from './containers/license-center-table/license-center-table.component';
import { LoadBranchListGuard } from './guards/branch-list.guard';
import { LicenseFolderGuard } from './guards/license-folder.guard';
import providers from './license-center.providers';

export default [
    {
        path: '',
        canActivate: [LoadBranchListGuard],
        component: LicenseCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: LicenseCenterTableComponent,
            },
        ],
    },
    {
        path: ':id',
        component: LicenseCenterDetailsComponent,
        canActivate: [LicenseFolderGuard, LoadBranchListGuard],
        children: [
            { path: '', redirectTo: 'license-details', pathMatch: 'full' },
            { path: 'license-details', component: LicenseDetailsComponent },
            { path: 'license-folder', component: LicenseFolderComponent },
        ],
    },
] as Route[];
