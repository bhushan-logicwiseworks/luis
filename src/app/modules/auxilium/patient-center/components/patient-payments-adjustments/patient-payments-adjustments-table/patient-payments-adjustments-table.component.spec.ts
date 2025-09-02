import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPaymentsAdjustmentsTableComponent } from './patient-payments-adjustments-table.component';

describe('PatientPaymentsAdjustmentsTableComponent', () => {
    let component: PatientPaymentsAdjustmentsTableComponent;
    let fixture: ComponentFixture<PatientPaymentsAdjustmentsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientPaymentsAdjustmentsTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientPaymentsAdjustmentsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
