import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ValidationCenterComponent } from './validation-center.component';

describe('ValidationCenterComponent', () => {
    let component: ValidationCenterComponent;
    let fixture: ComponentFixture<ValidationCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ValidationCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ValidationCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
