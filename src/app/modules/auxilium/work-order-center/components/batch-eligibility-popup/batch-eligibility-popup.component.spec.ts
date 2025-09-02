import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchEligibilityPopupComponent } from './batch-eligibility-popup.component';

describe('BatchEligibilityPopupComponent', () => {
    let component: BatchEligibilityPopupComponent;
    let fixture: ComponentFixture<BatchEligibilityPopupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BatchEligibilityPopupComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BatchEligibilityPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
