import { Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { DashboardDeatilsActions } from '../../actions/project-details.action';
import { DashboardSelectors } from '../../reducers';
import { NgClass } from '@angular/common';
import { AuxReorderValueComponent } from '../../component/aux-reorder-value/aux-reorder-value.component';

@UntilDestroy()
@Component({
    selector: 'app-goals',
    templateUrl: './goals.component.html',
    styleUrl: './goals.component.scss',
    imports: [NgClass, AuxReorderValueComponent],
})
export class GoalsComponent implements OnInit {
    @Input() className: string;
    @Input() rowClassName: string;

    goalValue: any;

    getDashboardGoals$ = this.store.select(DashboardSelectors.selectGoal);

    constructor(private store: Store) {}

    ngOnInit(): void {
        this.loadDashboardGoals();
    }

    loadDashboardGoals() {
        this.getDashboardGoals$.pipe(untilDestroyed(this)).subscribe(data => {
            if (!data?.length) {
                this.store.dispatch(DashboardDeatilsActions.LoadDashboardGoals());
            }
            data.map(element => {
                this.goalValue = element.percent?.toFixed(0);
            });
        });
    }
}
