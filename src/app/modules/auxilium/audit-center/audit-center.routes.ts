import { Route } from '@angular/router';
import providers from './audit-center.providers';
import { AuditCenterComponent } from './containers/audit-center-component/audit-center.component';
import { AuditCenterTableComponent } from './containers/audit-center-table/audit-center-table.component';

export default [
    {
        path: '',
        component: AuditCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: AuditCenterTableComponent,
            },
        ],
    },
] as Route[];
