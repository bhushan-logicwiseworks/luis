import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { DashboardDeatilsActions } from 'app/modules/admin/dashboards/combined/actions/project-details.action';
import { DashboardSelectors } from 'app/modules/admin/dashboards/combined/reducers';
import { REFRESH_INTERVAL_MS } from 'app/shared/constants/internal-dashboard.constant';
import { interval } from 'rxjs';
import { InternalDashboardService } from './internal-dashboard.service';

@UntilDestroy()
@Component({
    selector: 'internal-dashboard',
    templateUrl: './internal-dashboard.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InternalDashboardComponent implements OnInit {
    today: number = Date.now();

    //COLUMN 1
    public CGMPatientsShippedToday: any;
    CGMReferralsEnteredToday: any;
    NewCGMReferralsShippedToday: any;
    PendingCGMPatientReferralsReconciled: any;
    //COLUMN 2
    CGMPatientsShippedThisMonth: any;
    NewCGMReferralsShippedThisMonth: any;
    QuarterlyGoal: any;
    PendingCGMPatientReferralsReconciledThisMonth: any;
    CGMReferralsEnteredThisMonth: any;

    //COLUMN 3
    CGMTotalActivePatientsThisYear: any;
    TotalPendingCGMReferrals: any;
    ActiveCMNExpiration14Days: any;
    AverageDaysFromReferralEntryToActiveStatus: any;
    PercentCGMReferralsTurnedIntoActivePatients: any;
    PatientsUsingAnswersReorderPortal: any;
    isloading: boolean = false;
    goalValue: string;

    /**
     * Constructor
     */
    constructor(
        private _projectService: InternalDashboardService,
        private _router: Router,
        private store: Store
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loadGoalData();
        this.selectGoalData();
        this.loadColumnData();

        interval(REFRESH_INTERVAL_MS) // 5 minutes
            .pipe(untilDestroyed(this))
            .subscribe(() => {
                this.loadGoalData();
                this.loadColumnData();
            });
    }

    /**
     * Load goal data from the store
     */
    private selectGoalData(): void {
        this.store
            .select(DashboardSelectors.selectGoal)
            .pipe(untilDestroyed(this))
            .subscribe(data => {
                if (data && data.length > 0) {
                    this.goalValue = data[0].percent?.toFixed(0);
                }
            });
    }
    /**
     * Load goal data into the store using Load action
     */
    private loadGoalData(): void {
        this.store.dispatch(DashboardDeatilsActions.LoadDashboardGoals());
    }

    /**
     * Load column data from the service
     */
    private loadColumnData(): void {
        this.isloading = true;
        this._projectService
            .getColumnData()
            .pipe(untilDestroyed(this))
            .subscribe(responseList => {
                if (responseList.length > 0) {
                    this.isloading = false;
                    //COLUMN 1
                    this.CGMPatientsShippedToday = responseList[0][0];
                    this.CGMReferralsEnteredToday = responseList[1][0];
                    this.NewCGMReferralsShippedToday = responseList[2][0];
                    this.PendingCGMPatientReferralsReconciled = responseList[3][0];
                    //COLUMN 2
                    this.CGMPatientsShippedThisMonth = responseList[4][0];
                    this.NewCGMReferralsShippedThisMonth = responseList[5][0];
                    this.PendingCGMPatientReferralsReconciledThisMonth = responseList[7][0];
                    this.CGMReferralsEnteredThisMonth = responseList[8][0];
                    //COLUMN 3
                    this.CGMTotalActivePatientsThisYear = responseList[9][0];
                    this.TotalPendingCGMReferrals = responseList[10][0];
                    this.ActiveCMNExpiration14Days = responseList[11][0];
                    this.AverageDaysFromReferralEntryToActiveStatus = responseList[12][0];
                    this.PercentCGMReferralsTurnedIntoActivePatients = responseList[13][0];
                    this.PatientsUsingAnswersReorderPortal = responseList[14][0];
                }
            });
    }
}
