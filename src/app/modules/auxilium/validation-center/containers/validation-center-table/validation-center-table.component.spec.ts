import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ValidationCenterTableComponent } from './validation-center-table.component';

describe('ValidationCenterTableComponent', () => {
    let component: ValidationCenterTableComponent;
    let fixture: ComponentFixture<ValidationCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ValidationCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ValidationCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
