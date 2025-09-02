import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCenterLocationCodeListComponent } from './inventory-center-location-code-list.component';

describe('InventoryCenterLocationCodeListComponent', () => {
    let component: InventoryCenterLocationCodeListComponent;
    let fixture: ComponentFixture<InventoryCenterLocationCodeListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InventoryCenterLocationCodeListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InventoryCenterLocationCodeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
