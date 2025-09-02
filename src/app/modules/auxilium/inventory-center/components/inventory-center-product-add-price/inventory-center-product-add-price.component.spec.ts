import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCenterProductAddPriceComponent } from './inventory-center-product-add-price.component';

describe('InventoryCenterProductAddPriceComponent', () => {
    let component: InventoryCenterProductAddPriceComponent;
    let fixture: ComponentFixture<InventoryCenterProductAddPriceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InventoryCenterProductAddPriceComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InventoryCenterProductAddPriceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
