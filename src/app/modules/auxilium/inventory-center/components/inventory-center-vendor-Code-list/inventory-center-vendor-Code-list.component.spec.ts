import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCenterVendorCodeListComponent } from './inventory-center-vendor-code-list.component';

describe('InventoryCenterVendorCodeListComponent', () => {
    let component: InventoryCenterVendorCodeListComponent;
    let fixture: ComponentFixture<InventoryCenterVendorCodeListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InventoryCenterVendorCodeListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InventoryCenterVendorCodeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
