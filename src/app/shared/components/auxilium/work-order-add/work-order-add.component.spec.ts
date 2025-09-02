import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderAddComponent } from './work-order-add.component';

describe('WorkOrderAddComponent', () => {
    let component: WorkOrderAddComponent;
    let fixture: ComponentFixture<WorkOrderAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [WorkOrderAddComponent],
}).compileComponents();

        fixture = TestBed.createComponent(WorkOrderAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
