import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientComplianceAddRequestComponent } from './patient-compliance-add-request.component';

describe('PatientComplianceAddRequestComponent', () => {
    let component: PatientComplianceAddRequestComponent;
    let fixture: ComponentFixture<PatientComplianceAddRequestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientComplianceAddRequestComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientComplianceAddRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
