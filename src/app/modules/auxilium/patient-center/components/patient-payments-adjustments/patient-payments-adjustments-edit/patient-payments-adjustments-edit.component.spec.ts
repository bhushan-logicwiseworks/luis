import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPaymentsAdjustmentsEditComponent } from './patient-payments-adjustments-edit.component';

describe('PatientPaymentsAdjustmentsEditComponent', () => {
    let component: PatientPaymentsAdjustmentsEditComponent;
    let fixture: ComponentFixture<PatientPaymentsAdjustmentsEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientPaymentsAdjustmentsEditComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientPaymentsAdjustmentsEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
