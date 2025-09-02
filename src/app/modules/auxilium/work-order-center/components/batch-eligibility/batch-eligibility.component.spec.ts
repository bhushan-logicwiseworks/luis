import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchEligibilityComponent } from './batch-eligibility.component';

describe('BatchEligibilityComponent', () => {
    let component: BatchEligibilityComponent;
    let fixture: ComponentFixture<BatchEligibilityComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BatchEligibilityComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BatchEligibilityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
