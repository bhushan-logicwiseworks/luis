import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrdersWithoutPodComponent } from './work-orders-without-pod.component';

describe('WorkOrdersWithoutPodComponent', () => {
    let component: WorkOrdersWithoutPodComponent;
    let fixture: ComponentFixture<WorkOrdersWithoutPodComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WorkOrdersWithoutPodComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WorkOrdersWithoutPodComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
