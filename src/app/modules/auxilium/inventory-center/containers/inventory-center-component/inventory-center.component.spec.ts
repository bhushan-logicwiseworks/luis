import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventoryCenterComponent } from './inventory-center.component';

describe('InventoryCenterComponent', () => {
    let component: InventoryCenterComponent;
    let fixture: ComponentFixture<InventoryCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [InventoryCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InventoryCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
