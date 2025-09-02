import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrdersAllComponent } from './work-orders-all.component';

describe('WorkOrdersAllComponent', () => {
    let component: WorkOrdersAllComponent;
    let fixture: ComponentFixture<WorkOrdersAllComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WorkOrdersAllComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WorkOrdersAllComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
