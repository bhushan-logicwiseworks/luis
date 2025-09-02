import { Route } from '@angular/router';
import providers from './code-center.providers';
import { CodeCenterComponent } from './containers/code-center-component/code-center.component';
import { CodeCenterTableComponent } from './containers/code-center-table/code-center-table.component';

export default [
    {
        path: '',
        component: CodeCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                component: CodeCenterTableComponent,
            },
        ],
    },
] as Route[];
