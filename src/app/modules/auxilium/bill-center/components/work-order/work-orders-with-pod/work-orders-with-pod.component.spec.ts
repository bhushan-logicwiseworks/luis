import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrdersWithPodComponent } from './work-orders-with-pod.component';

describe('WorkOrdersWithPodComponent', () => {
    let component: WorkOrdersWithPodComponent;
    let fixture: ComponentFixture<WorkOrdersWithPodComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WorkOrdersWithPodComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WorkOrdersWithPodComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
