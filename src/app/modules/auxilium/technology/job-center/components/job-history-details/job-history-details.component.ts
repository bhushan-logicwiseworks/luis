import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { JobHistoryDetailsDisplay } from 'app/shared/interfaces/auxilium/job-center/job-history-details.interface';
import { Subject } from 'rxjs';
import { JobIndividualActions } from '../../actions/job-center-individual.actions';
import { JobIndividualSelectors } from '../../reducers';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { LoadingOverlayComponent } from '../../../../../../shared/components/loading-overlay/loading-overlay.component';
import { DatePipe } from '@angular/common';

@UntilDestroy()
@Component({
    selector: 'app-job-history-details',
    templateUrl: './job-history-details.component.html',
    styleUrls: ['./job-history-details.component.scss'],
    imports: [
        CdkScrollable,
        MatDialogContent,
        LoadingOverlayComponent,
        DatePipe,
    ],
})
export class JobHistoryDetailsComponent implements OnInit {
    loading$ = this.store.select(JobIndividualSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    data$ = this.store.select(JobIndividualSelectors.selectJobHistoryDetailsById);
    jobHistoryData: JobHistoryDetailsDisplay[];
    constructor(
        private store: Store,
        @Optional() @Inject(MAT_DIALOG_DATA) private jobHistoryId: any,
        public matDialogRef: MatDialogRef<JobHistoryDetailsComponent>
    ) {
        const id = jobHistoryId.dynamicComponentData.historyId;
        this.store.dispatch(JobIndividualActions.LoadJobHistoryDetailsById({ historyId: id }));
    }

    ngOnInit(): void {
        this.data$.pipe(untilDestroyed(this)).subscribe(jobHistoryDetails => {
            if (jobHistoryDetails) {
                this.jobHistoryData = jobHistoryDetails;
            }
        });
    }

    trackByFn(index, item) {
        return item.id;
    }

    submitDetails() {
        this.matDialogRef.close();
    }
}
