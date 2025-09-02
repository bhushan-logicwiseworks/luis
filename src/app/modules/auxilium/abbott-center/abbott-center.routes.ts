import { Routes } from '@angular/router';
import abbottCenterProviders from './abbott-center.providers';
import { AbbottCenterTableComponent } from './containers/abbott-center-table/abbott-center-table.component';
import { AbbottCenterComponent } from './containers/abbott-center/abbott-center.component';

export default [
    {
        path: '',
        component: AbbottCenterComponent,
        providers: [...abbottCenterProviders],
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: AbbottCenterTableComponent,
            },
        ],
    },
] as Routes;
