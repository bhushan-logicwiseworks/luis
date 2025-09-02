import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayorCenterComponent } from './payor-center.component';

describe('PayorCenterComponent', () => {
    let component: PayorCenterComponent;
    let fixture: ComponentFixture<PayorCenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PayorCenterComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PayorCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
