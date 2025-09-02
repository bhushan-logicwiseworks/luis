import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingCenterKpiComponent } from './onboarding-center-kpi.component';

describe('OnboardingCenterKpiComponent', () => {
    let component: OnboardingCenterKpiComponent;
    let fixture: ComponentFixture<OnboardingCenterKpiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [OnboardingCenterKpiComponent],
}).compileComponents();

        fixture = TestBed.createComponent(OnboardingCenterKpiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
