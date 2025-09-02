import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OnboardingCenterService } from 'app/core/services/onboarding-center.service';
import { RouterActions } from 'app/reducers/router.actions';
import { SecondaryToolbarComponent } from '../../../../../shared/components/secondary-toolbar/secondary-toolbar.component';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';

@Component({
    selector: 'ac-onboarding-center-kpi',
    templateUrl: './onboarding-center-kpi.component.html',
    styleUrls: ['./onboarding-center-kpi.component.scss'],
    imports: [
        SecondaryToolbarComponent,
        BreadcrumbsComponent,
        LoadingOverlayComponent,
    ],
})
export class OnboardingCenterKpiComponent implements OnInit {
    kpi1;
    kpi2;
    kpi3;
    kpi4;
    kpi5;
    kpi6;
    kpi7;
    kpi8;
    kpi9;
    loading: boolean = false;
    constructor(
        private obcService: OnboardingCenterService,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.getkpi1();
        this.getkpi2();
        this.getkpi3();
        this.getkpi4();
        this.getkpi5();
        this.getkpi6();
        this.getkpi7();
        this.getkpi8();
        this.getkpi9();
    }

    getkpi1() {
        this.obcService
            .getkpi1()
            .toPromise()
            .then(data => {
                this.kpi1 = data[0].total;
            });
    }

    getkpi2() {
        this.obcService
            .getkpi2()
            .toPromise()
            .then(data => {
                this.kpi2 = data[0].total;
            });
    }

    getkpi3() {
        this.obcService
            .getkpi3()
            .toPromise()
            .then(data => {
                this.kpi3 = data[0].total;
            });
    }

    getkpi4() {
        this.obcService
            .getkpi4()
            .toPromise()
            .then(data => {
                this.kpi4 = data[0].total;
            });
    }

    getkpi5() {
        this.obcService
            .getkpi5()
            .toPromise()
            .then(data => {
                this.kpi5 = data[0].total;
            });
    }

    getkpi6() {
        this.obcService
            .getkpi6()
            .toPromise()
            .then(data => {
                this.kpi6 = data[0].total;
            });
    }

    getkpi7() {
        this.obcService
            .getkpi7()
            .toPromise()
            .then(data => {
                this.kpi7 = data[0].total;
            });
    }

    getkpi8() {
        this.obcService
            .getkpi8()
            .toPromise()
            .then(data => {
                this.kpi8 = data[0].total;
            });
    }

    getkpi9() {
        this.obcService
            .getkpi9()
            .toPromise()
            .then(data => {
                this.kpi9 = data[0].total;
                // this.loading = false;
            })
            .catch(error => {
                this.loading = false;
            })
            .finally(() => {
                this.loading = false;
            });
    }

    drilldown(kpi) {
        this.store.dispatch(RouterActions.Navigate({ commands: ['/centers/onboarding-center/drilldown/' + kpi] }));
    }
}
