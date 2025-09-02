import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { fadeInRight400ms } from 'app/core/animations/fade-in-right.animation';
import { scaleIn400ms } from 'app/core/animations/scale-in.animation';
import { AuxSearchService } from 'app/shared/aux-service/aux-search.service';
import { MatIcon } from '@angular/material/icon';
import { AnalyticsTableComponent } from '../analytics-table/analytics-table.component';
@UntilDestroy()
@Component({
    selector: 'ac-analytics-center',
    templateUrl: './analytics-center.component.html',
    styleUrls: ['./analytics-center.component.scss'],
    animations: [fadeInRight400ms, scaleIn400ms],
    imports: [
        MatIcon,
        ReactiveFormsModule,
        AnalyticsTableComponent,
    ],
})
export class AnalyticsCenterComponent implements OnInit {
    searchCtrl = new UntypedFormControl();

    constructor(
        private store: Store,
        private searchService: AuxSearchService
    ) {
        this.searchCtrl.valueChanges
            .pipe(untilDestroyed(this))
            .subscribe(value => this.searchService.search.next(value));
    }

    ngOnInit(): void {
        // this.store.dispatch(fromAnalyticsActions.loadAnalyticsDatas());
    }
}
