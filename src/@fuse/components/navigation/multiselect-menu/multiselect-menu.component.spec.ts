import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectMenuComponent } from './multiselect-menu.component';

describe('MultiselectMenuComponent', () => {
    let component: MultiselectMenuComponent;
    let fixture: ComponentFixture<MultiselectMenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [MultiselectMenuComponent],
}).compileComponents();

        fixture = TestBed.createComponent(MultiselectMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
