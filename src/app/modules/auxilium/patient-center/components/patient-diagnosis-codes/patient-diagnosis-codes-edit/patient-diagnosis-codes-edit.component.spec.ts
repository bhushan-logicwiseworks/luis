import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDiagnosisCodesEditComponent } from './patient-diagnosis-codes-edit.component';

describe('PatientDiagnosisCodesEditComponent', () => {
    let component: PatientDiagnosisCodesEditComponent;
    let fixture: ComponentFixture<PatientDiagnosisCodesEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientDiagnosisCodesEditComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientDiagnosisCodesEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
