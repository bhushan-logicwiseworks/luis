import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WorkOrderCenterIndividualFormComponent } from './work-order-center-individual-form.component';

describe('WorkOrderCenterIndividualFormComponent', () => {
    let component: WorkOrderCenterIndividualFormComponent;
    let fixture: ComponentFixture<WorkOrderCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [WorkOrderCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkOrderCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
