import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCenterDetailsComponent } from './sales-center-details.component';

describe('SalesCenterDetailsComponent', () => {
    let component: SalesCenterDetailsComponent;
    let fixture: ComponentFixture<SalesCenterDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [SalesCenterDetailsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(SalesCenterDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
