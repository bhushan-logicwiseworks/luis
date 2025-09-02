import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCenterVendorTableComponent } from './inventory-center-vendor-table.component';

describe('InventoryCenterVendorTableComponent', () => {
    let component: InventoryCenterVendorTableComponent;
    let fixture: ComponentFixture<InventoryCenterVendorTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InventoryCenterVendorTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InventoryCenterVendorTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
