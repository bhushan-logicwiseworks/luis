import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientComplianceComponent } from './patient-compliance.component';

describe('PatientComplianceComponent', () => {
    let component: PatientComplianceComponent;
    let fixture: ComponentFixture<PatientComplianceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientComplianceComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientComplianceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
