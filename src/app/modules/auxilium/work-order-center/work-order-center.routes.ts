import { Route } from '@angular/router';
import { WorkOrderAddComponent } from '../../../shared/components/auxilium/work-order-add/work-order-add.component';
import { BatchEligibilityComponent } from './components/batch-eligibility/batch-eligibility.component';
import { WorkOrderCenterComponent } from './containers/work-order-center-component/work-order-center.component';
import { WorkCenterTableComponent } from './containers/work-order-center-table/work-order-center-table.component';
import { LoadWorkOrderBranchListGuard } from './guard/branch-list.guard';
import providers from './work-order-center.providers';

export default [
    {
        path: '',
        canActivate: [LoadWorkOrderBranchListGuard],
        component: WorkOrderCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'epo',
                pathMatch: 'full',
            },
            {
                path: 'epo',
                component: WorkCenterTableComponent,
            },
            {
                path: 'eposent',
                component: WorkCenterTableComponent,
            },
            {
                path: 'mblines',
                component: WorkCenterTableComponent,
            },
            {
                path: 'pblines',
                component: WorkCenterTableComponent,
            },
            {
                path: 'pylines',
                component: WorkCenterTableComponent,
            },
            {
                path: 'pypast',
                component: WorkCenterTableComponent,
            },
            {
                path: 'monthlymarker',
                component: WorkCenterTableComponent,
            },
            {
                path: 'datevariants',
                component: WorkCenterTableComponent,
            },
            {
                path: 'authexpiring',
                component: WorkCenterTableComponent,
            },
            {
                path: 'add',
                component: WorkOrderAddComponent,
            },
            {
                path: 'edit/:id',
                component: WorkOrderAddComponent,
            },
            {
                path: 'batch-eligibility',
                component: BatchEligibilityComponent,
            },
        ],
    },
] as Route[];
