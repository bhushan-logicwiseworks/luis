import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Counter } from 'app/shared/interfaces/auxilium/bill-center/bill-dashboard.interface';
import { BillCenterTableActions } from '../../actions/bill-center-table.action';
import { BillCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    loading$ = this.store.select(BillCenterTableSelectors.selectLoading);
    dashboardWorkOrdersAll$ = this.store.select(BillCenterTableSelectors.selectDashboardWorkOrdersAll);
    dashboardWorkOrdersWithPOD$ = this.store.select(BillCenterTableSelectors.selectDashboardWorkOrdersWithPOD);
    dashboardWorkOrdersWithoutPOD$ = this.store.select(BillCenterTableSelectors.selectDashboardWorkOrdersWithoutPOD);

    dashboardWorkOrdersAll: Counter[];
    dashboardWorkOrdersWithPOD: Counter[];
    dashboardWorkOrdersWithoutPOD: Counter[];

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(BillCenterTableActions.loadDashBoardWorkOrdersAll());
        this.store.dispatch(BillCenterTableActions.loadDashBoardWorkOrdersWithPOD());
        this.store.dispatch(BillCenterTableActions.loadDashBoardWorkOrdersWithoutPOD());

        this.dashboardWorkOrdersAll$.pipe(untilDestroyed(this)).subscribe(dashboardWorkOrdersAll => {
            if (dashboardWorkOrdersAll) {
                this.dashboardWorkOrdersAll = dashboardWorkOrdersAll;
            }
        });

        this.dashboardWorkOrdersWithPOD$.pipe(untilDestroyed(this)).subscribe(dashboardWorkOrdersWithPOD => {
            if (dashboardWorkOrdersWithPOD) {
                this.dashboardWorkOrdersWithPOD = dashboardWorkOrdersWithPOD;
            }
        });

        this.dashboardWorkOrdersWithoutPOD$.pipe(untilDestroyed(this)).subscribe(dashboardWorkOrdersWithoutPOD => {
            if (dashboardWorkOrdersWithoutPOD) {
                this.dashboardWorkOrdersWithoutPOD = dashboardWorkOrdersWithoutPOD;
            }
        });
    }
}
