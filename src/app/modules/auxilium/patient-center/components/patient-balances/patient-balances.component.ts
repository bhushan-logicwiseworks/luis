import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { PatientBalance } from 'app/shared/interfaces/auxilium/patient-center/patientbalances.interdace';
import { Subject } from 'rxjs';
import { PatientCenterTableActions } from '../../actions/patient-center-table.actions';
import { PatientCenterTableSelectors } from '../../reducers';
@UntilDestroy()
@Component({
    selector: 'app-patient-balances',
    imports: [],
    templateUrl: './patient-balances.component.html',
    styleUrl: './patient-balances.component.scss',
})
export class PatientBalancesComponent {
    data$ = this.store.select(PatientCenterTableSelectors.selectPatientBalances);
    loading$ = this.store.select(PatientCenterTableSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();
    patientBalances: PatientBalance;
    constructor(
        private router: Router,
        private store: Store
    ) {}

    ngOnInit(): void {
        let id = Number(this.router.url.split('/')[3]);
        this.store.dispatch(PatientCenterTableActions.LoadPatientBalance({ id: id }));
        this.data$.pipe(untilDestroyed(this)).subscribe(data => {
            this.patientBalances = data;
        });
    }
}
