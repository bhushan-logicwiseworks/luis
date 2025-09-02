import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsurancePaidPatientTableComponent } from './insurance-paid-patient-table.component';

describe('InsurancePaidPatientTableComponent', () => {
    let component: InsurancePaidPatientTableComponent;
    let fixture: ComponentFixture<InsurancePaidPatientTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InsurancePaidPatientTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InsurancePaidPatientTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
