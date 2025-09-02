import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDiagnosisCodesListComponent } from './patient-diagnosis-codes-list.component';

describe('PatientDiagnosisCodesListComponent', () => {
    let component: PatientDiagnosisCodesListComponent;
    let fixture: ComponentFixture<PatientDiagnosisCodesListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientDiagnosisCodesListComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientDiagnosisCodesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
