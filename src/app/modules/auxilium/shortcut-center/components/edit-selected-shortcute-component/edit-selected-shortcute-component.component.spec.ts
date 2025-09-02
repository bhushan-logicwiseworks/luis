import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSelectedShortcuteComponentComponent } from './edit-selected-shortcute-component.component';

describe('EditSelectedShortcuteComponentComponent', () => {
    let component: EditSelectedShortcuteComponentComponent;
    let fixture: ComponentFixture<EditSelectedShortcuteComponentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [EditSelectedShortcuteComponentComponent],
}).compileComponents();

        fixture = TestBed.createComponent(EditSelectedShortcuteComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
