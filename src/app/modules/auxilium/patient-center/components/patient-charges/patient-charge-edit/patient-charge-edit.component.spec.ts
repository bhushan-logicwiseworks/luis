import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientChargeEditComponent } from './patient-charge-edit.component';

describe('PatientChargeEditComponent', () => {
    let component: PatientChargeEditComponent;
    let fixture: ComponentFixture<PatientChargeEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientChargeEditComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientChargeEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
