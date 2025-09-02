import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewShortcuteComponentComponent } from './add-new-shortcute-component.component';

describe('AddNewShortcuteComponentComponent', () => {
    let component: AddNewShortcuteComponentComponent;
    let fixture: ComponentFixture<AddNewShortcuteComponentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AddNewShortcuteComponentComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AddNewShortcuteComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
