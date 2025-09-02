import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientComplianceNotesComponent } from './patient-compliance-notes.component';

describe('PatientComplianceNotesComponent', () => {
    let component: PatientComplianceNotesComponent;
    let fixture: ComponentFixture<PatientComplianceNotesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientComplianceNotesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientComplianceNotesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
