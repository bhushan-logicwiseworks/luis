import { Route } from '@angular/router';
import providers from './bill-center.providers';
import { AgingReportComponent } from './components/aging-report/aging-report.component';
import { ChargesReadyforClaimsComponent } from './components/charges-readyfor-claims/charges-readyfor-claims.component';
import { ClaimsFor837Component } from './components/claims-for-837/claims-for-837.component';
import { ClaimsReadyForValidationComponent } from './components/claims-ready-for-validation/claims-ready-for-validation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeldItemsReportComponent } from './components/held-items-report/held-items-report.component';
import { WorkOrdersAllComponent } from './components/work-order/work-orders-all/work-orders-all.component';
import { WorkOrdersWithPodComponent } from './components/work-order/work-orders-with-pod/work-orders-with-pod.component';
import { WorkOrdersWithoutPodComponent } from './components/work-order/work-orders-without-pod/work-orders-without-pod.component';
import { BillCenterComponent } from './containers/bill-center/bill-center.component';

export default [
    {
        path: '',
        component: BillCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'work-orders-all',
                component: WorkOrdersAllComponent,
            },
            {
                path: 'work-orders-with-pod',
                component: WorkOrdersWithPodComponent,
            },
            {
                path: 'work-orders-without-pod',
                component: WorkOrdersWithoutPodComponent,
            },
            {
                path: 'charges-readyfor-claims',
                component: ChargesReadyforClaimsComponent,
            },
            {
                path: 'validation-readyfor-claims',
                component: ClaimsReadyForValidationComponent,
            },
            {
                path: 'held-items-report',
                component: HeldItemsReportComponent,
            },
            {
                path: 'claims-for-837',
                component: ClaimsFor837Component,
            },
            {
                path: 'aging-report',
                component: AgingReportComponent,
            },
        ],
    },
] as Route[];
