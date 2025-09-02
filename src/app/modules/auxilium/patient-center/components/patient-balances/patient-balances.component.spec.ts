import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBalancesComponent } from './patient-balances.component';

describe('PatientBalancesComponent', () => {
    let component: PatientBalancesComponent;
    let fixture: ComponentFixture<PatientBalancesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientBalancesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientBalancesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
