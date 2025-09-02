import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferralCenterIndividualFormComponent } from './referral-center-individual-form.component';

describe('ReferralCenterIndividualFormComponent', () => {
    let component: ReferralCenterIndividualFormComponent;
    let fixture: ComponentFixture<ReferralCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ReferralCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReferralCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
