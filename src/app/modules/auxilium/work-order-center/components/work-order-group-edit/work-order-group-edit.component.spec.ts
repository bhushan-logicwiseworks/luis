import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientGroupEditWorkOrderComponent } from './patient-group-edit-work-order.component';

describe('PatientGroupEditWorkOrderComponent', () => {
    let component: PatientGroupEditWorkOrderComponent;
    let fixture: ComponentFixture<PatientGroupEditWorkOrderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientGroupEditWorkOrderComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientGroupEditWorkOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
