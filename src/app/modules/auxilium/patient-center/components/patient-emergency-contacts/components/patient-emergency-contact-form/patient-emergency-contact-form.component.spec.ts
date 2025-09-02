import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEmergencyContactFormComponent } from './patient-emergency-contact-form.component';

describe('PatientEmergencyContactFormComponent', () => {
    let component: PatientEmergencyContactFormComponent;
    let fixture: ComponentFixture<PatientEmergencyContactFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientEmergencyContactFormComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientEmergencyContactFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
