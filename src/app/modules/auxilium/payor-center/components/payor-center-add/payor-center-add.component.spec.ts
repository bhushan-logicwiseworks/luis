import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayorCenterAddComponent } from './payor-center-add.component';

describe('PayorCenterAddComponent', () => {
    let component: PayorCenterAddComponent;
    let fixture: ComponentFixture<PayorCenterAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PayorCenterAddComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PayorCenterAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
