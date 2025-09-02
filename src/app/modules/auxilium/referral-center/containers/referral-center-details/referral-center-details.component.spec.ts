import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralCenterDetailsComponent } from './referral-center-details.component';

describe('ReferralCenterDetailsComponent', () => {
    let component: ReferralCenterDetailsComponent;
    let fixture: ComponentFixture<ReferralCenterDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ReferralCenterDetailsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ReferralCenterDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
