import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCenterLocationAddComponent } from './inventory-center-location-add.component';

describe('InventoryCenterLocationAddComponent', () => {
    let component: InventoryCenterLocationAddComponent;
    let fixture: ComponentFixture<InventoryCenterLocationAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InventoryCenterLocationAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InventoryCenterLocationAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
