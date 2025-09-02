import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { WorkOrderCenterIndividualAddComponent } from './work-order-center-individual-add.component';

describe('NewWorkOrderCenterIndividualComponent', () => {
    let component: WorkOrderCenterIndividualAddComponent;
    let fixture: ComponentFixture<WorkOrderCenterIndividualAddComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [WorkOrderCenterIndividualAddComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkOrderCenterIndividualAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
