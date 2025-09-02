import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingEventsCenterComponent } from './billing-events-center.component';

describe('BillingEventsCenterComponent', () => {
    let component: BillingEventsCenterComponent;
    let fixture: ComponentFixture<BillingEventsCenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BillingEventsCenterComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BillingEventsCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
