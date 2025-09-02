import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { AvatarModule } from 'ngx-avatars';
import { combineLatest, switchMap } from 'rxjs';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { TeamCenterTableActions } from '../../actions/team-center.actions';
import { TeamCenterTableSelectors } from '../../reducers';

@UntilDestroy()
@Component({
    selector: 'app-team-center-profile',
    templateUrl: './team-center-profile.component.html',
    styleUrls: ['./team-center-profile.component.scss'],
    imports: [AvatarModule, MatIcon, LoadingOverlayComponent, AsyncPipe],
})
export class TeamCenterProfileComponent {
    loading$ = this.store.select(TeamCenterTableSelectors.selectLoading);
    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => this.store.select(TeamCenterTableSelectors.selectEmployees))
    );
    employee = [];

    constructor(
        private store: Store,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        combineLatest([this.route.paramMap])
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                const filterSlug = this.route.snapshot.routeConfig.path;
                this.store.dispatch(TeamCenterTableActions.LoadEmployees({ filter: filterSlug }));
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(employee => {
            this.employee = employee;
        });
    }
}
