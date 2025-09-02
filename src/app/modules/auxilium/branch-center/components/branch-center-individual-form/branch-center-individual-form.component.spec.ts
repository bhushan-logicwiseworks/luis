import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BranchCenterIndividualFormComponent } from './branch-center-individual-form.component';

describe('BranchCenterIndividualFormComponent', () => {
    let component: BranchCenterIndividualFormComponent;
    let fixture: ComponentFixture<BranchCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [BranchCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BranchCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
