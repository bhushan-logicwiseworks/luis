import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { GetPatientResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-payors.interface';
import { Subject } from 'rxjs';
import { PatientCenterPayorsActions } from '../../../actions/patient-center-payors.action';
import { PatientCenterPayorsSelectors } from '../../../reducers';
import { LoadingOverlayComponent } from '../../../../../../shared/components/loading-overlay/loading-overlay.component';

@UntilDestroy()
@Component({
    selector: 'app-patient-payors-list-drawer',
    templateUrl: './patient-payors-list-drawer.component.html',
    styleUrls: ['./patient-payors-list-drawer.component.scss'],
    imports: [LoadingOverlayComponent],
})
export class PatientPayorsListDrawerComponent implements OnInit {
    data$ = this.store.select(PatientCenterPayorsSelectors.selectPayors);
    loading$ = this.store.select(PatientCenterPayorsSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    payorsData: GetPatientResponse;
    constructor(
        private router: Router,
        private store: Store
    ) {}

    ngOnInit(): void {
        let id = Number(this.router.url.split('/')[3]);
        this.store.dispatch(PatientCenterPayorsActions.LoadPatientPayors({ id: id }));
        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            this.payorsData = data;
        });
    }

    trackByFn(index, item) {
        return item.id;
    }
}
