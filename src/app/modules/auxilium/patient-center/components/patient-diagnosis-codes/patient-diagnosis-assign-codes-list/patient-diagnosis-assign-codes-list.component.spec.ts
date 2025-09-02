import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDiagnosisAssignCodesListComponent } from './patient-diagnosis-assign-codes-list.component';

describe('PatientDiagnosisAssignCodesListComponent', () => {
    let component: PatientDiagnosisAssignCodesListComponent;
    let fixture: ComponentFixture<PatientDiagnosisAssignCodesListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientDiagnosisAssignCodesListComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientDiagnosisAssignCodesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
