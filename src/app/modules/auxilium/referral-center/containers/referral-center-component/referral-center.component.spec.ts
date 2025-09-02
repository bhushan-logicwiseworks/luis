import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferralCenterComponent } from './referral-center.component';

describe('ReferralCenterComponent', () => {
    let component: ReferralCenterComponent;
    let fixture: ComponentFixture<ReferralCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ReferralCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReferralCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
