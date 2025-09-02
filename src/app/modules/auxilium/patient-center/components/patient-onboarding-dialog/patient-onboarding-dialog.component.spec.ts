import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientOnboardingDialogComponent } from './patient-onboarding-dialog.component';

describe('PatientOnboardingDialogComponent', () => {
    let component: PatientOnboardingDialogComponent;
    let fixture: ComponentFixture<PatientOnboardingDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    declarations: [PatientOnboardingDialogComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientOnboardingDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
