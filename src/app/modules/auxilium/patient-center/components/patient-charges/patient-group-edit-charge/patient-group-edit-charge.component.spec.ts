import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientGroupEditChargeComponent } from './patient-group-edit-charge.component';

describe('PatientGroupEditChargeComponent', () => {
    let component: PatientGroupEditChargeComponent;
    let fixture: ComponentFixture<PatientGroupEditChargeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientGroupEditChargeComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientGroupEditChargeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
