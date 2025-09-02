import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ValidationCenterIndividualFormComponent } from './validation-center-individual-form.component';

describe('ValidationCenterIndividualFormComponent', () => {
    let component: ValidationCenterIndividualFormComponent;
    let fixture: ComponentFixture<ValidationCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ValidationCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ValidationCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
