import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PhysicianCenterIndividualFormComponent } from './physician-center-individual-form.component';

describe('PhysicianCenterIndividualFormComponent', () => {
    let component: PhysicianCenterIndividualFormComponent;
    let fixture: ComponentFixture<PhysicianCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PhysicianCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PhysicianCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
