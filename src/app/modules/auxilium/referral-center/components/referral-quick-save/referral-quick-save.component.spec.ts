import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralQuickSaveComponent } from './referral-quick-save.component';

describe('ReferralQuickSaveComponent', () => {
    let component: ReferralQuickSaveComponent;
    let fixture: ComponentFixture<ReferralQuickSaveComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ReferralQuickSaveComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ReferralQuickSaveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
