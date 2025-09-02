import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AccessCenterIndividualFormComponent } from './access-center-individual-form.component';

describe('AccessCenterIndividualFormComponent', () => {
    let component: AccessCenterIndividualFormComponent;
    let fixture: ComponentFixture<AccessCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [AccessCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccessCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
