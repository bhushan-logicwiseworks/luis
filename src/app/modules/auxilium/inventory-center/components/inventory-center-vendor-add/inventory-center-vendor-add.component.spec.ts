import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCenterVendorAddComponent } from './inventory-center-vendor-add.component';

describe('InventoryCenterVendorAddComponent', () => {
    let component: InventoryCenterVendorAddComponent;
    let fixture: ComponentFixture<InventoryCenterVendorAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InventoryCenterVendorAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InventoryCenterVendorAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
