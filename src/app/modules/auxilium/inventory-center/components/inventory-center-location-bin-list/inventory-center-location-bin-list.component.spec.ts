import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCenterLocationBinListComponent } from './inventory-center-location-bin-list.component';

describe('InventoryCenterLocationBinListComponent', () => {
    let component: InventoryCenterLocationBinListComponent;
    let fixture: ComponentFixture<InventoryCenterLocationBinListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InventoryCenterLocationBinListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InventoryCenterLocationBinListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
