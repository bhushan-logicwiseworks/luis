import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralDemographicsComponent } from './referral-demographics.component';

describe('ReferralDemographicsComponent', () => {
    let component: ReferralDemographicsComponent;
    let fixture: ComponentFixture<ReferralDemographicsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ReferralDemographicsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ReferralDemographicsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
