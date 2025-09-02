import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPayorsEditComponent } from './patient-payors-edit.component';

describe('PatientPayorsEditComponent', () => {
    let component: PatientPayorsEditComponent;
    let fixture: ComponentFixture<PatientPayorsEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientPayorsEditComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientPayorsEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
