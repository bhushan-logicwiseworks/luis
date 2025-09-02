import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutCenterComponentComponent } from './shortcut-center-component.component';

describe('ShortcutCenterComponentComponent', () => {
    let component: ShortcutCenterComponentComponent;
    let fixture: ComponentFixture<ShortcutCenterComponentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ShortcutCenterComponentComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ShortcutCenterComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
