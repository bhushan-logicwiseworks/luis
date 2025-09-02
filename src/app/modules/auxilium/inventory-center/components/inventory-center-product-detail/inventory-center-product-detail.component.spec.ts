import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCenterProductDetailComponent } from './inventory-center-product-detail.component';

describe('InventoryCenterProductDetailComponent', () => {
    let component: InventoryCenterProductDetailComponent;
    let fixture: ComponentFixture<InventoryCenterProductDetailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [InventoryCenterProductDetailComponent],
}).compileComponents();

        fixture = TestBed.createComponent(InventoryCenterProductDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
