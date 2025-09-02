import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReferralCenterTableComponent } from './referral-center-table.component';

describe('ReferralCenterTableComponent', () => {
    let component: ReferralCenterTableComponent;
    let fixture: ComponentFixture<ReferralCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ReferralCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReferralCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
