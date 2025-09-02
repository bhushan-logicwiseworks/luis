import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcuteListComponentComponent } from './shortcute-list-component.component';

describe('ShortcuteListComponentComponent', () => {
    let component: ShortcuteListComponentComponent;
    let fixture: ComponentFixture<ShortcuteListComponentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ShortcuteListComponentComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ShortcuteListComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
