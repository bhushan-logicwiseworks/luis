import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsurancePaidPatientComponent } from './insurance-paid-patient.component';

describe('InsurancePaidPatientComponent', () => {
    let component: InsurancePaidPatientComponent;
    let fixture: ComponentFixture<InsurancePaidPatientComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InsurancePaidPatientComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InsurancePaidPatientComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
