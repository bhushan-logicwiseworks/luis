import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxReferralFromComponent } from './aux-referral-from.component';

describe('AuxReferralFromComponent', () => {
    let component: AuxReferralFromComponent;
    let fixture: ComponentFixture<AuxReferralFromComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AuxReferralFromComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AuxReferralFromComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
