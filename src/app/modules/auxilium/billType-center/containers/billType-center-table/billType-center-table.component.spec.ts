import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BillTypeCenterTableComponent } from './billType-center-table.component';

describe('BillTypeCenterTableComponent', () => {
    let component: BillTypeCenterTableComponent;
    let fixture: ComponentFixture<BillTypeCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [BillTypeCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BillTypeCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
