import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayorCenterTableComponent } from './payor-center-table.component';

describe('PayorCenterTableComponent', () => {
    let component: PayorCenterTableComponent;
    let fixture: ComponentFixture<PayorCenterTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PayorCenterTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PayorCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
