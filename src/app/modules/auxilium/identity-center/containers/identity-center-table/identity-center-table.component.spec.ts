import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewSalesCenterTableComponent } from './new-sales-center-table.component';

describe('NewSalesCenterTableComponent', () => {
    let component: NewSalesCenterTableComponent;
    let fixture: ComponentFixture<NewSalesCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [NewSalesCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewSalesCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
