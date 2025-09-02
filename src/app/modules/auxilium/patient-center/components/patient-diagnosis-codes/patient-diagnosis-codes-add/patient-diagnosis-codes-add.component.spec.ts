import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDiagnosisCodesAddComponent } from './patient-diagnosis-codes-add.component';

describe('PatientDiagnosisCodesAddComponent', () => {
    let component: PatientDiagnosisCodesAddComponent;
    let fixture: ComponentFixture<PatientDiagnosisCodesAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientDiagnosisCodesAddComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientDiagnosisCodesAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
