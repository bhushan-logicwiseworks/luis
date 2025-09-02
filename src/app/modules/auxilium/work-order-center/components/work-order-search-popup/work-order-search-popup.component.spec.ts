import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrderSearchPopupComponent } from './work-order-search-popup.component';

describe('WorkOrderSearchPopupComponent', () => {
    let component: WorkOrderSearchPopupComponent;
    let fixture: ComponentFixture<WorkOrderSearchPopupComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WorkOrderSearchPopupComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WorkOrderSearchPopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
