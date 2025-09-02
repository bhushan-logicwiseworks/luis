import { Route } from '@angular/router';
import providers from './comm-center.providers';
import { OpenPdfViewerComponent } from './components/comm-center-email/open-pdf-viewer/open-pdf-viewer.component';
import { CommCenterComponent } from './containers/comm-center-component/comm-center.component';
import { CommCenterTableComponent } from './containers/comm-center-table/comm-center-table.component';

export default [
    {
        path: '',
        component: CommCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'my-inbox',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: CommCenterTableComponent,
            },
            {
                path: ':filterSlug/link-doc/:id',
                component: OpenPdfViewerComponent,
            },
        ],
    },
] as Route[];
