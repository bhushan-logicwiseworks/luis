import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePaidPatientAddComponent } from './insurance-paid-patient-add.component';

describe('InsurancePaidPatientAddComponent', () => {
    let component: InsurancePaidPatientAddComponent;
    let fixture: ComponentFixture<InsurancePaidPatientAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InsurancePaidPatientAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InsurancePaidPatientAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
