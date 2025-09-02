import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChargesTableComponent } from './patient-charges-table.component';

describe('PatientChargesTableComponent', () => {
    let component: PatientChargesTableComponent;
    let fixture: ComponentFixture<PatientChargesTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientChargesTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientChargesTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
