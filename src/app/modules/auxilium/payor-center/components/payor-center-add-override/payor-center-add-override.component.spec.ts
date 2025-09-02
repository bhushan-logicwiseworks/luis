import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayorCenterAddOverrideComponent } from './payor-center-add-override.component';

describe('PayorCenterOverrideComponent', () => {
    let component: PayorCenterAddOverrideComponent;
    let fixture: ComponentFixture<PayorCenterAddOverrideComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PayorCenterAddOverrideComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PayorCenterAddOverrideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
