import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAuditAddRequestComponent } from './patient-audit-add-request.component';

describe('PatientAuditAddRequestComponent', () => {
    let component: PatientAuditAddRequestComponent;
    let fixture: ComponentFixture<PatientAuditAddRequestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientAuditAddRequestComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientAuditAddRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
