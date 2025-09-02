import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientInsuranceRefundsTableComponent } from './patient-insurance-refunds-table.component';

describe('PatientInsuranceRefundsTableComponent', () => {
    let component: PatientInsuranceRefundsTableComponent;
    let fixture: ComponentFixture<PatientInsuranceRefundsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientInsuranceRefundsTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientInsuranceRefundsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
