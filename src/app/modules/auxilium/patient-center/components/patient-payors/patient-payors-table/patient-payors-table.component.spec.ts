import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPayorsTableComponent } from './patient-payors-table.component';

describe('PatientPayorsTableComponent', () => {
    let component: PatientPayorsTableComponent;
    let fixture: ComponentFixture<PatientPayorsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientPayorsTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientPayorsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
