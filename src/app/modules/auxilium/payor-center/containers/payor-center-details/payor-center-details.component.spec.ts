import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayorCenterDetailsComponent } from './payor-center-details.component';

describe('PayorCenterDetailsComponent', () => {
    let component: PayorCenterDetailsComponent;
    let fixture: ComponentFixture<PayorCenterDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PayorCenterDetailsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PayorCenterDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
