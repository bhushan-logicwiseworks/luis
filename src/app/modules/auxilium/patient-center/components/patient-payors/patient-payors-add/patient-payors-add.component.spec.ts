import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPayorsAddComponent } from './patient-payors-add.component';

describe('PatientPayorsAddComponent', () => {
    let component: PatientPayorsAddComponent;
    let fixture: ComponentFixture<PatientPayorsAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientPayorsAddComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientPayorsAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
