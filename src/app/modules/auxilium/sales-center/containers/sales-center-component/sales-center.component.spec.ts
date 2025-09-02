import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalesCenterComponent } from './sales-center.component';

describe('SalesCenterComponent', () => {
    let component: SalesCenterComponent;
    let fixture: ComponentFixture<SalesCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [SalesCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SalesCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
