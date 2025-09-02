import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayorCenterBillOptionsComponent } from './payor-center-bill-options.component';

describe('PayorCenterBillOptionsComponent', () => {
    let component: PayorCenterBillOptionsComponent;
    let fixture: ComponentFixture<PayorCenterBillOptionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PayorCenterBillOptionsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PayorCenterBillOptionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
