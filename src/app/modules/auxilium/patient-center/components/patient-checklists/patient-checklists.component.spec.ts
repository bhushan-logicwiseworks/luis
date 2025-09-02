import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientReferralChecklistComponent } from './patient-referral-checklist.component';

describe('PatientReferralChecklistComponent', () => {
    let component: PatientReferralChecklistComponent;
    let fixture: ComponentFixture<PatientReferralChecklistComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientReferralChecklistComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientReferralChecklistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
