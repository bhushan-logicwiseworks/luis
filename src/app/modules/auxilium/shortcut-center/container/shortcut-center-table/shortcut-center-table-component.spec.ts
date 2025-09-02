import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutCenterTableComponent } from './shortcut-center-table-component';

describe('ShortcutCenterTableComponentComponent', () => {
    let component: ShortcutCenterTableComponent;
    let fixture: ComponentFixture<ShortcutCenterTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ShortcutCenterTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ShortcutCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
