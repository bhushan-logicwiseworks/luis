import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDiagnosisCodesTableComponent } from './patient-diagnosis-codes-table.component';

describe('PatientDiagnosisCodesTableComponent', () => {
    let component: PatientDiagnosisCodesTableComponent;
    let fixture: ComponentFixture<PatientDiagnosisCodesTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientDiagnosisCodesTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientDiagnosisCodesTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
