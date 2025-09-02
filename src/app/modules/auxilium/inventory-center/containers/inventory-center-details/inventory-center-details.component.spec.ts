import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCenterDetailsComponent } from './inventory-center-details.component';

describe('InventoryCenterDetailsComponent', () => {
    let component: InventoryCenterDetailsComponent;
    let fixture: ComponentFixture<InventoryCenterDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [InventoryCenterDetailsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(InventoryCenterDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
