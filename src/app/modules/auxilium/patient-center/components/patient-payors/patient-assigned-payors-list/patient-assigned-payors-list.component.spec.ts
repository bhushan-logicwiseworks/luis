import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAssignedPayorsListComponent } from './patient-assigned-payors-list.component';

describe('PatientAssignedPayorsListComponent', () => {
    let component: PatientAssignedPayorsListComponent;
    let fixture: ComponentFixture<PatientAssignedPayorsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientAssignedPayorsListComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientAssignedPayorsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
