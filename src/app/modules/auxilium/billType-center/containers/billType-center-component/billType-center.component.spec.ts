import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BillTypeCenterComponent } from './billType-center.component';

describe('BillTypeCenterComponent', () => {
    let component: BillTypeCenterComponent;
    let fixture: ComponentFixture<BillTypeCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [BillTypeCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BillTypeCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
