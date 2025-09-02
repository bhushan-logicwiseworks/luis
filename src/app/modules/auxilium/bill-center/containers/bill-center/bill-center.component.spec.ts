import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCenterComponent } from './bill-center.component';

describe('BillCenterComponent', () => {
    let component: BillCenterComponent;
    let fixture: ComponentFixture<BillCenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [BillCenterComponent],
}).compileComponents();

        fixture = TestBed.createComponent(BillCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
