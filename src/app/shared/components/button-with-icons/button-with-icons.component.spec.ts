import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonWithIconsComponents } from './button-with-icons.component';

describe('ButtonWithIconsComponents', () => {
    let component: ButtonWithIconsComponents;
    let fixture: ComponentFixture<ButtonWithIconsComponents>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ButtonWithIconsComponents],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonWithIconsComponents);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
