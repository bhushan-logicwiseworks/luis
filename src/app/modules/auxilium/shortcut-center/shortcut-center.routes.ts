import { Route } from '@angular/router';
import { ShortcutCenterComponent } from './container/shortcut-center-component/shortcut-center-component.component';
import { ShortcutCenterTableComponent } from './container/shortcut-center-table/shortcut-center-table-component';
import providers from './shortcut-center.providers';

export default [
    {
        path: '',
        component: ShortcutCenterComponent,
        providers: providers,

        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: ShortcutCenterTableComponent,
            },
        ],
    },
] as Route[];
