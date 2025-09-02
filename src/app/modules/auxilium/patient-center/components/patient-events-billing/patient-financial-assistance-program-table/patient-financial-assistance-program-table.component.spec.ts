import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientFinancialAssistanceProgramTableComponent } from './patient-financial-assistance-program-table.component';

describe('PatientFinancialAssistanceProgramTableComponent', () => {
    let component: PatientFinancialAssistanceProgramTableComponent;
    let fixture: ComponentFixture<PatientFinancialAssistanceProgramTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientFinancialAssistanceProgramTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientFinancialAssistanceProgramTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
