import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPayAdjustComponent } from './patient-pay-adjust.component';

describe('PatientPayAdjustComponent', () => {
    let component: PatientPayAdjustComponent;
    let fixture: ComponentFixture<PatientPayAdjustComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientPayAdjustComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientPayAdjustComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
