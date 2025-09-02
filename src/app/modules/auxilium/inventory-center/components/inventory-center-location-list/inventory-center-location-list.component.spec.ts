import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCenterLocationListComponent } from './inventory-center-location-list.component';

describe('InventoryCenterLocationListComponent', () => {
    let component: InventoryCenterLocationListComponent;
    let fixture: ComponentFixture<InventoryCenterLocationListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InventoryCenterLocationListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InventoryCenterLocationListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
