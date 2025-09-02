import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InventoryCenterTableComponent } from './inventory-center-table.component';

describe('InventoryCenterTableComponent', () => {
    let component: InventoryCenterTableComponent;
    let fixture: ComponentFixture<InventoryCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [InventoryCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InventoryCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
