import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAuditNotesComponent } from './patient-audit-notes.component';

describe('PatientAuditNotesComponent', () => {
    let component: PatientAuditNotesComponent;
    let fixture: ComponentFixture<PatientAuditNotesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientAuditNotesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientAuditNotesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
