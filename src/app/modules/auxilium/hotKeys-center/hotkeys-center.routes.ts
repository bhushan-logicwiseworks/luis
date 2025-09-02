import { Route } from '@angular/router';
import { HotKeysCenterComponent } from './containers/hotKeys-center-component/hotKeys-center.component';
import { HotKeysCenterTableComponent } from './containers/hotKeys-center-table/hotKeys-center-table.component';
import providers from './hotkeys-center.providers';

export default [
    {
        path: '',
        component: HotKeysCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                component: HotKeysCenterTableComponent,
            },
        ],
    },
] as Route[];
